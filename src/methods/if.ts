import { watch } from '@vue-reactivity/watch'
import type { Ref } from '@vue/reactivity'
import { isRef } from '@vue/reactivity'
import type { Component } from '../component'
import { WATCH_CONF, isNil } from '../util'

export type ConditionalExpr = boolean | Ref<boolean | undefined> | undefined

export function if_impl(this: Component, expr: ConditionalExpr) {
  // Anchors are used to correctly re-insert nodes back to the dom
  const anchor = new Comment('if')

  this.onInit(() => {
    const parent = this.parent

    if (!parent)
      return console.warn('Parent element not found. `if()` will not work.')

    const process = (res: boolean | undefined) => {
      if (res === false || isNil(res))
        this.el.remove()
      else
        parent.el.insertBefore(this.el, anchor)
    }

    parent.el.insertBefore(anchor, this.el)

    if (isRef(expr)) {
      const release = watch(expr, process, WATCH_CONF)

      this.onDestroy(release)
    }
    else {
      process(expr)
    }
  })

  return this
}
