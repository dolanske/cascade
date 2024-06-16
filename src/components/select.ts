import type { Primitive } from '@vue/reactivity'
import { VoidComponent } from '../component'
import type { RefOrValue } from '../types'
import { registerWatchedProp } from '../property-method'

export class Option extends VoidComponent {
  declare el: HTMLOptionElement

  constructor(value?: string, label?: string) {
    super('option')

    if (value) {
      this.el.value = String(value)
      this.el.textContent = String(value)
    }

    if (label)
      this.el.textContent = String(label)
  }

  value(inputValue: RefOrValue<Primitive>) {
    registerWatchedProp.call(this, 'value', inputValue)
    return this
  }

  selected() {
    this.attr('selected')
    return this
  }
}

export function option(value?: string, label?: string) {
  return new Option(value, label)
}
