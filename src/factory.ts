import { Component } from './component'
import type { ComponentInstance, HtmlTags } from './types'
import { portal } from './components/portal'
import { fragment } from './components/fragment'
import { isArray } from './util'

// List all available HTML elements
const nativeHtmlTags: HtmlTags[] = ['a', 'abbr', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'bgsound', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'div', 'dl', 'dt', 'element', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'isindex', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'listing', 'main', 'map', 'mark', 'menu', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'] as const

function elementFactory(type: HtmlTags): ComponentInstance {
  return (children) => {
    const root = document.createElement(type)
    const inst = new Component(root)

    if (children)
      inst.__children(children)
    return inst
  }
}

const nativeElImpl = nativeHtmlTags.reduce((group, elId) => {
  group[elId] = elementFactory(elId)
  return group
}, {} as Record<HtmlTags, ComponentInstance>)

export const El = Object.assign(nativeElImpl, {
  // TODO
  portal,
  fragment,
})

export function destroy(component: Component) {
  // Iterate over a component and all of its desendands and stop all of their reactive watchers
  // Then remove the root element
  // component.__releaseWatchers()

  function stop(cm: Component) {
    if (!(cm instanceof Component))
      return

    for (const cb of cm.onDestroyCbs)
      cb()

    const { children } = cm

    if (children instanceof Component) {
      stop(children)
    }
    else if (isArray(children)) {
      for (const child of children) {
        if (child instanceof Component)
          stop(child)
      }
    }
  }

  stop(component)

  // Remove root
  component.el.remove()
}
