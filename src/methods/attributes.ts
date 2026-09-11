import type { MaybeRefOrGetter, Primitive } from '@vue/reactivity'
import type { Component } from '../component'
import { toValue, watch } from '@vue/reactivity'
import { isNil, isWatchSource, WATCH_CONF, WATCH_CONF_SHALLOW } from '../util'

export type Attributes = Record<string, Primitive>

export function setAttribute(el: HTMLElement, key: string, value?: Primitive) {
  if (isNil(value) || value === true)
    el.setAttribute(key, '')
  else if (value === false)
    el.removeAttribute(key)
  else
    el.setAttribute(key, String(value))
}

export function attrs(this: Component<any, any>, attrData: MaybeRefOrGetter<Attributes>) {
  this.onInit(() => {
    const el = this.el

    if (!isWatchSource(attrData)) {
      for (const key of Object.keys(attrData))
        setAttribute(el, key, attrData[key])
      return
    }

    let prevKeys: string[] = []
    watch(() => toValue(attrData), (value) => {
      const keys = Object.keys(value ?? {})
      for (const prev of prevKeys) {
        if (!keys.includes(prev))
          el.removeAttribute(prev)
      }
      for (const key of keys)
        setAttribute(el, key, value[key])
      prevKeys = keys
    }, WATCH_CONF_SHALLOW)
  })
}

export function attr(this: Component<any, any>, key: string, value?: MaybeRefOrGetter<Primitive>) {
  this.onInit(() => {
    if (isWatchSource(value))
      watch(() => toValue(value), updated => setAttribute(this.el, key, updated), WATCH_CONF)
    else
      setAttribute(this.el, key, value)
  })
}
