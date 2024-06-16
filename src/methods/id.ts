import type { Primitive } from '@vue/reactivity'
import type { Component } from '../component'
import type { RefOrValue } from '../types'
import { registerWatchedProp } from '../property-method'

export function id(this: Component, value: RefOrValue<Primitive>) {
  registerWatchedProp.call(this, 'id', value)
  return this
}
