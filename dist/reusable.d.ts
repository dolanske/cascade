/**
 * This file should outline the way reusable components are defined.
 */
import type { Component } from './component';
import { El } from './factory';
import type { SetupArguments } from './methods/setup';
import type { ComponentChildrenItems } from './types';
type ReusableComponent = (children?: ComponentChildrenItems) => Component;
export declare function reusable(el: keyof typeof El, setupFn: SetupArguments): ReusableComponent;
export {};
