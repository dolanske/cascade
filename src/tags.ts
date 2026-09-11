/**
 * Every tag has a factory function. The list is the single source of truth,
 * the `HtmlTags` / `HtmlVoidtags` types are derived from it, so a tag can not
 * end up in the type without also having a runtime factory.
 */
export const htmlNormalTags = ['a', 'abbr', 'address', 'applet', 'article', 'aside', 'audio', 'b', 'basefont', 'bdi', 'bdo', 'bgsound', 'blink', 'blockquote', 'body', 'button', 'canvas', 'caption', 'cite', 'code', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'html', 'i', 'iframe', 'ins', 'isindex', 'kbd', 'keygen', 'label', 'legend', 'li', 'listing', 'main', 'map', 'mark', 'menu', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'small', 'spacer', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'u', 'ul', 'var', 'video'] as const

export const htmlVoidTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'link', 'meta', 'source', 'track', 'wbr'] as const

export type HtmlTags = typeof htmlNormalTags[number]
export type HtmlVoidtags = typeof htmlVoidTags[number] | 'img'
