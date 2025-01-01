import type { MaybeRefOrGetter, UnwrapRef } from '@vue/reactivity'
import { toValue, watch } from '@vue/reactivity'
import type { Component } from '../component'
import type { ComponentChildrenItems } from '../types'
import { render } from '../render'
import { isArray, isObject, isWatchSource } from '../util'

export type Source = any[] | number | object

export type CallbackType<T, PropsType extends object> =
  T extends any[]
    ? (value: T[number], index: number) => ComponentChildrenItems<PropsType>
    : T extends object
      ? (value: keyof T, key: string, index: number) => ComponentChildrenItems<PropsType>
      : (index: number) => ComponentChildrenItems<PropsType>

export function for_impl<PropsType extends object>(
  this: Component<PropsType>,
  source: MaybeRefOrGetter<Source>,
  callback: CallbackType<UnwrapRef<Source>, PropsType>,
) {
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
  this.onInit(() => {
    // Assign parent element when element is created
    if (isWatchSource(source)) {
      const release = watch(() => toValue(source), (updatedSrc: UnwrapRef<Source>) => {
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
