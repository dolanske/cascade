import { render } from '../component'
import { if_impl } from '../methods/if'
import { nest } from '../methods/nest'
import { setup } from '../methods/setup'
import type { ComponentChildren } from '../types'

export class Fragment {
  children: ComponentChildren

  // TODO: Figure out
  // @ts-expect-error We are giving it an incomplete Component implementation
  nest = nest.bind(this)
  // @ts-expect-error We are giving it an incomplete Component implementation
  if = if_impl.bind(this)
  // @ts-expect-error We are giving it an incomplete Component implementation
  setup = setup.bind(this)

  constructor(children: ComponentChildren = []) {
    this.children = children
  }

  mount(selector: string) {
    const domRoot = document.querySelector(selector)
    if (!domRoot)
      throw new Error('Root element does not exist')

    render(domRoot, this.children)
  }
}

export function fragment(children: ComponentChildren) {
  return new Fragment(children)
}
