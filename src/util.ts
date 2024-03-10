import type { Component } from './component'

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

/**
 * Returns the associated component instnace, if the element has one
 *
 * @param el HTMLElement
 * @returns Component | null
 */
export function getInstance(el: HTMLElement | Element) {
  if (!Object.hasOwn(el, '__instance'))
    return null

  return Reflect.get(el, '__instance') as Component
}

export const WATCH_CONF = {
  immediate: true,
  deep: true,
}
