import type { Primitive } from '@vue/reactivity'
import type { Component } from '../component'
import { registerWatchedProp } from '../property-method'
import type { RefOrvalue } from '../types'

export function text(this: Component, value: RefOrvalue<Primitive>) {
  registerWatchedProp.call(this, 'textContent', value)
  return this
}
