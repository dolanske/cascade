import type { Primitive, Ref } from '@vue/reactivity';
import type { Component } from '../component';
type ModelTransform<T = string> = (value: string) => T;
export declare const NUMBER: ModelTransform<number>;
export declare const TRIM: ModelTransform;
export declare const UPPERCASE: ModelTransform;
export interface ModelOptions {
    lazy?: boolean;
    transforms?: ModelTransform[];
    eventOptions?: EventListenerOptions;
}
export declare function model(this: Component, defaultRef: Ref<Primitive | Primitive[]>, options?: ModelOptions): Component;
export {};
