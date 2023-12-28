import { Component, VoidComponent, fragment } from './component'
import type { ComponentChildren, ComponentInstance, HtmlTags, HtmlVoidtags } from './types'
import { input } from './components/input'
import { isArray } from './util'

// List all available HTML elements
const htmlNormalTags: HtmlTags[] = ['a', 'abbr', 'address', 'applet', 'article', 'aside', 'audio', 'b', 'basefont', 'bdi', 'bdo', 'bgsound', 'blink', 'blockquote', 'body', 'button', 'canvas', 'caption', 'cite', 'code', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'html', 'i', 'iframe', 'ins', 'isindex', 'kbd', 'keygen', 'label', 'legend', 'li', 'listing', 'main', 'map', 'mark', 'menu', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'small', 'spacer', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'u', 'ul', 'var', 'video'] as const
const htmlVoidTags: HtmlVoidtags[] = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'link', 'meta', 'source', 'track', 'wbr'] as const

// Create all elements with possible child elements
const htmlNormalElFactory = htmlNormalTags.reduce((group, type) => {
  group[type] = (children?: ComponentChildren) => {
    const root = document.createElement(type)
    const inst = new Component(root)

    if (children)
      inst.__children(children)
    return inst
  }
  return group
}, {} as Record<HtmlTags, ComponentInstance>)

// All elements which can not have any child nodes (void elements)
const htmlVoidElFactory = htmlVoidTags.reduce((group, type) => {
  group[type] = () => {
    const inst = new VoidComponent(type)
    return inst
  }
  return group
}, {} as Record<HtmlVoidtags, () => VoidComponent>)

// Combine all native elements and also custom elements into a single `El` object
export const El = Object.assign(htmlNormalElFactory, htmlVoidElFactory, {
  fragment,
  input,
})

// Iterate over a component and all of its desendands and stop all of their
// reactive watchers. Then remove the root element. Deactivate component
export function destroy(component: Component) {
  function stop(comp: Component) {
    if (!(comp instanceof Component))
      return

    for (const cb of comp.onDestroyCbs)
      cb()

    const { children } = comp

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

  component.__runOnDestroy()

  // Remove root
  component.el.remove()
}
