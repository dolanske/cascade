import type { Primitive } from '@vue/reactivity'
import { VoidComponent } from '../component'
import { registerWatchedProp } from '../property-method'
import type { RefOrValue } from '../types'

type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'

export class InputElement<T extends HTMLInputElement | HTMLTextAreaElement> extends VoidComponent {
  el: T

  constructor(el: T, type?: InputType) {
    // @ts-expect-error Due to the implementation, most void tags will not
    // accept any children. But to save the amount of code you need to write, we
    // can allow the most important attribute on `input` to be passed into its
    // constructor. Also because we want extra type safery, we'll declare the
    // `el` property within this class instead.
    super()
    this.el = el

    if (this.el instanceof HTMLInputElement && type)
      this.el.type = type
  }

  type(type: InputType) {
    //@ts-expect-error Assign it anyway
    this.el.type = type
  }

  value(value: RefOrValue<Primitive | undefined>) {
    registerWatchedProp.call(this, 'value', value)
    return this
  }

  placeholder(value: RefOrValue<string | undefined>) {
    registerWatchedProp.call(this, 'placeholder', value)
    return this
  }

  name(value: RefOrValue<Primitive | undefined>) {
    registerWatchedProp.call(this, 'name', value)
    return this
  }

  required(value: RefOrValue<boolean>) {
    registerWatchedProp.call(this, 'required', value)
    return this
  }
}

export function input(type: InputType = 'text') {
  const el = document.createElement('input')
  return new InputElement(el, type)
}

export function textarea() {
  const el = document.createElement('textarea')
  return new InputElement(el)
}
