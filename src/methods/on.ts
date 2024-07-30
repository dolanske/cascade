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

export function on(this: Component, type: keyof HTMLElementEventMap, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  this.onMount(() => {
    this.el.addEventListener(type, listener, options)
  })
  this.onDestroy(() => {
    this.el.removeEventListener(type, listener)
  })
  return this
}

// Custom shorthands -----------------

export function click(this: Component, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  return this.on('click', listener, options)
}

export function submit(this: Component, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  return this.on('submit', listener, options)
}

export function focus(this: Component, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  return this.on('focus', listener, options)
}

export function change(this: Component, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  return this.on('change', listener, options)
}

export function input(this: Component, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  return this.on('input', listener, options)
}

export interface KeyInputOptions {
  // `some` will detect any of the provwided keys and call the listener
  // `every` will only trigger if all the keys have been hit in that exact sequence
  detect?: 'some' | 'every'
}

function keyEventImpl(this: Component, eventType: 'keydown' | 'keyup' | 'keypress', keyOrArrayOfKeys: string | string[], listener: EventListenerOrEventListenerObject, options?: EventListenerOptions & KeyInputOptions) {
  // Store pressed keys in case there are multiple keys to check for
  const history: string[] = []

  function addKeyToHistory(newKey: string) {
    history.push(newKey)
    // Remove keys which exceed the detection range
    if (history.length > keyOrArrayOfKeys.length) {
      history.shift()
    }
  }

  // Turn options into array either way
  const keysInArray = Array.isArray(keyOrArrayOfKeys) ? keyOrArrayOfKeys : [keyOrArrayOfKeys]

  return this.on(eventType, (event) => {
    const key = (event as KeyboardEvent).key 

    function callListener() {
      if (isFn(listener)) {
        listener(event)
      } else {
        listener.handleEvent(event)
      }
    }

    switch(options?.detect || 'every') {
      case 'every': {
        addKeyToHistory(key)

        const passed = keysInArray.every((expectedKey, index) => {
          if (expectedKey === history[index])
            return true
        })

        if (passed) {
          callListener()
        }
        break
      }

      case 'some': {
        if (keysInArray.includes(key)) {
          callListener()
        }
        break
      }
    }
  }, options as EventListenerOptions)
}

export function keydown(this: Component, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  return this.on("keydown", listener, options)
}

export function keydownExact(this: Component, requiredKeyOrKeys: string | string[], listener: EventListenerOrEventListenerObject, options?: EventListenerOptions & KeyInputOptions) { 
  return keyEventImpl.call(this, 'keydown' ,requiredKeyOrKeys, listener, options)
}

export function keyup(this: Component, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  return this.on("keyup", listener, options)
}

export function keyupExact(this: Component, requiredKeyOrKeys: string | string[], listener: EventListenerOrEventListenerObject, options?: EventListenerOptions & KeyInputOptions) { 
  return keyEventImpl.call(this, 'keyup' ,requiredKeyOrKeys, listener, options)
}

export function keypress(this: Component, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  return this.on("keyup", listener, options)
}

export function keypressExact(this: Component, requiredKeyOrKeys: string | string[], listener: EventListenerOrEventListenerObject, options?: EventListenerOptions & KeyInputOptions) { 
  return keyEventImpl.call(this, 'keypress' ,requiredKeyOrKeys, listener, options)
}
