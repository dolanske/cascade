import type { EffectScope, MaybeRefOrGetter } from '@vue/reactivity'
import type { Component } from '../component'
import { effectScope, toValue, watch } from '@vue/reactivity'
import { isWatchSource, warnOnce, WATCH_CONF } from '../util'

export function if_impl(this: Component<any, any>, expr: MaybeRefOrGetter<any>) {
  if (this.$anchor)
    warnOnce(`if-twice-${this.identifier}`, '[cascade] `.if()` was called more than once on a component, only the last condition applies.', this.el)

  // The anchor keeps the position of the component while it is removed
  this.$anchor ??= document.createComment('if')

  // The condition watcher must keep running while the component is hidden
  // and its own scope is paused, so it lives in a scope of its own.
  let scope: EffectScope | null = null

  this.onInit(() => {
    if (!isWatchSource(expr)) {
      this.$setVisible(!!expr)
      return
    }

    scope = effectScope(true)
    scope.run(() => {
      watch(() => toValue(expr), value => this.$setVisible(!!value), WATCH_CONF)
    })
  })

  this.onDestroy(() => {
    scope?.stop()
    scope = null
  })
}
