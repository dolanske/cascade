import type { Ref, UnwrapRef } from '@vue/reactivity';
import type { Component } from '../component';
import type { ComponentChildrenItems } from '../types';
export type Source = any[] | number | object;
export type CallbackType<T> = T extends any[] ? (value: T[number], index: number) => ComponentChildrenItems : T extends object ? (value: keyof T, key: string, index: number) => ComponentChildrenItems : (index: number) => ComponentChildrenItems;
export declare function for_impl(this: Component, source: Source | Ref<Source>, callback: CallbackType<UnwrapRef<Source>>): Component;
