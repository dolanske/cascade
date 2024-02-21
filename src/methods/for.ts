import type { Ref, UnwrapRef } from '@vue/reactivity'
import { isRef } from '@vue/reactivity'
import { watch } from '@vue-reactivity/watch'
import type { Component } from '../component'
import type { ComponentChildrenItems } from '../types'
import { isArray, isObject } from '../util'
import { render } from '../render'

export type Source = any[] | number | object

export type CallbackType<T> =
  T extends any[]
  ? (value: T[number], index: number) => ComponentChildrenItems
  : T extends object
  ? (value: keyof T, key: string, index: number) => ComponentChildrenItems
  : (index: number) => ComponentChildrenItems

export function for_impl(
  this: Component,
  source: Source | Ref<Source>,
  callback: CallbackType<UnwrapRef<Source>>,
) {
  this.onInit(() => {
    const processFor = (src: Source) => {
      const childrenToRender = []
      if (isArray(src)) {
        const len = src.length
        for (let i = 0; i < len; i++) {
          // @ts-expect-error idk how to type this?
          const child = callback(src[i], i)
          if (child)
            childrenToRender.push(child)
        }
      }
      else if (isObject(src)) {
        const keys = Object.keys(src)
        const len = keys.length
        for (let i = 0; i < len; i++) {
          const key = keys[i]
          // @ts-expect-error idk how to type this?
          const child = callback(Reflect.get(src, key), key, i)
          if (child)
            childrenToRender.push(child)
        }
      }
      else if (typeof src === 'number') {
        for (let i = 0; i < src; i++) {
          // @ts-expect-error idk how to type this?
          const child = callback(i)
          if (child)
            childrenToRender.push(child)
        }
      }

      this.el.replaceChildren()
      render(this.el, childrenToRender)
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
