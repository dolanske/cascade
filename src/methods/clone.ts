import { Component } from '../component'

/**
 *
 * @param this Cllones itself self
 */
export function clone(this: Component): Component {
  const cloned = new Component(this.el.cloneNode(true) as HTMLElement)
  cloned.children = this.children
  cloned.scopes = this.scopes

  return cloned
}
