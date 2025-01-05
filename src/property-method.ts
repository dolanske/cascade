import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Component } from './component'
import { toValue, watch } from '@vue/reactivity'
import { isWatchSource, WATCH_CONF } from './util'

/**
 * Many methods set a single property on the root element. This function should
 * simplify adding more of these properties in the future
 */
export function registerWatchedProp(this: Component<any>, key: string, value: MaybeRefOrGetter<any>) {
  const setValue = (value: any) => {
    Reflect.set(this.el, key, value)
  }

  if (isWatchSource(value)) {
    setValue(toValue(value))

    const release = watch(() => toValue(value), (computedVal) => {
      setValue(computedVal)
    }, WATCH_CONF)

    this.onDestroy(release)
  }
  else {
    setValue(value)
  }
}
