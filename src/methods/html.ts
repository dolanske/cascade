import type { Component } from '../component'
import { registerWatchedProp } from '../property-method'
import type { RefOrvalue } from '../types'

export function html(this: Component, value: RefOrvalue<string>) {
  registerWatchedProp.call(this, 'innerHTML', value)
  return this
}
