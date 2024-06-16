import { isRef } from '@vue/reactivity'
import { watch } from '@vue-reactivity/watch'
import type { Component } from '../component'
import type { RefOrValue } from '../types'

// Portal keeps component functionality in its local context, but renders
// element anywhere in the DOM
export function portal(
  this: Component,
  target: RefOrValue<string>,
) {
  this.onInit(() => {
    if (isRef(target)) {
      const release = watch(target, (result: string) => {
        this.__portal = result
      })

      this.onDestroy(release)
    }
    else {
      this.__portal = target
    }
  })
}
