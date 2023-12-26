import { watch } from '@vue-reactivity/watch'
import { computed } from '@vue/reactivity'
import type { Component } from '../component'
import { isFunction } from '../util'

export function if_impl(this: Component, expr: boolean | (() => any)) {
  // Anchors are used to correctly re-insert nodes back to the dom
  const anchor = new Comment('if')

  // Process if after its node has been appended to the DOM so that a else and
  // elseif can be looked up and processed.
  this.onMount(() => {
    const parent = this.el.parentElement!

    const run = (res: boolean) => {
      if (!res)
        this.el.remove()
      else
        parent.insertBefore(this.el, anchor)
    }

    parent.insertBefore(anchor, this.el)

    if (isFunction(expr)) {
      const cachedExpr = computed(expr)
      const release = watch(cachedExpr, run, {
        immediate: true,
      })

      this.onDestroy(release)
    }
    else {
      run(expr)
    }
  })

  return this
}
