import type { MaybeRefOrGetter, UnwrapRef } from '@vue/reactivity'
import type { Component } from '../component'
import type { ComponentChildrenItems } from '../types'
import { toValue, watch } from '@vue/reactivity'
import { render } from '../render'
import { isArray, isObject, isWatchSource } from '../util'

export type Source = number | any[] | object

export type CallbackType<T, _> =
  T extends number
    ? (index: number) => ComponentChildrenItems<any>
    : T extends any[]
      ? (value: T[number], index: number) => ComponentChildrenItems<any>
      : T extends object
        ? (value: T[keyof T], key: string, index: number) => ComponentChildrenItems<any>
        : unknown

export type Test = CallbackType<number, any>

// Overload for object
export function for_impl<T extends MaybeRefOrGetter<object>, PropsType extends object>(
  this: Component<PropsType>,
  source: T,
  callback: CallbackType<UnwrapRef<T>, any>,
): any
// Overload for array
export function for_impl<T extends MaybeRefOrGetter<any[]>, PropsType extends object>(
  this: Component<PropsType>,
  source: T,
  callback: CallbackType<UnwrapRef<T>, any>,
): any
export function for_impl<PropsType extends object>(
  this: Component<PropsType>,
  source: MaybeRefOrGetter<number>,
  callback: CallbackType<number, any>,
): any

export function for_impl<S extends MaybeRefOrGetter<Source>, PropsType extends object>(
  this: Component<PropsType>,
  source: MaybeRefOrGetter<S>,
  callback: CallbackType<UnwrapRef<S>, any>,
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
