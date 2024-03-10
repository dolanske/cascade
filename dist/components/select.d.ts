import type { Primitive } from '@vue/reactivity';
import { VoidComponent } from '../component';
import type { RefOrvalue } from '../types';
export declare class Option extends VoidComponent {
    el: HTMLOptionElement;
    constructor(value?: string, label?: string);
    value(inputValue: RefOrvalue<Primitive>): this;
    selected(): this;
}
export declare function option(value?: string, label?: string): Option;
