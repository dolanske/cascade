import { type MaybeRefOrGetter, type Primitive, toValue } from '@vue/reactivity'
import { VoidComponent } from '../component'
import { registerWatchedProp } from '../property-method'
import { isWatchSource } from '../util'

export class Option<PropsType extends object> extends VoidComponent<PropsType> {
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

export function option<PropsType extends object>(label?: string, value?: MaybeRefOrGetter<Primitive>) {
  return new Option<PropsType>(label, value)
}
