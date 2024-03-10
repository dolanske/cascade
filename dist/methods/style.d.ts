import { type Ref } from '@vue/reactivity';
import type { Component } from '../component';
import type { CSSStyle } from '../types';
type LimitedPrimitive = string | number;
export declare function style(this: Component, key: keyof CSSStyle | CSSStyle | Ref<CSSStyle>, value?: LimitedPrimitive | Ref<LimitedPrimitive>): Component;
export {};
