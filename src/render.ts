import type { ComponentChildren } from './types'
import { Component, Fragment } from './component'
import { isNil, isWatchSource } from './util'

// Returns wether node was replaced or not
function replaceChildAt(parent: Element, newChild: Element | Text, index: number): boolean {
  // Using childNodes instead of children will also include textNodes, which we want
  const currentChild = Array.from(parent.childNodes).at(index)
  if (!currentChild)
    return false

  parent.replaceChild(newChild, currentChild)
  return true
}

export function render(parent: Component<any> | Element, children?: ComponentChildren<any>, index?: number) {
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
    render(root, children.componentChildren)
  }

  else if (children instanceof Element) {
    root.appendChild(children)
  }

  else if (children instanceof Component) {
    if (parent instanceof Component)
      children.parent = parent
    root.appendChild(children.el)
    children.$runOnInit()
    render(children, children.componentChildren)
    children.$runOnMount()
  }

  else if (Array.isArray(children)) {
    const len = children.length
    for (let i = 0; i < len; i++) {
      const child = children[i]

      if (child instanceof Element || typeof child === 'string' || typeof child === 'number') {
        render(root, child, i)
      }
      else if (child instanceof Fragment) {
        render(root, child.componentChildren)
      }
      else if (!isWatchSource(child)) {
        if (parent instanceof Component)
          child.parent = parent
        root.appendChild(child.el)
        child.$runOnInit()
        render(child, child.componentChildren)
        child.$runOnMount()
      }
    }
  }
  // else if (isWatchSource(children)) {
  //   console.log('registered dynamci children')
  //   watch(() => toValue(children), (newChildren, prevChildren) => {
  //     console.log(newChildren, prevChildren)

  //     // Clenup previous child elements
  //     if (prevChildren) {
  //       if (isArray(prevChildren)) {
  //         for (const child of prevChildren) {
  //           if (child instanceof Component)
  //             child.destroy()
  //           else if (child instanceof Element)
  //             child.remove()
  //         }
  //       }
  //       else if (prevChildren instanceof Component) {
  //         prevChildren.destroy()
  //       }
  //       else if (prevChildren instanceof Element) {
  //         prevChildren.remove()
  //       }
  //     }

  //     render(root, newChildren)
  //   }, {
  //     immediate: true,
  //     deep: true,
  //   })
  // }
}
