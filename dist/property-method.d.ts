import type { Primitive, Ref } from '@vue/reactivity';
import type { Component } from './component';
type DefaultWatchedValue = Primitive | Ref<Primitive>;
/**
 * Many methods set a single property on the root element. This function should
 * simplify adding more of these properties in the future
 */
export declare function registerWatchedProp<T extends DefaultWatchedValue>(this: Component, key: string, value: T, stringifyValue?: boolean): Component;
export {};
