import type { Component } from '../component'

// TODO some nice types?

export function emit<PropsType extends object>(this: Component<PropsType>, event: string, data: any, options: CustomEventInit = {}) {
  this.el.dispatchEvent(new CustomEvent(event, {
    detail: data,
    ...options,
  }))
  return this
}
