import type { Ref } from '@vue/reactivity'
import { toValue } from '@vue/reactivity'
import type { Component } from '../component'
import { isFn } from '../util'

interface EventModifierState {
  executedTimes: number
  lastCall: number
}

type EventModifier = (evt: Event, state: EventModifierState) => boolean | Promise<boolean>

interface EventConfig {
  options?: EventListenerOptions
  modifiers?: EventModifier[]
}

// Modifiers
// Need to return true, otherwise provided callback will not be executed.
export const Modifiers = {
  throttle: (delay: number): EventModifier => (_, state) => {
    if (typeof delay !== 'number')
      return true
    return Date.now() - state.lastCall >= delay
  },
  if: (expression: boolean | Ref<boolean>): EventModifier => () => {
    return !!toValue(expression)
  },
  once: (_: Event, state: EventModifierState) => state.executedTimes === 0,
  stop: (evt: Event) => {
    evt.stopPropagation()
    return true
  },
  stopImmediate: (evt: Event) => {
    evt.stopImmediatePropagation()
    return true
  },
  prevent: (evt: Event) => {
    evt.preventDefault()
    return true
  },
  cancel: () => false,
  // TODO
  // delay: () => true,
  // debounce
} as const

export function on<PropsType extends object>(this: Component<PropsType>, type: keyof HTMLElementEventMap, listener: EventListenerOrEventListenerObject, config: EventConfig = {}) {
  const state: EventModifierState = {
    executedTimes: 0,
    lastCall: 0,
  }

  async function callbackHandler(evt: Event) {
    if (config.modifiers) {
      for (const modifier of config.modifiers) {
        if(!(await modifier(evt, state))) {
          return
        }
      }
    }
    
      if ('handleEvent' in listener)
        listener.handleEvent(evt)
      else
        listener(evt)
  
      state.executedTimes++
      state.lastCall = Date.now()
      
  }

  this.onMount(() => {
    this.el.addEventListener(type, callbackHandler, config.options)
  })
  this.onDestroy(() => {
    this.el.removeEventListener(type, callbackHandler)
  })
  return this
}

// Custom shorthands -----------------

export function click<PropsType extends object>(this: Component<PropsType>, listener: EventListenerOrEventListenerObject, options?: EventConfig) {
  return this.on('click', listener, options)
}

export function submit<PropsType extends object>(this: Component<PropsType>, listener: EventListenerOrEventListenerObject, options?: EventConfig) {
  return this.on('submit', listener, options)
}

export function focus<PropsType extends object>(this: Component<PropsType>, listener: EventListenerOrEventListenerObject, options?: EventConfig) {
  return this.on('focus', listener, options)
}

export function blur<PropsType extends object>(this: Component<PropsType>, listener: EventListenerOrEventListenerObject, options?: EventConfig) {
  return this.on('blur', listener, options)
}

export function change<PropsType extends object>(this: Component<PropsType>, listener: EventListenerOrEventListenerObject, options?: EventConfig) {
  return this.on('change', listener, options)
}

export function input<PropsType extends object>(this: Component<PropsType>, listener: EventListenerOrEventListenerObject, options?: EventConfig) {
  return this.on('input', listener, options)
}

export interface KeyInputOptions {
  // `some` will detect any of the provwided keys and call the listener
  // `every` will only trigger if all the keys have been hit in that exact sequence
  detect?: 'some' | 'every'
}

function keyEventImpl(this: Component<any>, eventType: 'keydown' | 'keyup' | 'keypress', keyOrArrayOfKeys: string | string[], listener: EventListenerOrEventListenerObject, options?: EventConfig & KeyInputOptions) {
  // Store pressed keys in case there are multiple keys to check for
  const history: string[] = []

  function addKeyToHistory(newKey: string) {
    history.push(newKey)
    // Remove keys which exceed the detection range
    if (history.length > keyOrArrayOfKeys.length)
      history.shift()
  }

  // Turn options into array either way
  const keysInArray = Array.isArray(keyOrArrayOfKeys) ? keyOrArrayOfKeys : [keyOrArrayOfKeys]

  this.on(eventType, (event) => {
    const key = (event as KeyboardEvent).key

    function callListener() {
      if (isFn(listener))
        listener(event)
      else
        listener.handleEvent(event)
    }

    switch (options?.detect || 'every') {
      case 'some': {
        if (keysInArray.includes(key))
          callListener()

        break
      }

      case 'every':
      default: {
        addKeyToHistory(key)

        const passed = keysInArray.every((expectedKey, index) => {
          return expectedKey === history[index]
        })

        if (passed)
          callListener()

        break
      }
    }
  }, options)
}

export function keydown<PropsType extends object>(this: Component<PropsType>, listener: EventListenerOrEventListenerObject, options?: EventConfig) {
  return this.on('keydown', listener, options)
}

export function keydownExact<PropsType extends object>(this: Component<PropsType>, requiredKeyOrKeys: string | string[], listener: EventListenerOrEventListenerObject, options?: EventConfig & KeyInputOptions) {
  keyEventImpl.call(this, 'keydown', requiredKeyOrKeys, listener, options)
  return this
}

export function keyup<PropsType extends object>(this: Component<PropsType>, listener: EventListenerOrEventListenerObject, options?: EventConfig) {
  return this.on('keyup', listener, options)
}

export function keyupExact<PropsType extends object>(this: Component<PropsType>, requiredKeyOrKeys: string | string[], listener: EventListenerOrEventListenerObject, options?: EventConfig & KeyInputOptions) {
  keyEventImpl.call(this, 'keyup', requiredKeyOrKeys, listener, options)
  return this
}

export function keypress<PropsType extends object>(this: Component<PropsType>, listener: EventListenerOrEventListenerObject, options?: EventConfig) {
  return this.on('keyup', listener, options)
}

export function keypressExact<PropsType extends object>(this: Component<PropsType>, requiredKeyOrKeys: string | string[], listener: EventListenerOrEventListenerObject, options?: EventConfig & KeyInputOptions) {
  keyEventImpl.call(this, 'keypress', requiredKeyOrKeys, listener, options)
  return this
}
