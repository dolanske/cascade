import type { Component } from '../component'
import type { RefOrValue } from '../types'

export function disabled(this: Component, value?: RefOrValue<boolean>) {
  this.attr('disabled', value)
  return this
}
