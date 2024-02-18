import type { Ref, UnwrapRef } from '@vue/reactivity'
import { isRef } from '@vue/reactivity'
import { watch } from '@vue-reactivity/watch'
import type { Component } from '../component'
import type { ComponentChildren } from '../types'
import { isArray, isObject } from '../util'
import { render } from '../render'

export type ItemCallbackValue<S> =
  S extends any[]
  ? {
    value: S[number]
    index: number
  }
  : S extends object
  ? {
    value: keyof S
    key: string
    index: number
  }
  : number

export type Source = any[] | number | object

export function for_impl(
  this: Component,
  source: Source | Ref<Source>,
  callback: (element: Component, item: ItemCallbackValue<UnwrapRef<Source>>) => void,
) {
  this.onInit(() => {
    const parent = this.el.parentElement!
    const processFor = (src: Source) => {
      const childrenToRender = []
      if (isArray(src)) {
        const len = src.length
        for (let i = 0; i < len; i++) {
          const child = this.clone()

          callback(child, { value: src[i], index: i })
          childrenToRender.push(child)
        }
      }
      else if (isObject(src)) {
        const keys = Object.keys(src)
        const len = keys.length
        for (let i = 0; i < len; i++) {
          const key = keys[i]
          const child = this.clone()

          callback(child, {
            value: Reflect.get(src, key),
            key,
            index: i,
          })
          childrenToRender.push(child)
        }
      }
      else if (typeof src === 'number') {
        for (let i = 0; i < src; i++) {
          const child = this.clone()

          callback(child, i)
          childrenToRender.push(child)
        }
      }

      parent.replaceChildren()

      if (parent) {
        for (let i = 0; i < childrenToRender.length; i++)
          render(parent, childrenToRender[i], i)
      }
    }
    // Assign parent element when element is created
    if (isRef(source)) {
      const release = watch(source, (updatedSrc: Source) => {
        processFor(updatedSrc)
      }, { immediate: true, deep: true })
      this.onDestroy(release)
    }
    else {
      processFor(source)
    }
  })
  return this
}
