import type { Component } from '../component'
import type { ComponentChildren, ComponentChildrenItems } from '../types'
import { isArray } from '../util'

export function nest(this: Component, children: ComponentChildren, ...rest: ComponentChildrenItems[]) {
  const nested = isArray(children) ? children.concat(rest) : [children].concat(rest)
  this.__children(nested)
  return this
}
