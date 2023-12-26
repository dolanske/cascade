import { watch } from '@vue-reactivity/watch'
import { queueJob } from '../queue'
import type { Component } from '../component'
import { isFunction } from '../util'

export function text(this: Component, value: string | (() => any)) {
  if (isFunction(value)) {
    const release = watch(value, (computedVal: string) => {
      this.el.textContent = computedVal
    }, {
      immediate: true,
    })

    this.onDestroy(release)
  }
  else {
    queueJob(() => {
      this.el.textContent = value
    })
  }

  return this
}
