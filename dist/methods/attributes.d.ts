import { type Primitive, type Ref } from '@vue/reactivity';
import type { Component } from '../component';
type Attributes = Record<string, Primitive>;
export declare function setAttribute(el: HTMLElement, key: string | Attributes, value?: Primitive): void;
export declare function attrs(this: Component, attrData: Attributes | Ref<Attributes>): Component;
export declare function attr(this: Component, key: string, value?: Primitive | Ref<Primitive>): Component;
export {};
