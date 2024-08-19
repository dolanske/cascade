import type { MaybeRefOrGetter, Primitive } from '@vue/reactivity'
import type { Component } from '../component'
import { registerWatchedProp } from '../property-method'

export function text(this: Component, value: MaybeRefOrGetter<Primitive>) {
  registerWatchedProp.call(this, 'textContent', value)
  return this
}
