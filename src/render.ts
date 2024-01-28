import { watch } from '@vue-reactivity/watch'
import { Component, Fragment } from './component'
import type { ComponentChildren } from './types'
import { isFunction, isNil } from './util'

// Returns wether node was replaced or not
function replaceChildAt(parent: Element, newChild: Element | Text, index: number): boolean {
  // Using childNodes instead of children will also include textNodes, which we want
  const currentChild = Array.from(parent.childNodes).at(index)
  if (!currentChild)
    return false

  parent.replaceChild(newChild, currentChild)
  return true
}

export function render(parent: Component | Element, children?: ComponentChildren, index?: number) {
  const root = parent instanceof Element ? parent : parent.el

  if (!children)
    return

  if (typeof children === 'string' || typeof children === 'number') {
    // if index is not provided, simply set text content, otherwise replace text
    // node at index of the children list
    if (isNil(index)) {
      root.innerHTML = String(children)
    }
    else {
      const textNode = document.createTextNode(String(children))
      // on first iteration, the child will not exist, so we need to create it
      if (!replaceChildAt(root, textNode, index))
        root.appendChild(textNode)
    }
  }

  else if (children instanceof Fragment) {
    render(root, children.children)
  }

  else if (children instanceof Element) {
    root.appendChild(children)
  }

  else if (children instanceof Component) {
    if (parent instanceof Component)
      children.parent = parent
    root.appendChild(children.el)
    children.__runOnInit()
    render(children, children.children)
    children.__runOnMount()
  }

  else if (Array.isArray(children)) {
    const len = children.length
    for (let i = 0; i < len; i++) {
      const child = children[i]

      if (child instanceof Element || typeof child === 'string' || typeof child === 'number') {
        render(root, child, i)
      }
      else if (child instanceof Fragment) {
        render(root, child.children)
      }
      else if (isFunction(child)) {
        watch(child, value => render(root, value, i), {
          immediate: true,
          deep: true,
        })
      }
      else {
        if (parent instanceof Component)
          child.parent = parent
        root.appendChild(child.el)
        child.__runOnInit()
        render(child, child.children)
        child.__runOnMount()
      }
    }
  }

  else if (isFunction(children)) {
    watch(children, value => render(root, value), {
      immediate: true,
      deep: true,
    })
  }
}
