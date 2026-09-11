import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Component } from '../component'
import { toValue, watch } from '@vue/reactivity'
import { isArray, isObject, isWatchSource, WATCH_CONF } from '../util'

export type ClassObject = Record<string, MaybeRefOrGetter<boolean>>
/**
 * Everything `.class()` accepts: a class string (`'a b'`), an array of
 * strings / objects, or an object mapping class names to conditions.
 */
export type ClassValue = string | ClassObject | ClassValue[] | null | undefined | false

/**
 * Resolves a class value into the set of class names which should be
 * present. Refs and getters inside objects are read here, so they are tracked
 * when called inside a watcher.
 */
function resolve(value: ClassValue, target = new Set<string>()): Set<string> {
  if (!value)
    return target

  if (typeof value === 'string') {
    for (const name of value.split(/\s+/)) {
      if (name)
        target.add(name)
    }
  }
  else if (isArray(value)) {
    for (const item of value)
      resolve(item, target)
  }
  else if (isObject(value)) {
    for (const key of Object.keys(value)) {
      if (toValue(value[key]))
        resolve(key, target)
    }
  }

  return target
}

function apply(el: HTMLElement, prev: Set<string>, next: Set<string>) {
  for (const name of prev) {
    if (!next.has(name))
      el.classList.remove(name)
  }
  for (const name of next) {
    if (!prev.has(name))
      el.classList.add(name)
  }
}

function toggle(el: HTMLElement, names: string, value: MaybeRefOrGetter<boolean>) {
  const set = resolve(names)
  const applyToggle = (on: boolean) => {
    for (const name of set) {
      if (on)
        el.classList.add(name)
      else
        el.classList.remove(name)
    }
  }

  if (isWatchSource(value))
    watch(() => toValue(value), on => applyToggle(!!on), WATCH_CONF)
  else
    applyToggle(!!value)
}

export function class_impl(this: Component<any, any>, classNames: ClassValue | MaybeRefOrGetter<ClassValue>, value?: MaybeRefOrGetter<boolean>) {
  if (isObject(classNames) && !isArray(classNames) && !isWatchSource(classNames) && value !== undefined)
    throw new TypeError('[cascade] `.class()` can not combine object notation with a second argument.')

  this.onInit(() => {
    const el = this.el

    // class('name', condition)
    if (typeof classNames === 'string' && value !== undefined) {
      toggle(el, classNames, value)
      return
    }

    // class(ref) / class(() => ...)
    if (isWatchSource(classNames)) {
      let prev = new Set<string>()
      watch(() => resolve(toValue(classNames)), (next) => {
        apply(el, prev, next)
        prev = next
      }, WATCH_CONF)
      return
    }

    // class({ name: condition })
    if (isObject(classNames) && !isArray(classNames)) {
      for (const key of Object.keys(classNames))
        toggle(el, key, classNames[key])
      return
    }

    // class('a b') / class(['a', { b: true }])
    apply(el, new Set(), resolve(classNames))
  })
}
