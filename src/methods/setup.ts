import { effectScope } from '@vue/reactivity'
import type { Component } from '../component'
import type { PropObject } from '../types'

// interface SetupArgs {
//   element: HTMLElement
//   props: PropObject
// }

// TODO
// Return child nodes?

type SetupArguments = (componentInstance: Component, props: PropObject) => void

export function setup(this: Component, setupFn: SetupArguments) {
  this.onInit(() => {
    const scope = effectScope()
    scope.run(() => {
      setupFn(this, this.componentProps)
      // setupFn(this, {
      //   props: this.componentProps,
      //   element: this.el,
      // })
    })

    this.onDestroy(() => {
      scope.stop()
    })
  })

  return this
}

// Assign a key value pair into the
export function prop(this: Component, key: string, value: unknown) {
  Object.assign(this.componentProps, { [key]: value })
  return this
}

export function props(this: Component, props: PropObject) {
  for (const key of Object.keys(props))
    this.prop(key, props[key])
  return this
}
