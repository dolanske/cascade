import { isRef } from '@vue/reactivity'
import type { Component } from '../component'
import type { RefOrvalue } from '../types'
import { isFunction, isNil } from '../util'

export function show(this: Component, defaultValue: RefOrvalue<boolean>) {
  this.onMount(() => {
    // Store the current inline style property, in case the element is using it
    const originalDisplay = this.el.style.getPropertyValue('display')

    const set = (result: boolean) => {
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

    if (isFunction(defaultValue) || isRef(defaultValue)) {
      this.__watch(defaultValue, set, {
        deep: true,
        immediate: true,
      })
    }
    else {
      set(defaultValue)
    }
  })

  return this
}
