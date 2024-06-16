import type { Primitive } from '@vue/reactivity'
import type { Component } from '../component'
import { registerWatchedProp } from '../property-method'
import type { RefOrValue } from '../types'

export function text(this: Component, value: RefOrValue<Primitive>) {
  registerWatchedProp.call(this, 'textContent', value)
  return this
}
