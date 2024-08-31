import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Component } from '../component'
import { registerWatchedProp } from '../property-method'

export function html<PropsType extends object>(this: Component<PropsType>, value: MaybeRefOrGetter<string>) {
  registerWatchedProp.call(this, 'innerHTML', value)
  return this
}
