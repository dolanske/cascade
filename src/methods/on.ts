import type { Ref } from '@vue/reactivity'
import type { Component } from '../component'
import { toValue } from '@vue/reactivity'

export interface EventModifierState {
  executedTimes: number
  lastCall: number
}

/**
 * Runs before the listener. Returning `false` (or a promise of `false`)
 * cancels the listener.
 */
export type EventModifier = (evt: Event, state: EventModifierState) => boolean | Promise<boolean>

export interface EventConfig {
  options?: AddEventListenerOptions
  modifiers?: EventModifier[]
}

//////////////////////////////
// Modifiers

/**
 * Throttle the execution of the event callback based on the provided delay amount
 *
 * @param amount Delay in milliseconds
 * @returns EventModifier
 */
function throttle(amount: number): EventModifier {
  return (_, state) => {
    if (typeof amount !== 'number')
      return true
    return Date.now() - state.lastCall >= amount
  }
}

/**
 * Delays the execution of the event callback
 *
 * @param amount Delay in milliseconds
 */
function delay(amount: number): EventModifier {
  return () => new Promise<boolean>((r) => {
    setTimeout(() => r(true), amount)
  })
}

/**
 * Executes the event callback only once.
 */
const once: EventModifier = (_, state) => {
  return state.executedTimes === 0
}

/**
 * Stop event propagation
 */
const stop: EventModifier = (evt) => {
  evt.stopPropagation()
  return true
}

/**
 * Stop immediate event propagation
 */
const stopImmediate: EventModifier = (evt) => {
  evt.stopImmediatePropagation()
  return true
}

/**
 * Prevent default
 */
const prevent: EventModifier = (evt) => {
  evt.preventDefault()
  return true
}

/**
 * Cancel execution of the callback on event fire
 */
const cancel: EventModifier = () => false

/**
 * Only runs the callback when the event originates from the element itself,
 * not from a child.
 */
const self: EventModifier = evt => evt.target === evt.currentTarget

export const Modifier = {
  /**
   * Executes event callback if the provided expression passes.
   *
   * @param expression Ref<boolean> | boolean
   * @returns EventModifier
   */
  if: (expression: boolean | Ref<boolean> | (() => boolean)): EventModifier => () => {
    return !!toValue(expression)
  },
  throttle,
  once,
  stop,
  stopImmediate,
  prevent,
  cancel,
  delay,
  self,
} as const

//////////////////////////////
// Implementation

export type CascadeEvent = (e: any, data?: any) => void

export function on(this: Component<any, any>, type: string, listener: CascadeEvent, config: EventConfig = {}) {
  const state: EventModifierState = {
    executedTimes: 0,
    lastCall: 0,
  }
  const modifiers = config.modifiers

  const run = (evt: Event) => {
    listener(evt, 'detail' in evt ? (evt as CustomEvent).detail : undefined)
    state.executedTimes++
    state.lastCall = Date.now()
  }

  // Modifiers run synchronously unless one of them returns a promise, so
  // `preventDefault()` inside the listener still works.
  const handler = (evt: Event) => {
    if (!modifiers || modifiers.length === 0)
      return run(evt)

    let i = 0
    const step = (): void | Promise<void> => {
      while (i < modifiers.length) {
        const result = modifiers[i++](evt, state)
        if (result instanceof Promise) {
          return result.then((passed) => {
            if (passed)
              return step()
          })
        }
        if (!result)
          return
      }
      run(evt)
    }

    step()
  }

  this.onMount(() => {
    this.el.addEventListener(type, handler, config.options)
    return () => this.el.removeEventListener(type, handler, config.options)
  })
}

//////////////////////////////
// Keyboard

export interface KeyInputOptions {
  /**
   * `some` triggers the listener when any of the provided keys is pressed.
   * `every` (default) only triggers when all keys have been pressed in that
   * exact sequence.
   */
  detect?: 'some' | 'every'
}

export function keyEventImpl(this: Component<any, any>, eventType: 'keydown' | 'keyup' | 'keypress', keyOrArrayOfKeys: string | string[], listener: CascadeEvent, options?: EventConfig & KeyInputOptions) {
  const keys = Array.isArray(keyOrArrayOfKeys) ? keyOrArrayOfKeys : [keyOrArrayOfKeys]
  // Last pressed keys, at most as many as we are looking for
  const history: string[] = []

  this.on(eventType, (event: KeyboardEvent) => {
    const key = event.key

    if (options?.detect === 'some') {
      if (keys.includes(key))
        listener(event)
      return
    }

    history.push(key)
    if (history.length > keys.length)
      history.shift()

    if (history.length === keys.length && keys.every((expected, index) => expected === history[index]))
      listener(event)
  }, options)
}
