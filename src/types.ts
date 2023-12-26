import type { Ref, UnwrapNestedRefs } from '@vue/reactivity'
import type { Properties, PropertiesHyphen } from 'csstype'
import type { Component } from './component'
import type { Fragment } from './components/fragment'

export type HtmlTags = 'a' | 'abbr' | 'address' | 'applet' | 'area' | 'article' | 'aside' | 'audio' | 'b' | 'base' | 'basefont' | 'bdi' | 'bdo' | 'bgsound' | 'blink' | 'blockquote' | 'body' | 'br' | 'button' | 'canvas' | 'caption' | 'cite' | 'code' | 'col' | 'colgroup' | 'content' | 'data' | 'datalist' | 'dd' | 'decorator' | 'del' | 'details' | 'dfn' | 'div' | 'dl' | 'dt' | 'element' | 'em' | 'embed' | 'fieldset' | 'figcaption' | 'figure' | 'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'head' | 'header' | 'hgroup' | 'hr' | 'html' | 'i' | 'iframe' | 'img' | 'input' | 'ins' | 'isindex' | 'kbd' | 'keygen' | 'label' | 'legend' | 'li' | 'link' | 'listing' | 'main' | 'map' | 'mark' | 'menu' | 'meta' | 'meter' | 'nav' | 'noscript' | 'object' | 'ol' | 'optgroup' | 'option' | 'output' | 'p' | 'picture' | 'pre' | 'progress' | 'q' | 'rp' | 'rt' | 'ruby' | 's' | 'samp' | 'script' | 'section' | 'select' | 'shadow' | 'small' | 'source' | 'spacer' | 'span' | 'strong' | 'style' | 'sub' | 'summary' | 'sup' | 'table' | 'tbody' | 'td' | 'template' | 'textarea' | 'tfoot' | 'th' | 'thead' | 'time' | 'title' | 'tr' | 'track' | 'u' | 'ul' | 'var' | 'video' | 'wbr'
export type CustomTags = 'fragment' | 'portal'

export type AvailableTags = HtmlTags | CustomTags

type ComponentChildrenItems = string | number | Component | Element | Fragment | (() => string | number)

export type ComponentChildren = ComponentChildrenItems | ComponentChildrenItems[]
export type ComponentDeps = Array<Ref | UnwrapNestedRefs<object>>
export type ComponentInstance = (children?: ComponentChildren) => Component

export type ValueOf<T> = T[keyof T]
export interface CSSStyle extends Properties, PropertiesHyphen { }

export type GenericCallbackWithThis = (this: Component) => void
export type GenericCallback = () => void
