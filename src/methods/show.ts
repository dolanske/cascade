import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Component } from '../component'
import { toValue, watch } from '@vue/reactivity'
import { isWatchSource, WATCH_CONF } from '../util'

export function show(this: Component<any, any>, value: MaybeRefOrGetter<any>) {
  this.onInit(() => {
    // Preserve an inline display value the element may already be using
    const originalDisplay = this.el.style.getPropertyValue('display')
    let hidden = false

    const set = (visible: boolean) => {
      if (visible === !hidden)
        return
      hidden = !visible

      if (visible) {
        if (originalDisplay)
          this.el.style.setProperty('display', originalDisplay)
        else
          this.el.style.removeProperty('display')
      }
      else {
        this.el.style.setProperty('display', 'none')
      }

      for (const cb of this.$onVisibilityCbs)
        cb(visible)
    }

    if (isWatchSource(value))
      watch(() => toValue(value), result => set(!!result), WATCH_CONF)
    else
      set(!!value)
  })
}
