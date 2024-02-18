import { Component } from '../component'
import type { ComponentChildren } from '../types'
import { isArray } from '../util'

export function nest(this: Component, children: ComponentChildren) {
  // TODO
  // Clone each Component within child array or in case children is the component itself
  // Clone

  if (children instanceof Component) {
    children = children.clone()
  }
  else if (isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      if (children[i] instanceof Component)
        children[i] = children[i].clone()
    }
  }

  this.__children(children)
  return this
}
