import type { Component } from '../component'
import type { ComponentChildren } from '../types'

export function nest(this: Component, children: ComponentChildren) {
  this.__children(children)
  return this
}
