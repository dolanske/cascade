import { toValue, type MaybeRefOrGetter } from '@vue/reactivity'
import { Component, Fragment } from './component'
import type { ComponentChildren } from './types'
import { isNil, isWatchSource, WATCH_CONF } from './util'
import { watch } from '@vue-reactivity/watch'

// Returns wether node was replaced or not
function replaceChildAt(parent: Element, newChild: Element | Text, index: number): boolean {
  // Using childNodes instead of children will also include textNodes, which we want
  const currentChild = Array.from(parent.childNodes).at(index)
  if (!currentChild)
    return false

  parent.replaceChild(newChild, currentChild)
  return true
}

function renderAndMountComponent(root: Element, parent: Component<any> | Element, children: Component<any>) {
  if (parent instanceof Component)
    children.parent = parent
  root.appendChild(children.el)
  children.__runOnInit()
  render(children, children.componentChildren)
  children.__runOnMount()
}

function renderDynamicChildren(root: Element, parent: Component<any> | Element, watchedChildren: MaybeRefOrGetter<>) {
  const stopper = watch(() => toValue(watchedChildren), (children) => {
    // Whenever new set of children appear, they should patch the current DOM
  }, WATCH_CONF)

  if (parent instanceof Component) {
    parent.onDestroy(stopper)
  }
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
    renderAndMountComponent(root, parent, children)
    // if (parent instanceof Component)
    //   children.parent = parent
    // root.appendChild(children.el)
    // children.__runOnInit()
    // render(children, children.componentChildren)
    // children.__runOnMount()
  }

  else if (Array.isArray(children)) {
    const len = children.length
    for (let i = 0; i < len; i++) {
      const child = children[i]

      if (child instanceof Element || typeof child === 'string' || typeof child === 'number')
        render(root, child, i)

      else if (child instanceof Fragment)
        render(root, child.componentChildren)

      else if (isWatchSource(child))
        renderDynamicChildren(root, parent, child)
        // watch(() => toValue(child), (value) => {
        //   // TODO: cleanup previous component before rendering new
        //   // if (value instanceof Component)
        //   //   value.destroy()
        //   // else root.innerHTML = ''

      //   render(root, value, i)
      // }, {
      //   immediate: true,
      //   deep: true,
      // })

      else
        renderAndMountComponent(root, parent, child)
        // if (parent instanceof Component)
        //   child.parent = parent
        // root.appendChild(child.el)
        // child.__runOnInit()
        // render(child, child.componentChildren)
        // child.__runOnMount()
    }
  }

  else if (isWatchSource(children)) {
    renderDynamicChildren(root, parent, children)
    // watch(() => toValue(children), (value) => {
    //   // TODO: cleanup previous component before rendering new \
    //   if (value instanceof Component)
    //     value.destroy()
    //   else root.innerHTML = ''

    //   render(root, value)
    // }, {
    //   immediate: true,
    //   deep: true,
    // })
  }
}
