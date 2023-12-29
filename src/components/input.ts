import type { Primitive } from '@vue/reactivity'
import { VoidComponent } from '../component'

type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'

export class Input extends VoidComponent {
  el: HTMLInputElement

  constructor(type: InputType = 'text') {
    // @ts-expect-error Due to the implementation, most void tags will not
    // accept any children. But to save the amount of code you need to write, we
    // can allow the most important attribute on `input` to be passed into its
    // constructor. Also because we want extra type safery, we'll declare the
    // `el` property within this class instead.
    super()
    this.el = document.createElement('input')
    this.el.type = type
  }

  value(value: Primitive) {
    this.el.value = String(value)
    return this
  }

  placeholder(value: string) {
    this.el.placeholder = value
    return this
  }

  name(value: Primitive) {
    this.el.name = String(value)
    return this
  }
}

export function input(type: InputType = 'text') {
  return new Input(type)
}
