import { toValue } from '@vue/reactivity'
import type { MaybeRefOrGetter, Primitive } from '@vue/reactivity'

import { watch } from '@vue-reactivity/watch'
import type { Component } from '../component'
import { isNil, isObject, isWatchSource } from '../util'

type Attributes = Record<string, Primitive>

export function setAttribute(el: HTMLElement, key: string | Attributes, value?: Primitive) {
  if (isObject(key)) {
    Object.entries(key).forEach(([k, v]) => {
      setAttribute(el, k, v)
    })
    return
  }

  if (isNil(value)) {
    el.setAttribute(key, '')
  }
  else if (typeof value === 'boolean') {
    if (value)
      el.setAttribute(key, '')
    else
      el.removeAttribute(key)
  }
  else {
    el.setAttribute(key, String(value))
  }
}

export function attrs<PropsType extends object>(this: Component<PropsType>, attrData: MaybeRefOrGetter<Attributes>) {
  this.onInit(() => {
    if (isWatchSource(attrData)) {
      const release = watch(() => toValue(attrData), value => setAttribute(this.el, value), {
        immediate: true,
        deep: true,
      })

      this.onDestroy(release)
    }
    else {
      setAttribute(this.el, attrData)
    }
  })

  return this
}

export function attr<PropsType extends object>(this: Component<PropsType>, key: string, value?: MaybeRefOrGetter<Primitive>) {
  this.onInit(() => {
    if (isWatchSource(value)) {
      const release = watch(() => toValue(value), value => setAttribute(this.el, key, value), {
        immediate: true,
        deep: true,
      })

      this.onDestroy(release)
    }
    else {
      setAttribute(this.el, key, value)
    }
  })

  return this
}
