import { Component } from '../component'

/**
 *
 * @param this CLlones itself self
 */
export function clone(this: Component): Component {
  const cloned = new Component(this.el)
  cloned.children = this.children
  cloned.el = this.el.cloneNode(true) as HTMLElement
  Object.defineProperty(cloned.el, '__instance', cloned)
  cloned.onInitCbs = []
  cloned.onMountCbs = []
  cloned.onDestroyCbs = []
  cloned.__stopWatchers()
  return cloned
}
