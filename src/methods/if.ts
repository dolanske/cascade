import type { MaybeRefOrGetter } from '@vue/reactivity'
import { toValue, watch } from '@vue/reactivity'
import type { Component } from '../component'
import { WATCH_CONF, isWatchSource } from '../util'

export function if_impl<PropsType extends object>(this: Component<PropsType>, expr: MaybeRefOrGetter) {
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
