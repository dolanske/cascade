import type { MaybeRefOrGetter, Primitive } from '@vue/reactivity'
import type { EventsMap, NoEvents } from '../types'
import { VoidComponent } from '../component'
import { bindProp } from '../property-method'

export type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'

export class InputElement<T extends HTMLInputElement | HTMLTextAreaElement, PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents> extends VoidComponent<PropsType, EventsType> {
  declare el: T

  constructor(el: T, type?: InputType) {
    super(el)

    if (el instanceof HTMLInputElement && type)
      el.type = type
  }

  type(type: InputType) {
    if (this.el instanceof HTMLInputElement)
      this.el.type = type
    return this
  }

  value(value: MaybeRefOrGetter<Primitive>) {
    bindProp.call(this, 'value', value)
    return this
  }

  placeholder(value: MaybeRefOrGetter<string | undefined>) {
    bindProp.call(this, 'placeholder', value)
    return this
  }

  name(value: MaybeRefOrGetter<string | undefined>) {
    bindProp.call(this, 'name', value)
    return this
  }

  required(value: MaybeRefOrGetter<boolean> = true) {
    bindProp.call(this, 'required', value)
    return this
  }

  /**
   * Checked state of checkbox and radio inputs. For two way binding use
   * `.model()`.
   */
  checked(value: MaybeRefOrGetter<boolean> = true) {
    bindProp.call(this, 'checked', value)
    return this
  }

  min(value: MaybeRefOrGetter<Primitive>) {
    this.attr('min', value)
    return this
  }

  max(value: MaybeRefOrGetter<Primitive>) {
    this.attr('max', value)
    return this
  }

  step(value: MaybeRefOrGetter<Primitive>) {
    this.attr('step', value)
    return this
  }

  autofocus(value: MaybeRefOrGetter<boolean> = true) {
    bindProp.call(this, 'autofocus', value)
    return this
  }
}

export function input<PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>(type: InputType = 'text') {
  const el = document.createElement('input')
  return new InputElement<HTMLInputElement, PropsType, EventsType>(el, type)
}

export function textarea<PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>() {
  const el = document.createElement('textarea')
  return new InputElement<HTMLTextAreaElement, PropsType, EventsType>(el)
}
