/**
 * This file should outline the way reusable components are defined.
 */

import type { Component } from './component'
import { El, htmlVoidTags } from './factory'
import type { SetupArguments } from './methods/setup'
import type { ComponentChildrenItems } from './types'

type ReusableComponent = (children?: ComponentChildrenItems) => Component

const elementsWihoutChildren = [
  ...htmlVoidTags,
  'input',
  'textarea',
  'option',
]

export function reusable(el: keyof typeof El, setupFn: SetupArguments): ReusableComponent {
  return (children?: ComponentChildrenItems) => {
    const inst
      = elementsWihoutChildren.includes(el)
        ? El[el]()
        // @ts-expect-error We've already taken all void tag options out
        : El[el](children)

    inst.setup(setupFn)
    return inst
  }
}
