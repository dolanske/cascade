import type { Component } from '../component'
import type { RefOrvalue } from '../types'

export function disabled(this: Component, value?: RefOrvalue<boolean>) {
  this.attr('disabled', value)
  return this
}
