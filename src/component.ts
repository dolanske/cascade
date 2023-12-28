import type { ComponentChildren, GenericCallback, HtmlVoidtags, PropObject } from './types'
import { text } from './methods/text'
import { click, on } from './methods/on'
import { if_impl } from './methods/if'
import { class_impl } from './methods/class'
import { html } from './methods/html'
import { prop, props, setup } from './methods/setup'
import { nest } from './methods/nest'
import { model } from './methods/model'
import { render } from './render'
import { destroy } from './factory'

// TODO
// Split component into multiple component classes
// BaseComponent
// - contains hooks and methods which do not require a HTML or children, props
// DomComponent
// - contains el. and DOM specific API
// VoidComponent
// - Component which does not contain any children
// Component

// export class BaseComponent {

// }

// export class DomComponent extends BaseComponent {
//   constructor() {
//     super()
//   }
// }

// export class VoidComponent extends BaseComponent { }

export class Component {
  /**
   * Set `textContent` of the current node.
   *
   * @param text {string | () => string}
   */
  text = text.bind(this)
  /**
   * Set `innerHTML` of the current node.
   */
  html = html.bind(this)
  /**
   * Add an event listener to the current node.
   *
   * @param on {keyof HTMLElementEventMap} Event name
   * @param listener {EventListenerOrEventListenerObject} Function which runs on event trigger
   * @param options {EventListenerOptions | undefined} Optional event configuration
   *
   */
  on = on.bind(this)
  /**
   * Shorthand for binding `on("click")` event listener to the current node.
   */
  click = click.bind(this)
  if = if_impl.bind(this)
  class = class_impl.bind(this)
  setup = setup.bind(this)
  /**
   * Pass a single prop value into the component. You can also pass in refs, but
   * make sure to use the `.value` in the components, as these refs are directly
   * passed through.
   *
   * @param propKey {string}
   * @param propValue {any}
   */
  prop = prop.bind(this)
  /**
   * Pass an object of props into the component. You can also pass in refs, but
   * make sure to use the `.value` in the components, as these refs are directly
   * passed through.
   */
  props = props.bind(this)
  /**
   * Simple helper which allows you to insert component's children anywhere in
   * the chain. This was made mainly because it feels less natural to add
   * children to a component and only then use methods like `if` or `for` on it.
   */
  nest = nest.bind(this)
  model = model.bind(this)

  el: HTMLElement
  children: ComponentChildren = []
  componentProps: PropObject

  // Lifecycle
  onMountCbs: GenericCallback[] = []
  onDestroyCbs: GenericCallback[] = []
  onInitCbs: GenericCallback[] = []

  __isElse?: boolean
  __isElseIf?: boolean

  constructor(el: HTMLElement, props: PropObject = {}) {
    this.el = el
    this.componentProps = props
  }

  /////////////////////////////////////////////////////////////
  // Private API
  __children(value: ComponentChildren) {
    this.children = value
  }

  __runOnMount() {
    for (const cb of this.onMountCbs)
      cb()
  }

  __runOnDestroy() {
    for (const cb of this.onDestroyCbs)
      cb()
  }

  __runOnInit() {
    for (const cb of this.onInitCbs)
      cb()
  }

  /////////////////////////////////////////////////////////////
  // Public API

  /**
   * Executes provided callback function when the component is initialized.
   * Before being rendered in the dom.
   *
   * @param callback {function}
   */
  onInit(callback: GenericCallback) {
    this.onInitCbs.push(callback)
  }

  /**
   * Executes provided callback function when the component is mounted in the
   * DOM.
   *
   * @param callback {function}
   */
  onMount(callback: GenericCallback) {
    this.onMountCbs.push(callback)
  }

  /**
   *
   * @param callback executes provided callback function when the component is
   * removed from the DOM.
   */

  onDestroy(callback: GenericCallback) {
    this.onDestroyCbs.push(callback)
  }

  // Allows any component to be mounted anywhere in the dom
  mount(selector: string = 'body') {
    const domRoot = document.querySelector(selector)
    if (!domRoot)
      throw new Error('Root element does not exist')

    domRoot.appendChild(this.el)

    this.__runOnInit()

    render(this.el, this.children)
    this.__runOnMount()
  }

  // Removes the root node and its desendants. It also
  destroy() {
    destroy(this)
  }
}

export class VoidComponent extends Component {
  constructor(type: HtmlVoidtags) {
    super(document.createElement(type))
  }

  override __children(_value: ComponentChildren): void {
    this.children = []
  }
}
