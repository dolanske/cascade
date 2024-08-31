import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Component } from '../component'

export function disabled<PropsType extends object>(this: Component<PropsType>, value?: MaybeRefOrGetter<boolean>) {
  this.attr('disabled', value)
  return this
}
