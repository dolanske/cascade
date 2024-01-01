import type { Primitive } from '@vue/reactivity'
import type { Component } from '../component'
import type { RefOrvalue } from '../types'
import { registerWatchedProp } from '../property-method'

export function id(this: Component, value: RefOrvalue<Primitive>) {
  registerWatchedProp.call(this, 'id', value)
}
