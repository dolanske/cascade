import type { MaybeRefOrGetter, Primitive } from '@vue/reactivity'
import type { Component } from '../component'
import { registerWatchedProp } from '../property-method'

export function id(this: Component, value: MaybeRefOrGetter<Primitive>) {
  registerWatchedProp.call(this, 'id', value)
  return this
}
