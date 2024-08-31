import type { MaybeRefOrGetter, Primitive } from '@vue/reactivity'
import type { Component } from '../component'
import { registerWatchedProp } from '../property-method'

export function text<PropsType extends object>(this: Component<PropsType>, value: MaybeRefOrGetter<Primitive>) {
  registerWatchedProp.call(this, 'textContent', value?.toString())
  return this
}
