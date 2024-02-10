import { Component } from '../component'

/**
 *
 * @param this CLlones itself self
 */
export function clone(this: Component): Component {
  const html = this.el.outerHTML
  const parser = new DOMParser()
  const parsedDocument = parser.parseFromString(html, 'text/html')
  const el = parsedDocument.body.firstElementChild as HTMLElement

  const cloned = new Component(el)

  cloned.children = this.children
  // cloned.el = this.el.cloneNode(true) as HTMLElement
  // Object.defineProperty(cloned.el, '__instance', cloned)
  cloned.onInitCbs = this.onInitCbs
  cloned.onMountCbs = this.onMountCbs
  // cloned.onDestroyCbs = this.onDestroyCbs

  cloned.componentProps = {}

  return cloned
}
