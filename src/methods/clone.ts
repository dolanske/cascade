import { Component } from '../component'

/**
 *
 * @param this Cllones itself self
 */
export function clone(this: Component): Component {
  const cloned = new Component(this.el)
  cloned.children = this.children
  cloned.scopes = new Set(this.scopes)

  return cloned
}
