import { type Primitive, type Ref, isRef } from '@vue/reactivity'
import { watch } from '@vue-reactivity/watch'
import type { Component } from '../component'
import { isFunction, isNil, isObject } from '../util'

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

export function attrs(this: Component, attrData: Attributes | (() => Attributes)) {
  this.onInit(() => {
    if (isFunction(attrData)) {
      const release = watch(attrData, value => setAttribute(this.el, value), {
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

export function attr(this: Component, key: string, value?: Primitive | (() => Primitive) | Ref<Primitive>) {
  this.onInit(() => {
    if (isFunction(value) || isRef(value)) {
      const release = watch(value, value => setAttribute(this.el, key, value), {
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
