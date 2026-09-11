import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Component } from '../component'
import type { CSSStyle } from '../types'
import { toValue, watch } from '@vue/reactivity'
import { isNil, isObject, isWatchSource, warnOnce, WATCH_CONF } from '../util'

export type StyleValue = string | number | null | undefined

/**
 * `style.setProperty()` only understands hyphenated names, `csstype` allows
 * both notations.
 */
function hyphenate(key: string) {
  return key.startsWith('--') ? key : key.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`)
}

function setStyle(el: HTMLElement, key: string, value: StyleValue) {
  if (isNil(value) || value === '')
    el.style.removeProperty(hyphenate(key))
  else
    el.style.setProperty(hyphenate(key), String(value))
}

export function style(this: Component<any, any>, key: keyof CSSStyle | MaybeRefOrGetter<CSSStyle>, value?: MaybeRefOrGetter<StyleValue>) {
  this.onInit(() => {
    const el = this.el

    // style('color', value)
    if (typeof key === 'string') {
      if (isWatchSource(value))
        watch(() => toValue(value), updated => setStyle(el, key, updated), WATCH_CONF)
      else
        setStyle(el, key, value)
      return
    }

    // style(ref) / style(() => ({ ... }))
    if (isWatchSource(key)) {
      if (value !== undefined)
        warnOnce('style-ref-value', '[cascade] `.style()` ignores the second argument when the first one is a ref or getter.')

      let prevKeys: string[] = []
      watch(() => toValue(key), (props) => {
        if (!isObject(props)) {
          warnOnce('style-not-object', '[cascade] `.style()` refs must resolve to a style object.', props)
          return
        }
        const keys = Object.keys(props)
        for (const prev of prevKeys) {
          if (!(prev in props))
            el.style.removeProperty(hyphenate(prev))
        }
        for (const prop of keys)
          setStyle(el, prop, Reflect.get(props, prop))
        prevKeys = keys
      }, WATCH_CONF)
      return
    }

    // style({ color: 'red', width: ref })
    if (isObject(key)) {
      for (const prop of Object.keys(key)) {
        const propValue: MaybeRefOrGetter<StyleValue> = Reflect.get(key, prop)
        if (isWatchSource(propValue))
          watch(() => toValue(propValue), updated => setStyle(el, prop, updated), WATCH_CONF)
        else
          setStyle(el, prop, propValue)
      }
    }
  })
}
