import { watch } from '@vue-reactivity/watch'
import { toValue } from '@vue/reactivity'
import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Component } from './component'
import { WATCH_CONF, isWatchSource } from './util'

/**
 * Many methods set a single property on the root element. This function should
 * simplify adding more of these properties in the future
 */
export function registerWatchedProp(this: Component, key: string, value: MaybeRefOrGetter<any>, stringifyValue?: boolean) {
  const setValue = (value: any) => {
    Reflect.set(this.el, key, value)
  }

  if (isWatchSource(value)) {
    const release = watch(() => toValue(value), (computedVal) => {
      setValue(stringifyValue ? String(computedVal) : computedVal)
    }, WATCH_CONF)

    this.onDestroy(release)
  }
  else {
    setValue(stringifyValue ? String(value) : value)
  }

  return this
}
