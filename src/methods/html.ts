import type { Component } from '../component'
import { registerWatchedProp } from '../property-method'
import type { RefOrValue } from '../types'

export function html(this: Component, value: RefOrValue<string>) {
  registerWatchedProp.call(this, 'innerHTML', value)
  return this
}
