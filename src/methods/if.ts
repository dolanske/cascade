import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Component } from '../component'
import { toValue, watch } from '@vue/reactivity'
import { isWatchSource } from '../util'

export function if_impl<PropsType extends object>(this: Component<PropsType>, expr: MaybeRefOrGetter) {
  // Anchors are used to correctly re-insert nodes back to the dom
  const anchor = new Comment('if')

  this.onInit(() => {
    const parent = this.parent
    if (!parent)
      return console.warn('Parent element not found. `if()` will not work.')

    const process = (res: any) => {
      const host = anchor.parentNode
      if (!host)
        return

      if (res) {
        if (this.el.parentNode !== host)
          host.insertBefore(this.el, anchor)
      }
      else if (this.el.parentNode === host) {
        this.el.remove()
      }
    }

    const host = this.el.parentNode
    if (!host)
      return console.warn('Component element not found. `if()` will not work.')
    host.insertBefore(anchor, this.el)

    if (isWatchSource(expr)) {
      const release = watch(() => toValue(expr), process, { immediate: true })
      this.onDestroy(release)
    }
    else {
      process(expr)
    }
  })

  return this
}
