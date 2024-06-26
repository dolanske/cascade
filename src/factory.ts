import { Component, VoidComponent, fragment } from './component'
import type { ComponentChildren, ComponentChildrenItems, ComponentInstance, HtmlTags, HtmlVoidtags } from './types'
import { input, textarea } from './components/input'
import { option } from './components/select'
import { isArray } from './util'
import { img } from './components/img'

// List all available HTML elements
export const htmlNormalTags: HtmlTags[] = ['a', 'abbr', 'address', 'applet', 'article', 'aside', 'audio', 'b', 'basefont', 'bdi', 'bdo', 'bgsound', 'blink', 'blockquote', 'body', 'button', 'canvas', 'caption', 'cite', 'code', 'colgroup', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'html', 'i', 'iframe', 'ins', 'isindex', 'kbd', 'keygen', 'label', 'legend', 'li', 'listing', 'main', 'map', 'mark', 'menu', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'spacer', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'u', 'ul', 'video'] as const
export const htmlVoidTags: HtmlVoidtags[] = ['area', 'base', 'br', 'col', 'embed', 'hr', 'link', 'meta', 'source', 'track', 'wbr'] as const

// Create all elements with possible child elements
export const htmlNormalElFactory = htmlNormalTags.reduce((group, type) => {
  group[type] = (children: ComponentChildren = [], ...rest: ComponentChildrenItems[]) => {
    const root = document.createElement(type)
    const inst = new Component(root)
    const nested = isArray(children) ? children.concat(rest) : [children].concat(rest)
    inst.__children(nested)

    return inst
  }
  return group
}, {} as Record<HtmlTags, ComponentInstance>)

// All elements which can not have any child nodes (void elements)
export const htmlVoidElFactory = htmlVoidTags.reduce((group, type) => {
  group[type] = () => {
    const inst = new VoidComponent(type)
    return inst
  }
  return group
}, {} as Record<HtmlVoidtags, () => VoidComponent>)

// Merge all native elements and also custom elements into a single `El` object
export const El = Object.assign(htmlNormalElFactory, htmlVoidElFactory, {
  fragment,
  input,
  textarea,
  option,
  img
})
