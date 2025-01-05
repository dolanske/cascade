import type { Component } from '../component'

// TODO some nice types?

export function emit<PropsType extends object>(this: Component<PropsType>, eventName: string, data: unknown, options: CustomEventInit = {
  bubbles: true,
}) {
  this.el.dispatchEvent(new CustomEvent(eventName, {
    detail: data,
    ...options,
  }))
  return this
}
