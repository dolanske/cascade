import type { Ref } from '@vue/reactivity';
import type { Component } from '../component';
export type ConditionalExpr = boolean | Ref<boolean | undefined> | undefined;
export declare function if_impl(this: Component, expr: ConditionalExpr): Component;
