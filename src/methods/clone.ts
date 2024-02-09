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

  cloned.__setupCopes = new Set(this.__setupCopes)
  // cloned.children = this.children
  // cloned.el = this.el.cloneNode(true) as HTMLElement
  // Object.defineProperty(cloned.el, '__instance', cloned)
  cloned.onInitCbs = Array.from(this.onInitCbs)
  cloned.onMountCbs = Array.from(this.onMountCbs)
  cloned.onDestroyCbs = Array.from(this.onDestroyCbs)
  cloned.runningWatchers = new Set()
  cloned.registeredWatcherParams = new Set(this.registeredWatcherParams)
  return cloned
}
