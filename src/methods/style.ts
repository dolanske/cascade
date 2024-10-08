import type { MaybeRefOrGetter, Ref } from '@vue/reactivity'
import type { Component } from '../component'
import type { CSSStyle } from '../types'
import { toValue, watch } from '@vue/reactivity'
import { isNil, isObject, isWatchSource, WATCH_CONF } from '../util'

type LimitedPrimitive = string | number

export function style(
  this: Component<any>,
  key: keyof CSSStyle | CSSStyle | MaybeRefOrGetter<CSSStyle>,
  value?: MaybeRefOrGetter<LimitedPrimitive>,
) {
  const setStyleProperties = (props: CSSStyle) => {
    if (!isObject(props)) {
      console.warn('[El.style] Refs which don\'t contain a style object are not allowed')
      return
    }
    const keys = Object.keys(props)
    for (const key of keys)
      this.el.style.setProperty(key, Reflect.get(props, key))
  }
  if (typeof key === 'string') {
    if (isWatchSource(value)) {
      const release = watch(() => toValue(value), (updatedValue) => {
        setStyleProperties({ [key]: updatedValue })
      })
      this.onDestroy(release)
    }
    else if (value) {
      setStyleProperties({ [key]: value })
    }
  }
  else if (isWatchSource(key)) {
    if (value) {
      console.warn('[El.style] Refs which don\'t contain a style object are not allowed')
    }
    else {
      const release = watch(() => toValue(key), setStyleProperties, WATCH_CONF)
      this.onDestroy(release)
    }
  }
  else if (isObject(key)) {
    const keyProps = Object.keys(key)
    for (const keyProp of keyProps) {
      const value: LimitedPrimitive | Ref<LimitedPrimitive> = Reflect.get(key, keyProp)
      if (isWatchSource(value)) {
        const release = watch(() => toValue(value), (updatedValue) => {
          if (isNil(updatedValue))
            return
          this.el.style.setProperty(keyProp, String(updatedValue))
        })
        this.onDestroy(release)
      }
      else if (!isNil(value)) {
        this.el.style.setProperty(keyProp, String(value))
      }
    }
  }
  return this
}
