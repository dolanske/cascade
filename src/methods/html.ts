import { MaybeRefOrGetter } from '@vue/reactivity'
import type { Component } from '../component'
import { registerWatchedProp } from '../property-method'

export function html(this: Component, value: MaybeRefOrGetter<string>) {
  registerWatchedProp.call(this, 'innerHTML', value)
  return this
}
