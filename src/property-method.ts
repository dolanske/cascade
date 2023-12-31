import { watch } from '@vue-reactivity/watch'
import { isRef } from '@vue/reactivity'
import type { Primitive, Ref } from '@vue/reactivity'
import { isFunction } from './util'
import type { Component } from './component'

type DefaultWatchedValue = Primitive | (() => Primitive) | Ref<Primitive>

/**
 * Many methods set a single property on the root element. This function should
 * simplify adding more of these properties in the future
 */
export function registerWatchedProp<T extends DefaultWatchedValue>(this: Component, key: string, value: T, stringifyValue?: boolean) {
  const setValue = (value: Primitive) => {
    Reflect.set(this.el, key, value)
  }

  if (isFunction(value) || isRef(value)) {
    const release = watch(value, (computedVal: Primitive) => {
      setValue(stringifyValue ? String(computedVal) : computedVal)
    }, {
      immediate: true,
      deep: true,
    })

    this.onDestroy(release)
  }
  else {
    setValue(stringifyValue ? String(value) : value)
  }

  return this
}
