import type { MaybeRefOrGetter, Primitive } from '@vue/reactivity'
import type { EventsMap, NoEvents } from '../types'
import { toValue } from '@vue/reactivity'
import { VoidComponent } from '../component'
import { bindProp } from '../property-method'
import { isNil, isWatchSource } from '../util'

export class Option<PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents> extends VoidComponent<PropsType, EventsType> {
  declare el: HTMLOptionElement

  constructor(label?: MaybeRefOrGetter<Primitive>, value?: MaybeRefOrGetter<Primitive>) {
    super(document.createElement('option'))

    if (!isNil(value)) {
      // Without a label the value doubles as the visible text
      if (isNil(label))
        this.text(value)
      this.value(value)
    }

    if (!isNil(label))
      this.text(label)
  }

  value(inputValue: MaybeRefOrGetter<Primitive>) {
    bindProp.call(this, 'value', inputValue)
    return this
  }

  /**
   * Marks the option as selected. Pass a ref or getter to control it
   * reactively.
   */
  selected(value: MaybeRefOrGetter<boolean> = true) {
    if (isWatchSource(value))
      bindProp.call(this, 'selected', value)
    else if (toValue(value))
      this.attr('selected', true)
    return this
  }
}

export function option<PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>(label?: MaybeRefOrGetter<Primitive>, value?: MaybeRefOrGetter<Primitive>) {
  return new Option<PropsType, EventsType>(label, value)
}
