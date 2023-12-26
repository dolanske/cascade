import { render } from '../component'
import type { ComponentChildren } from '../types'

export class Fragment {
  children: ComponentChildren
  // __isFragment: boolean

  constructor(children: ComponentChildren) {
    this.children = children
    // this.__isFragment = true
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
