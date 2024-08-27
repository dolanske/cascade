import { Component } from '../component'

/**
 *
 * @param this Cllones itself self
 */
export function clone(this: Component): Component {
  const cloned = new Component(this.el)
  cloned.componentChildren = this.componentChildren
  cloned.__scopes = new Set(this.__scopes)

  return cloned
}
