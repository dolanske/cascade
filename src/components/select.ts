import { type MaybeRefOrGetter, type Primitive, toValue } from '@vue/reactivity'
import { VoidComponent } from '../component'
import { registerWatchedProp } from '../property-method'
import { isWatchSource } from '../util'

export class Option extends VoidComponent {
  declare el: HTMLOptionElement

  constructor(label?: string, value?: MaybeRefOrGetter<Primitive>) {
    super('option')

    if (value) {
      const parsedValue = toValue(value)
      this.el.value = String(parsedValue)
      this.el.textContent = String(parsedValue)

      // Automatically watch in case it's a ref
      if (isWatchSource(value))
        this.value(value)
    }

    if (label)
      this.el.textContent = String(label)
  }

  value(inputValue: MaybeRefOrGetter<Primitive>) {
    registerWatchedProp.call(this, 'value', inputValue)
    return this
  }

  selected() {
    this.attr('selected')
    return this
  }
}

export function option(label?: string, value?: MaybeRefOrGetter<Primitive>) {
  return new Option(label, value)
}
