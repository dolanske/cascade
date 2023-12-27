import { effectScope } from '@vue/reactivity'
import type { Component } from '../component'
import type { PropObject } from '../types'

interface SetupArgs {
  self: Component
  props: PropObject
}

type SetupArguments = (setupArgs: SetupArgs) => void

export function setup(this: Component, setupFn: SetupArguments) {
  const scope = effectScope()

  this.onMount(() => {
    scope.run(() => {
      setupFn({
        self: this,
        props: this.componentProps,
      })
    })
  })

  this.onDestroy(() => {
    scope.stop()
  })

  return this
}

////

export function prop(this: Component, key: string, value: unknown) {
  Object.assign(this.componentProps, { [key]: value })
  return this
}

export function props(this: Component, props: PropObject) {
  for (const key of Object.keys(props))
    this.prop(key, props[key])
  return this
}
