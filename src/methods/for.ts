import type { MaybeRefOrGetter, UnwrapRef } from '@vue/reactivity'
import type { ComponentChildrenItems } from '../types'
import { toValue, watch } from '@vue/reactivity'
import { Component } from '../component'
import { flushMounts, mount, render } from '../render'
import { isArray, isObject, isWatchSource } from '../util'

export type Source = number | any[] | object
export type ForKey = string | number | symbol
export type KeyGetter<T> = (value: T, index: number) => ForKey

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
  key?: KeyGetter<UnwrapRef<T> extends object ? UnwrapRef<T>[keyof UnwrapRef<T>] : never>,
): any
// Overload for array
export function for_impl<T extends MaybeRefOrGetter<any[]>, PropsType extends object>(
  this: Component<PropsType>,
  source: T,
  callback: CallbackType<UnwrapRef<T>, any>,
  key?: KeyGetter<UnwrapRef<T> extends any[] ? UnwrapRef<T>[number] : never>,
): any
export function for_impl<PropsType extends object>(
  this: Component<PropsType>,
  source: MaybeRefOrGetter<number>,
  callback: CallbackType<number, any>,
  key?: KeyGetter<number>,
): any

export function for_impl<S extends MaybeRefOrGetter<Source>, PropsType extends object>(
  this: Component<PropsType>,
  source: MaybeRefOrGetter<S>,
  callback: CallbackType<UnwrapRef<S>, any>,
  key?: KeyGetter<any>,
) {
  interface Entry {
    key: ForKey
    value: unknown
    child: ComponentChildrenItems<any>
  }
  let entries: Entry[] = []

  const processFor = (src: Source) => {
    const next: { key: ForKey, value: unknown, child?: ComponentChildrenItems<any> }[] = []
    const oldByKey = new Map<ForKey, Entry>()
    if (key) {
      for (const entry of entries)
        oldByKey.set(entry.key, entry)
    }

    const add = (value: unknown, index: number, child: ComponentChildrenItems<any>) => {
      const entryKey = key ? key(value as never, index) : index
      const old = key ? oldByKey.get(entryKey) : undefined
      next.push({ key: entryKey, value, child: old && old.value === value ? old.child : child })
    }

    if (isArray(src)) {
      const len = src.length
      for (let i = 0; i < len; i++) {
        // @ts-expect-error idk how to type this?
        const child = callback(src[i], i)
        if (child)
          add(src[i], i, child)
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
          add(Reflect.get(src, key), i, child)
      }
    }
    else if (typeof src === 'number') {
      for (let i = 0; i < src; i++) {
        // @ts-expect-error idk how to type this?
        const child = callback(i)
        if (child)
          add(i, i, child)
      }
    }

    const nextEntries = next as Entry[]
    const retained = new Set(nextEntries.map(entry => entry.child))
    for (const entry of entries) {
      if (!retained.has(entry.child)) {
        if (entry.child instanceof Component)
          entry.child.destroy()
        else if (entry.child instanceof Element)
          entry.child.remove()
      }
    }

    if (!key) {
      const fragment = document.createDocumentFragment()
      for (const entry of nextEntries)
        mount(this, entry.child, undefined, fragment)
      this.el.replaceChildren()
      this.el.appendChild(fragment)
      if (this.el.isConnected)
        flushMounts(this.el)
    }
    else {
      const fragment = document.createDocumentFragment()
      for (const entry of nextEntries) {
        if (entry.child instanceof Component) {
          entry.child.parent = this
          fragment.appendChild(entry.child.el)
        }
        else if (entry.child instanceof Element) {
          fragment.appendChild(entry.child)
        }
        else {
          fragment.appendChild(document.createTextNode(String(entry.child)))
        }
      }
      this.el.replaceChildren(fragment)
      if (this.el.isConnected)
        flushMounts(this.el)
      for (const entry of nextEntries) {
        if (!entries.some(old => old.child === entry.child))
          render(this, entry.child)
      }
    }
    entries = nextEntries
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
