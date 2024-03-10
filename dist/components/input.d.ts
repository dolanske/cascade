import type { Primitive } from '@vue/reactivity';
import { VoidComponent } from '../component';
import type { RefOrvalue } from '../types';
type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';
export declare class InputElement<T extends HTMLInputElement | HTMLTextAreaElement> extends VoidComponent {
    el: T;
    constructor(el: T, type?: InputType);
    value(value: RefOrvalue<Primitive | undefined>): this;
    placeholder(value: RefOrvalue<string | undefined>): this;
    name(value: RefOrvalue<Primitive | undefined>): this;
    required(value: RefOrvalue<boolean>): this;
}
export declare function input(type?: InputType): InputElement<HTMLInputElement>;
export declare function textarea(): InputElement<HTMLTextAreaElement>;
export {};
