import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Component } from '../component'

export function disabled(this: Component, value?: MaybeRefOrGetter<boolean>) {
  this.attr('disabled', value)
  return this
}
