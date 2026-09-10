import type { ComponentChildren, ComponentChildrenItems, DynamicComponentChildren } from './types'
import { toValue, watch } from '@vue/reactivity'
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

function destroyChild(child: ComponentChildrenItems<any>) {
  if (child instanceof Component)
    child.destroy()
  else if (child instanceof Element)
    child.remove()
}

export function flushMounts(node: Node) {
  if (node instanceof Element) {
    const instance = Reflect.get(node, '__instance')
    if (instance instanceof Component && instance.$mountPending)
      instance.$runOnMount()
  }

  for (const child of Array.from(node.childNodes))
    flushMounts(child)
}

export function mount(parent: Component<any> | Element, child: ComponentChildrenItems<any>, before?: ChildNode, target?: Node) {
  const root = parent instanceof Element ? parent : parent.el
  const container = target ?? root

  if (child instanceof Fragment) {
    for (const nested of child.componentChildren as ComponentChildrenItems<any>[])
      mount(parent, nested, before, container)
  }
  else if (child instanceof Component) {
    if (parent instanceof Component)
      child.parent = parent
    if (before && before.parentNode === container)
      container.insertBefore(child.el, before)
    else
      container.appendChild(child.el)
    child.$runOnInit()
    render(child, child.componentChildren)
    if (child.el.isConnected)
      child.$runOnMount()
    else
      child.$deferOnMount()
  }
  else if (child instanceof Element) {
    if (before && before.parentNode === container)
      container.insertBefore(child, before)
    else
      container.appendChild(child)
  }
  else if (typeof child === 'string' || typeof child === 'number') {
    const text = document.createTextNode(String(child))
    if (before && before.parentNode === container)
      container.insertBefore(text, before)
    else
      container.appendChild(text)
  }
}

function renderDynamic(parent: Component<any> | Element, source: DynamicComponentChildren<any>, target?: Node) {
  const root = target ?? (parent instanceof Element ? parent : parent.el)
  const anchor = document.createComment('dynamic')
  root.appendChild(anchor)
  let previous: ComponentChildrenItems<any> | ComponentChildrenItems<any>[] | undefined

  const clear = () => {
    if (previous === undefined)
      return
    const values = Array.isArray(previous) ? previous : [previous]
    for (const child of values)
      destroyChild(child)
    previous = undefined
  }

  const update = (value: ComponentChildrenItems<any> | ComponentChildrenItems<any>[]) => {
    clear()
    previous = value
    const values = Array.isArray(value) ? value : [value]
    for (const child of values)
      mount(parent, child, anchor)
  }

  const stop = watch(() => toValue(source), update, { immediate: true })
  if (parent instanceof Component) {
    parent.onDestroy(() => {
      stop()
      clear()
      anchor.remove()
    })
  }
}

export function render(parent: Component<any> | Element, children?: ComponentChildren<any> | DynamicComponentChildren<any>, index?: number) {
  const root = parent instanceof Element ? parent : parent.el

  if (children === undefined || children === null)
    return

  if (isWatchSource(children)) {
    renderDynamic(parent, children)
    return
  }

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
    mount(parent, children)
  }

  else if (Array.isArray(children)) {
    const fragment = document.createDocumentFragment()
    for (const child of children) {
      if (child instanceof Fragment) {
        for (const nested of child.componentChildren as ComponentChildrenItems<any>[])
          mount(parent, nested, undefined, fragment)
      }
      else if (!isWatchSource(child)) {
        mount(parent, child as ComponentChildrenItems<any>, undefined, fragment)
      }
      else {
        renderDynamic(parent, child, fragment)
      }
    }
    root.appendChild(fragment)
    if (root.isConnected)
      flushMounts(root)
  }
}
