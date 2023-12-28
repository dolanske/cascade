import type { Component } from '../component'

// TODO: modifiers
// TODO: modifiers with parameters

export function on(this: Component, type: keyof HTMLElementEventMap, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  this.onMount(() => {
    this.el.addEventListener(type, listener, options)
  })
  this.onDestroy(() => {
    this.el.removeEventListener(type, listener)
  })
  return this
}

export function click(this: Component, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  this.on('click', listener, options)
  return this
}
