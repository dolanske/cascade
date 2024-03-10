import type { Component } from '../component';
export declare function on(this: Component, type: keyof HTMLElementEventMap, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions): Component;
export declare function click(this: Component, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions): Component;
