import { type Ref } from '@vue/reactivity';
import type { Component } from '../component';
export type ClassObject = Record<string, boolean | Ref<boolean>>;
export type ClassNames = string | ClassObject;
export declare function class_impl(this: Component, classNames?: ClassNames, value?: boolean | Ref<boolean>): Component;
