import { type Ref, isRef } from '@vue/reactivity'
import { watch } from '@vue-reactivity/watch'
import type { Component } from '../component'
import type { CSSStyle } from '../types'
import { isNil, isObject } from '../util'

type LimitedPrimitive = string | number

export function style(
  this: Component,
  key: keyof CSSStyle | CSSStyle | Ref<CSSStyle>,
  value?: LimitedPrimitive | Ref<LimitedPrimitive>,
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
  if (typeof key === 'string' && typeof value === 'string') {
    setStyleProperties({ [key]: value })
  }
  else if (isRef(key)) {
    if (value) {
      console.warn('[El.style] Refs which don\'t contain a style object are not allowed')
    }
    else {
      const release = watch(key, setStyleProperties, {
        immediate: true,
        deep: true,
      })
      this.onDestroy(release)
    }
  }
  else if (isObject(key)) {
    const keyProps = Object.keys(key)
    for (const keyProp of keyProps) {
      const value: LimitedPrimitive | Ref<LimitedPrimitive> = Reflect.get(key, keyProp)
      if (isRef(value)) {
        const release = watch(value, (value) => {
          if (isNil(value))
            return
          this.el.style.setProperty(keyProp, String(value))
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
