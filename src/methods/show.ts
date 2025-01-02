import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { Component } from '../component'
import { toValue, watch } from '@vue/reactivity'
import { isNil, isWatchSource, WATCH_CONF } from '../util'

export function show(this: Component<any>, defaultValue: MaybeRefOrGetter) {
  this.onMount(() => {
    // Store the current inline style property, in case the element is using it
    const originalDisplay = this.el.style.getPropertyValue('display')

    const set = (result: any) => {
      if (result) {
        // If the element was not using any inline style dispaly property,
        // simply remove the display from style completel
        if (isNil(originalDisplay))
          this.el.style.removeProperty('display')

        else
          this.el.style.setProperty('display', originalDisplay)
      }
      else { this.el.style.setProperty('display', 'none') }
    }

    if (isWatchSource(defaultValue)) {
      const release = watch(() => toValue(defaultValue), set, WATCH_CONF)
      this.onDestroy(release)
    }
    else {
      set(defaultValue)
    }
  })

  return this
}
