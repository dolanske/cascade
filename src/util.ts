import type { Ref } from '@vue/reactivity'
import type { Component } from './component'
import { isRef } from '@vue/reactivity'

export function isObject(value: any): value is object {
  const type = typeof value
  return value != null && (type === 'object')
}

export function isNil(value: any): value is null | undefined {
  return value === null || value === undefined
}

export function isArray(value: any): value is Array<any> {
  return Array.isArray(value)
}

// eslint-disable-next-line ts/no-unsafe-function-type
export function isFn(value: any): value is Function {
  return typeof value === 'function'
}

// eslint-disable-next-line ts/no-unsafe-function-type
export function isWatchSource(value: any): value is Ref<any> | Function {
  return isRef(value) || isFn(value)
}

/**
 * Returns the associated component instnace, if the element has one. The
 * returned instance does not have its props typed, so the pros of the expected
 * instance can be provided.
 *
 * @param el HTMLElement
 * @returns Component | null
 */
export function getInstance<PropsType extends object>(el: HTMLElement | Element): Component<PropsType> | null {
  if (!Object.hasOwn(el, '__instance'))
    return null
  return Reflect.get(el, '__instance')
}

export const WATCH_CONF = {
  immediate: true,
  deep: true,
}

export function capitalizeString(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

// export function getElIndex(el: HTMLElement) {
//   if (!el.parentElement)
//     return -1
//   return [...el.parentElement.childNodes].indexOf(el)
// }
