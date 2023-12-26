import type { Component } from '../component'

export function on(this: Component, type: keyof HTMLElementEventMap, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  this.el.addEventListener(type, listener, options)
  this.onDestroy(() => {
    this.el.removeEventListener(type, listener)
  })
  return this
}

// Specific listeners
export function click(this: Component, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) {
  this.el.addEventListener('click', listener, options)
  this.onDestroy(() => {
    this.el.removeEventListener('click', listener)
  })
  return this
}
