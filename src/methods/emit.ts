import type { Component } from '../component'

export function emit(this: Component<any, any>, eventName: string, data?: unknown, options: CustomEventInit = {}) {
  this.el.dispatchEvent(new CustomEvent(eventName, {
    bubbles: true,
    ...options,
    detail: data,
  }))
}
