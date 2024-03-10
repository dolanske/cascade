import type { Component } from './component';
export declare function isObject(value: any): value is object;
export declare function isNil(value: any): value is null | undefined;
export declare function isArray(value: any): value is Array<any>;
/**
 * Returns the associated component instnace, if the element has one
 *
 * @param el HTMLElement
 * @returns Component | null
 */
export declare function getInstance(el: HTMLElement | Element): Component | null;
export declare const WATCH_CONF: {
    immediate: boolean;
    deep: boolean;
};
