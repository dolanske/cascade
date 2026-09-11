import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Component } from './component'
import { toValue, watch } from '@vue/reactivity'
import { isWatchSource, WATCH_CONF } from './util'

/**
 * Many methods set a single property on the root element. The binding is
 * created on init so that it lives inside the component's effect scope and is
 * re-created when a destroyed component is rendered again.
 */
export function bindProp(this: Component<any, any>, key: string, value: MaybeRefOrGetter<any>) {
  this.onInit(() => {
    if (isWatchSource(value)) {
      watch(() => toValue(value), (computedVal) => {
        Reflect.set(this.el, key, computedVal ?? '')
      }, WATCH_CONF)
    }
    else {
      Reflect.set(this.el, key, value ?? '')
    }
  })
}
