import type { Component } from '../component'
import type { ComponentChildren, ComponentChildrenItems } from '../types'
import { isArray } from '../util'

export function nest<PropsType extends object>(this: Component<PropsType>, children: ComponentChildren<any>, ...rest: ComponentChildrenItems<any>[]) {
  const nested = isArray(children) ? children.concat(rest) : [children].concat(rest)
  this.__setComponentChildren(nested)
  return this
}
