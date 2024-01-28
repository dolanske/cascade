import { watch } from '@vue-reactivity/watch'
import { computed } from '@vue/reactivity'
import type { Component } from '../component'
import { getInstance, isFunction } from '../util'

export type ConditionalExpr = boolean | (() => boolean)

export function if_impl(this: Component, expr: ConditionalExpr) {
  // Anchors are used to correctly re-insert nodes back to the dom
  const anchor = new Comment('if')

  this.onInit(() => {
    const parent = this.parent

    if (!parent)
      return console.warn('Parent element not found. `if()` will not work.')

    const process = (res: boolean) => {
      if (!res)
        this.el.remove()
      else
        parent.el.insertBefore(this.el, anchor)
    }

    parent.el.insertBefore(anchor, this.el)

    if (isFunction(expr)) {
      const cachedExpr = computed(expr)
      const release = watch(cachedExpr, process, {
        immediate: true,
        deep: true,
      })

      this.onDestroy(release)
    }
    else {
      process(expr)
    }
  })

  // this.parent.onMount(() => {
  //   const parent = this.el.parentElement!
  //   const elseElements = []

  //   requestAnimationFrame(() => {
  //     let sibling = this.el.nextElementSibling
  //     while (sibling) {
  //       const inst = getInstance(sibling)

  //       if (inst && (inst.__isElse || inst.__isElseIf))
  //         elseElements.push(inst)

  //       sibling = sibling.nextElementSibling
  //     }

  //     console.log(elseElements)
  //   })

  return this
}

// export function else_impl(this: Component) {
//   this.__isElse = true
//   return this
// }

// export function elseif_impl(this: Component, expr: ConditionalExpr) {
//   this.__isElseIf = expr
//   return this
// }
