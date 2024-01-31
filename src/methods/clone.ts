import { Component } from '../component'

/**
 *
 * @param this CLlones itself self
 */
export function clone(this: Component): Component {
  const cloned = new Component(this.el)
  cloned.children = this.children
  cloned.el = this.el.cloneNode(true) as HTMLElement
  return cloned
}
