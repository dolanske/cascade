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
 * Values which are rendered as a text node.
 */
export function isTextValue(value: any): value is string | number | bigint {
  const type = typeof value
  return type === 'string' || type === 'number' || type === 'bigint'
}

/**
 * `null`, `undefined` and booleans render nothing, which makes
 * `cond && span('hi')` work as expected.
 */
export function isEmptyChild(value: any): value is null | undefined | boolean {
  return value == null || typeof value === 'boolean'
}

const instances = new WeakMap<Element, Component<any, any>>()

export function setInstance(el: Element, instance: Component<any, any>) {
  instances.set(el, instance)
}

/**
 * Returns the associated component instance, if the element has one. The
 * returned instance does not have its props typed, so the props of the expected
 * instance can be provided.
 *
 * @param el HTMLElement
 * @returns Component | null
 */
export function getInstance<PropsType extends object>(el: HTMLElement | Element): Component<PropsType, any> | null {
  return (instances.get(el) as Component<PropsType, any> | undefined) ?? null
}

/**
 * Default configuration for watchers bound to a single primitive value. A deep
 * traversal would be wasted work, the value is compared by identity anyway.
 */
export const WATCH_CONF = {
  immediate: true,
  deep: false,
} as const

/**
 * Configuration for watchers bound to a plain object or an array. Depth of `1`
 * tracks every own property (or index) without walking into nested structures,
 * which is all we need to detect a change and is dramatically cheaper than a
 * full deep traversal of a large list.
 */
export const WATCH_CONF_SHALLOW = {
  immediate: true,
  deep: 1,
} as const

export function capitalizeString(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const warned = new Set<string>()

/**
 * Logs a warning a single time, so a warning inside a list of 10 000 items
 * doesn't drown the console.
 */
export function warnOnce(key: string, ...message: any[]) {
  if (warned.has(key))
    return
  warned.add(key)
  console.warn(...message)
}
