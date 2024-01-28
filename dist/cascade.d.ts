import type { Component } from './component';
import type { Fragment } from './component';
import { fragment } from './component';
import type { Primitive } from '@vue/reactivity';
import type { Ref } from '@vue/reactivity';
import { VoidComponent } from './component';
import { VoidComponent as VoidComponent_2 } from '../component';

export { Component }

declare type ComponentChildren = ComponentChildrenItems | ComponentChildrenItems[];

declare type ComponentChildrenItems = string | number | Component | Element | Fragment | (() => string | number);

declare type ComponentInstance = (children?: ComponentChildren) => Component;

export declare const El: Record<HtmlTags, ComponentInstance> & Record<HtmlVoidtags, () => VoidComponent> & {
    fragment: typeof fragment;
    input: typeof input;
    textarea: typeof textarea;
    option: typeof option;
};

/**
 * Returns the associated component instnace, if the element has one
 *
 * @param el HTMLElement
 * @returns Component | null
 */
export declare function getInstance(el: HTMLElement | Element): Component | null;

declare type HtmlTags = 'a' | 'abbr' | 'address' | 'applet' | 'article' | 'aside' | 'audio' | 'b' | 'basefont' | 'bdi' | 'bdo' | 'bgsound' | 'blink' | 'blockquote' | 'body' | 'button' | 'canvas' | 'caption' | 'cite' | 'code' | 'colgroup' | 'content' | 'data' | 'datalist' | 'dd' | 'decorator' | 'del' | 'details' | 'dfn' | 'div' | 'dl' | 'dt' | 'element' | 'em' | 'fieldset' | 'figcaption' | 'figure' | 'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'head' | 'header' | 'hgroup' | 'html' | 'i' | 'iframe' | 'ins' | 'isindex' | 'kbd' | 'keygen' | 'label' | 'legend' | 'li' | 'listing' | 'main' | 'map' | 'mark' | 'menu' | 'meter' | 'nav' | 'noscript' | 'object' | 'ol' | 'optgroup' | 'output' | 'p' | 'picture' | 'pre' | 'progress' | 'q' | 'rp' | 'rt' | 'ruby' | 's' | 'samp' | 'script' | 'section' | 'select' | 'shadow' | 'small' | 'spacer' | 'span' | 'strong' | 'style' | 'sub' | 'summary' | 'sup' | 'table' | 'tbody' | 'td' | 'template' | 'tfoot' | 'th' | 'thead' | 'time' | 'title' | 'tr' | 'u' | 'ul' | 'var' | 'video';

declare type HtmlVoidtags = 'area' | 'base' | 'br' | 'col' | 'embed' | 'hr' | 'img' | 'link' | 'meta' | 'source' | 'track' | 'wbr';

declare function input(type?: InputType): InputElement<HTMLInputElement>;

declare class InputElement<T extends HTMLInputElement | HTMLTextAreaElement> extends VoidComponent_2 {
    el: T;
    constructor(el: T, type?: InputType);
    value(value: RefOrvalue<Primitive>): this;
    placeholder(value: RefOrvalue<string>): this;
    name(value: RefOrvalue<Primitive>): this;
    required(value: RefOrvalue<boolean>): this;
}

declare type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

declare function option(value?: string, label?: string): Option_2;

declare class Option_2 extends VoidComponent_2 {
    el: HTMLOptionElement;
    constructor(value?: string, label?: string);
    value(inputValue: RefOrvalue<Primitive>): this;
    selected(): this;
}

declare type RefOrvalue<T> = T | (() => T) | Ref<T>;

declare function textarea(): InputElement<HTMLTextAreaElement>;

export { }
