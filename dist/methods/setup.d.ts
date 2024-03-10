import type { Component } from '../component';
export type SetupArguments = (componentInstance: Component, props: any) => void;
export declare function setup(this: Component, setupFn: SetupArguments): Component;
export declare function prop(this: Component, key: string, value: any): Component;
export declare function props(this: Component, props: Record<string, any>): Component;
