import { Component } from '../component'
import { render } from '../render'
import type { ComponentChildren } from '../types'

export class Fragment {
  children: ComponentChildren

  constructor(children: ComponentChildren = []) {
    // super()
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
