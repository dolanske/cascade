import { Component } from './component'
import type { ComponentInstance, HtmlTags } from './types'
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
  fragment,
})
