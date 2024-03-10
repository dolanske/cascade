import { watch } from '@vue-reactivity/watch'
import { isRef } from '@vue/reactivity'
import type { Primitive, Ref } from '@vue/reactivity'
import type { Component } from './component'
import { WATCH_CONF } from './util'

type DefaultWatchedValue = Primitive | Ref<Primitive>

/**
 * Many methods set a single property on the root element. This function should
 * simplify adding more of these properties in the future
 */
export function registerWatchedProp<T extends DefaultWatchedValue>(this: Component, key: string, value: T, stringifyValue?: boolean) {
  const setValue = (value: Primitive) => {
    Reflect.set(this.el, key, value)
  }

  if (isRef(value)) {
    const release = watch(value, (computedVal: Primitive) => {
      setValue(stringifyValue ? String(computedVal) : computedVal)
    }, WATCH_CONF)

    this.onDestroy(release)
  }
  else {
    setValue(stringifyValue ? String(value) : value)
  }

  return this
}
