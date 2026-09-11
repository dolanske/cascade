import type { MaybeRefOrGetter, Primitive } from '@vue/reactivity'
import type { Component } from '../component'
import { bindProp } from '../property-method'

export function id(this: Component<any, any>, value: MaybeRefOrGetter<Primitive>) {
  bindProp.call(this, 'id', value)
}
