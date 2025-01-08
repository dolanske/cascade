import type { Properties, PropertiesHyphen } from 'csstype'
import type { Component, Fragment } from './component'
import type { ReusableComponent } from './reusable'

export type HtmlTags = 'a' | 'abbr' | 'address' | 'applet' | 'article' | 'aside' | 'audio' | 'b' | 'basefont' | 'bdi' | 'bdo' | 'bgsound' | 'blink' | 'blockquote' | 'body' | 'button' | 'canvas' | 'caption' | 'cite' | 'code' | 'colgroup' | 'content' | 'data' | 'datalist' | 'dd' | 'decorator' | 'del' | 'details' | 'dfn' | 'div' | 'dl' | 'dt' | 'element' | 'em' | 'fieldset' | 'figcaption' | 'figure' | 'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'head' | 'header' | 'hgroup' | 'html' | 'i' | 'iframe' | 'ins' | 'isindex' | 'kbd' | 'keygen' | 'label' | 'legend' | 'li' | 'listing' | 'main' | 'map' | 'mark' | 'menu' | 'meter' | 'nav' | 'noscript' | 'object' | 'ol' | 'optgroup' | 'output' | 'p' | 'picture' | 'pre' | 'progress' | 'q' | 'rp' | 'rt' | 'ruby' | 's' | 'samp' | 'script' | 'section' | 'select' | 'shadow' | 'small' | 'spacer' | 'span' | 'strong' | 'style' | 'sub' | 'summary' | 'sup' | 'table' | 'tbody' | 'td' | 'template' | 'tfoot' | 'th' | 'thead' | 'time' | 'title' | 'tr' | 'u' | 'ul' | 'var' | 'video'
export type HtmlVoidtags = 'area' | 'base' | 'br' | 'col' | 'embed' | 'hr' | 'img' | 'link' | 'meta' | 'source' | 'track' | 'wbr'

export type CustomTags = 'fragment'
export type AvailableTags = HtmlTags | HtmlVoidtags | CustomTags

export type ComponentChildrenItems<PropsType extends object> = string | number | Component<PropsType> | Element | Fragment<PropsType> | ReusableComponent<PropsType>
export type ComponentChildren<PropsType extends object> = ComponentChildrenItems<PropsType> | ComponentChildrenItems<PropsType>[]
export type ComponentInstance = <PropsType extends object>(children?: ComponentChildren<PropsType>) => Component<PropsType>
export type ValueOf<T> = T[keyof T]
export interface CSSStyle extends Properties, PropertiesHyphen { }
export type GenericCallbackWithThis<PropsType extends object> = (this: Component<PropsType>) => void
export type GenericCallback = () => void

export type SetupArguments<PropsType extends object> = (componentInstance: Component<PropsType>, props: PropsType) => void
