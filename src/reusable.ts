/**
 * This file should outline the way reusable components are defined.
 */

import type { Component } from './component'
import { El, htmlVoidTags } from './factory'
import type { SetupArguments } from './methods/setup'
import type { ComponentChildrenItems } from './types'

type ReusableComponent<PropsType extends object> = (children?: ComponentChildrenItems) => Component<PropsType>

const elementsWihoutChildren = [
  ...htmlVoidTags,
  'input',
  'textarea',
  'option',
]

export function reusable<PropsType extends object>(el: keyof typeof El, setupFn: SetupArguments<PropsType>): ReusableComponent<PropsType> {
  return (children?: ComponentChildrenItems) => {
    const inst
      = elementsWihoutChildren.includes(el)
        ? El[el]<PropsType>()
        : El[el]<PropsType>(children)

    inst.setup<PropsType>(setupFn)
    return inst
  }
}
