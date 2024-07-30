import { watch } from '@vue-reactivity/watch'
import type { MaybeRefOrGetter, Ref } from '@vue/reactivity'
import { isRef, toValue } from '@vue/reactivity'
import type { Component } from '../component'
import { isWatchSource, WATCH_CONF } from '../util'

export function if_impl(this: Component, expr: MaybeRefOrGetter) {
  // Anchors are used to correctly re-insert nodes back to the dom
  const anchor = new Comment('if')

  this.onInit(() => {
    const parent = this.parent
    if (!parent)
      return console.warn('Parent element not found. `if()` will not work.')

    const process = (res: any) => {
      if (res)
        parent.el.insertBefore(this.el, anchor)
      else
        this.el.remove()
    }

    parent.el.insertBefore(anchor, this.el)

    if (isWatchSource(expr)) {
      const release = watch(() => toValue(expr), process, WATCH_CONF)
      this.onDestroy(release)
    }
    else {
      process(expr)
    }
  })

  return this
}
