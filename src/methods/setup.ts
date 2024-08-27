import { effectScope } from '@vue/reactivity'
import type { Component } from '../component'

export type SetupArguments<PropsType extends object> = (componentInstance: Component<PropsType>, props: PropsType) => void

export function setup<PropsType extends object>(this: Component<PropsType>, setupFn: SetupArguments<PropsType>) {
  this.__scopes.add(setupFn)

  this.onInit(() => {
    const scope = effectScope()
    scope.run(() => {
      setupFn(this, this.__componentProps)
    })

    this.onDestroy(() => {
      scope.stop()
    })
  })

  return this
}

// Assign a key value pair into the
// export function prop(this: Component, key: string, value: any) {
//   Object.assign(this.__componentProps, { [key]: value })
//   return this
// }

// export function props(this: Component, props: Record<string, any>) {
//   for (const key of Object.keys(props))
//     this.prop(key, props[key])
//   return this
// }
