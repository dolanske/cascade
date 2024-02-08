import type { Ref, UnwrapRef } from '@vue/reactivity'
import { isRef } from '@vue/reactivity'
import { Component } from '../component'
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
  let parent: HTMLElement

  const cloneChild = () => {
    const cloned = this.el.cloneNode(true) as HTMLElement
    return new Component(cloned)
  }
  const processFor = (src: Source) => {
    const childrenToRender: ComponentChildren = []
    if (isArray(src)) {
      const len = src.length
      for (let i = 0; i < len; i++) {
        const child = cloneChild()
        callback(child, { value: src[i], index: i })
        childrenToRender.push(child)
      }
    }
    else if (isObject(src)) {
      const keys = Object.keys(src)
      const len = keys.length
      for (let i = 0; i < len; i++) {
        const key = keys[i]
        const child = cloneChild()
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
        const child = cloneChild()
        callback(child, i)
        childrenToRender.push(child)
      }
    }
    parent?.replaceChildren()
    // REVIEW
    // Is HTML node enough or should parent be provided?
    if (parent)
      render(parent, childrenToRender)
  }

  this.onInit(() => {
    // Assign parent element when element is created
    parent = this.el.parentElement!
    if (isRef(source)) {
      this.__watch(source, (updatedSrc: Source) => {
        processFor(updatedSrc)
      }, { immediate: true, deep: true })
    }
    else {
      processFor(source)
    }
  })
  return this
}
