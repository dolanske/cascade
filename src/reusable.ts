/**
 * This file should outline the way reusable components are defined.
 */

import type { Component } from './component'
import type { ComponentChildren, ComponentChildrenItems, SetupArguments } from './types'
import { El, htmlVoidTags } from './factory'
import { isArray } from './util'

export type ReusableComponent<PropsType extends object> = (children?: ComponentChildren<PropsType>, ...rest: ComponentChildrenItems<PropsType>[]) => Component<PropsType>

const elementsWihoutChildren = [
  ...htmlVoidTags,
  'input',
  'textarea',
  'option',
]

export function reusable<PropsType extends object>(el: keyof typeof El, setupFn: SetupArguments<PropsType>): ReusableComponent<PropsType> {
  return (children: ComponentChildren<PropsType> = [], ...rest: ComponentChildrenItems<PropsType>[]) => {
    const nested = isArray(children) ? children.concat(rest) : [children].concat(rest)
    const inst
      = elementsWihoutChildren.includes(el)
        ? El[el]<PropsType>()
        // @ts-expect-error I assume this could be better type narrowed so that
        // this error doesn't occur, but it is not a priority right now. This
        // should never cause any issues
        : El[el]<PropsType>(nested)

    inst.setup(setupFn)
    return inst
  }
}
