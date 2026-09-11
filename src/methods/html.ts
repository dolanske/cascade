import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Component } from '../component'
import { bindProp } from '../property-method'

export function html(this: Component<any, any>, value: MaybeRefOrGetter<string>) {
  bindProp.call(this, 'innerHTML', value)
}
