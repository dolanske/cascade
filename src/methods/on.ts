import type { Component } from '../component'
import { isFn } from '../util'

// TODO: modifiers
// TODO: modifiers with parameters

// Event modifier works differently
// type EventTransform = () => boolean

// interface OnOptions {
//   options: EventListenerOptions,
//   transforms: EventTransform[]
// }

export function on<PropsType extends object>(this: Component<PropsType>, type: keyof HTMLElementEventMap, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  this.onMount(() => {
    this.el.addEventListener(type, listener, options)
  })
  this.onDestroy(() => {
    this.el.removeEventListener(type, listener)
  })
  return this
}

// Custom shorthands -----------------

export function click<PropsType extends object>(this: Component<PropsType>, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  return this.on('click', listener, options)
}

export function submit<PropsType extends object>(this: Component<PropsType>, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  return this.on('submit', listener, options)
}

export function focus<PropsType extends object>(this: Component<PropsType>, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  return this.on('focus', listener, options)
}

export function blur<PropsType extends object>(this: Component<PropsType>, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  return this.on('blur', listener, options)
}

export function change<PropsType extends object>(this: Component<PropsType>, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  return this.on('change', listener, options)
}

export function input<PropsType extends object>(this: Component<PropsType>, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  return this.on('input', listener, options)
}

export interface KeyInputOptions {
  // `some` will detect any of the provwided keys and call the listener
  // `every` will only trigger if all the keys have been hit in that exact sequence
  detect?: 'some' | 'every'
}

function keyEventImpl(this: Component<any>, eventType: 'keydown' | 'keyup' | 'keypress', keyOrArrayOfKeys: string | string[], listener: EventListenerOrEventListenerObject, options?: EventListenerOptions & KeyInputOptions) {
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
  }, options as EventListenerOptions)
}

export function keydown<PropsType extends object>(this: Component<PropsType>, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  return this.on('keydown', listener, options)
}

export function keydownExact<PropsType extends object>(this: Component<PropsType>, requiredKeyOrKeys: string | string[], listener: EventListenerOrEventListenerObject, options?: EventListenerOptions & KeyInputOptions) {
  keyEventImpl.call(this, 'keydown', requiredKeyOrKeys, listener, options)
  return this
}

export function keyup<PropsType extends object>(this: Component<PropsType>, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  return this.on('keyup', listener, options)
}

export function keyupExact<PropsType extends object>(this: Component<PropsType>, requiredKeyOrKeys: string | string[], listener: EventListenerOrEventListenerObject, options?: EventListenerOptions & KeyInputOptions) {
  keyEventImpl.call(this, 'keyup', requiredKeyOrKeys, listener, options)
  return this
}

export function keypress<PropsType extends object>(this: Component<PropsType>, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  return this.on('keyup', listener, options)
}

export function keypressExact<PropsType extends object>(this: Component<PropsType>, requiredKeyOrKeys: string | string[], listener: EventListenerOrEventListenerObject, options?: EventListenerOptions & KeyInputOptions) {
  keyEventImpl.call(this, 'keypress', requiredKeyOrKeys, listener, options)
  return this
}
