import type { MaybeRefOrGetter, Primitive } from '@vue/reactivity'
import { VoidComponent } from '../component'
import { registerWatchedProp } from '../property-method'

type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'

export class InputElement<T extends HTMLInputElement | HTMLTextAreaElement, PropsType extends object> extends VoidComponent<PropsType> {
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
    // @ts-expect-error Assign it anyway
    this.el.type = type
  }

  value(value: MaybeRefOrGetter<Primitive>) {
    registerWatchedProp.call(this, 'value', value)
    return this
  }

  placeholder(value: MaybeRefOrGetter<string | undefined>) {
    registerWatchedProp.call(this, 'placeholder', value)
    return this
  }

  name(value: MaybeRefOrGetter<string | undefined>) {
    registerWatchedProp.call(this, 'name', value)
    return this
  }

  required(value: MaybeRefOrGetter<boolean>) {
    registerWatchedProp.call(this, 'required', value)
    return this
  }
}

export function input<PropsType extends object>(type: InputType = 'text') {
  const el = document.createElement('input')
  return new InputElement<HTMLInputElement, PropsType>(el, type)
}

export function textarea<PropsType extends object>() {
  const el = document.createElement('textarea')
  return new InputElement<HTMLTextAreaElement, PropsType>(el)
}
