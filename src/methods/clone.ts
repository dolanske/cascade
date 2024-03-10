import { Component } from '../component'

/**
 *
 * @param this Cllones itself self
 */
export function clone(this: Component): Component {
  // const clonedDom = this.el.outerHTML
  // const fragment = document.createElement('div')
  // fragment.innerHTML = clonedDom
  // const cloned = new Component(fragment.firstElementChild! as HTMLElement)
  const cloned = new Component(this.el)
  cloned.children = this.children
  cloned.scopes = new Set(this.scopes)

  return cloned
}
