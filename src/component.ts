import type { WatchStopHandle } from '@vue-reactivity/watch'
import { watch } from '@vue-reactivity/watch'
import { Fragment } from './components/fragment'
import type { ComponentChildren, GenericCallback, PropObject } from './types'
import { text } from './methods/text'
import { click, on } from './methods/on'
import { if_impl } from './methods/if'
import { class_impl } from './methods/class'
import { isFunction, isNil } from './util'
import { html } from './methods/html'
import { prop, props, setup } from './methods/setup'

export class Component {
  el: HTMLElement
  children: ComponentChildren
  componentProps: PropObject

  text = text.bind(this)
  html = html.bind(this)
  on = on.bind(this)
  click = click.bind(this)
  if = if_impl.bind(this)
  class = class_impl.bind(this)
  setup = setup.bind(this)
  prop = prop.bind(this)
  props = props.bind(this)

  // Lifecycle
  onMountCbs: GenericCallback[]
  onDestroyCbs: GenericCallback[]

  constructor(el: HTMLElement, props: PropObject = {}) {
    this.el = el
    this.children = []
    this.onMountCbs = []
    this.onDestroyCbs = []

    this.componentProps = props
  }

  /////////////////////////////////////////////////////////////
  // Private API
  __children(value: ComponentChildren) {
    this.children = value
  }

  /////////////////////////////////////////////////////////////
  // Public API

  onDestroy(cb: GenericCallback) {
    this.onDestroyCbs.push(cb)
  }

  onMount(cb: GenericCallback) {
    this.onMountCbs.push(cb)
  }

  __runOnMount() {
    for (const cb of this.onMountCbs)
      cb()
  }

  // style(key: keyof CSSStyle | CSSStyle, value?: string | number | boolean) {
  //   if (typeof key === 'string' && value) {
  //     // We are adding just key x value style pair
  //     this.el.style.setProperty(key, String(value))
  //   }
  //   else {
  //     // Working with object
  //     Object.assign(this.el.style, key)
  //   }

  //   return this
  // }

  // attr(key: string | Record<string, Primitive>, value?: Primitive) {
  //   // No value means we are setting a boolean attribute
  //   setAttribute(this.el, key, value)

  //   return this
  // }

  // Allows any component to be mounted anywhere in the dom
  mount(selector: string = 'body') {
    const domRoot = document.querySelector(selector)
    if (!domRoot)
      throw new Error('Root element does not exist')

    domRoot.appendChild(this.el)
    render(this.el, this.children)

    this.__runOnMount()
  }
}

// export function setAttribute(el: HTMLElement, key: string | Record<string, Primitive>, value: Primitive) {
//   if (isObject(key)) {
//     Object.entries(key).forEach(([k, v]) => {
//       setAttribute(el, k, v)
//     })
//     return
//   }

//   if (!value) {
//     el.setAttribute(key, '')
//   }
//   else if (typeof value === 'boolean') {
//     if (value)
//       el.setAttribute(key, '')
//     else
//       el.removeAttribute(key)
//   }
//   else {
//     el.setAttribute(key, String(value))
//   }
// }

// Returns wether node was replaced or not
function replaceChildAt(parent: Element, newChild: Element | Text, index: number): boolean {
  // Using childNodes instead of children will also include textNodes, which we want
  const currentChild = Array.from(parent.childNodes).at(index)
  if (!currentChild)
    return false

  parent.replaceChild(newChild, currentChild)
  return true
}

export function render(root: Element, children?: ComponentChildren, index?: number) {
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

  else if (children instanceof Element) {
    root.appendChild(children)
  }

  else if (children instanceof Fragment) {
    render(root, children.children)
  }

  else if (children instanceof Component) {
    root.appendChild(children.el)
    render(children.el, children.children)
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
        })
      }
      else {
        root.appendChild(child.el)
        render(child.el, child.children)
        child.__runOnMount()
      }
    }
  }

  else if (isFunction(children)) {
    watch(children, value => render(root, value), {
      immediate: true,
    })
  }
}
