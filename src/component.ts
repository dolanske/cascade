import type { EffectScheduler, EffectScope, UnwrapRef } from '@vue/reactivity'
import type { WatchStopHandle } from '@vue-reactivity/watch'
import { watch } from '@vue-reactivity/watch'
import type { ComponentChildren, GenericCallback, HtmlVoidtags, PropObject } from './types'
import { text } from './methods/text'
import { click, on } from './methods/on'

import { class_impl } from './methods/class'
import { html } from './methods/html'
import { prop, props, setup } from './methods/setup'
import { nest } from './methods/nest'
import { model } from './methods/model'
import { render } from './render'
import { attr, attrs } from './methods/attributes'
import { disabled } from './methods/disabled'
import { id } from './methods/id'
import { destroy } from './lifecycle'
import { show } from './methods/show'
import type { ItemCallbackValue } from './methods/for'
import { for_impl } from './methods/for'
import { style } from './methods/style'
import { if_impl } from './methods/if'
import { clone } from './methods/clone'

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
  /**
   * Bind reactive class object to the current node.
   */
  class = class_impl.bind(this)
  /**
   * Create a component scope, in which you can declare reactive variables. When
   * the component is removed from the DOM, all of the scope properties get
   * removed. This is the best way to declare reusable components.
   */
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
  attrs = attrs.bind(this)
  attr = attr.bind(this)
  /**
   * Dynamically bind a `disabled` attribute to the node.
   */
  disabled = disabled.bind(this)
  /**
   * Dynamically bind an `id` attribute to the node.
   */
  id = id.bind(this)
  /**
   * Toggle between showing or hiding the current node. The node is still
   * rendered, but has `display: none` applied to it.
   *
   * This function also preserves the previously added inline styles.
   */
  show = show.bind(this)
  /**
   * Add reactive styling object to the current node.
   */
  style = style.bind(this)
  if = if_impl.bind(this)
  clone = clone.bind(this)

  el: HTMLElement
  children: ComponentChildren = []
  componentProps: PropObject
  parent: Component | null = null

  // Lifecycle
  onMountCbs: GenericCallback[] = []
  onDestroyCbs: GenericCallback[] = []
  onInitCbs: GenericCallback[] = []

  __setupCopes: Set<() => void> = new Set()

  registeredWatcherParams: Set<() => Parameters<typeof watch>> = new Set()
  runningWatchers: Set<WatchStopHandle> = new Set()

  // __isElse?: boolean
  // __isElseIf?: ConditionalExpr

  constructor(el: HTMLElement, props: PropObject = {}) {
    this.el = el
    Object.defineProperty(this.el, '__instance', this)
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

  __watch = (...params: Parameters<typeof watch<any>>) => {
    // Starts watcher
    this.runningWatchers.add(watch(...params))
    // Saves it
    this.registeredWatcherParams.add(() => params)
  }

  // Will start watchers which aren't currently running, but are registered.
  // This will not have much effect on first render, but if we clone or re-mount
  // component, all watchers will be re-registered.
  __restartWatchers() {
    for (const getParams of this.registeredWatcherParams) {
      const params = getParams()
      this.runningWatchers.add(watch(...params))
    }
  }

  __stopWatchers() {
    for (const stopper of this.runningWatchers)
      stopper()
    this.runningWatchers = new Set()
  }

  __restartScopes() {
    for (const start of this.__setupCopes)
      start()
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

  /**
   * Mounts the current element in the DOM. Usually, you would use this function
   * either in the root App component, or a single component, if you're simply
   * adding small reactive scopes into an otherwise static site.
   *
   * @param selector {string} Default: "body" element
   */
  mount(selector: string = 'body') {
    const domRoot = document.querySelector(selector)
    if (!domRoot)
      throw new Error('Root element does not exist')

    this.__restartScopes()
    this.__restartWatchers()
    domRoot.appendChild(this.el)
    this.__runOnInit()
    render(this, this.children)
    this.__runOnMount()
  }

  // Removes the root node and its desendants. It also
  destroy() {
    destroy(this)
  }

  /**
   * Iterate over the provided object / array / number and execute the provided
   * callback for each item. Components returned from the callback are then
   * rendered.
   *
   * It is recommended not to use other chained methods when using `for`,
   * because the base element is replaced with the return value of the callback
   * function. All logic should therefore be handled there.
   *
   * @param source Array|Object|Number
   * @param callback Function which runs for each provided item.
   * @returns Component to render
   *
   *
   */
  for<S extends readonly any[] | number | object>(source: S, callback: (
    element: Component,
    item: ItemCallbackValue<UnwrapRef<S>>
  ) => void) {
    // @ts-expect-error The issue here is that tyhe type mismatch happens from a
    // generic type being passed in. I have ran into an issue where if a
    // function has a `this` as the first argument, the generic type infer does
    // not work. I am not sure why.
    return for_impl.call(this, source, callback)
  }
}

/**
 * Void components are those which can not contain any more child nodes. The
 * implementation is the same as normal elements, except it is not possible to
 * provide any child elements. The
 */
export class VoidComponent extends Component {
  constructor(type: HtmlVoidtags | 'option') {
    super(document.createElement(type))
  }

  override __children(_value: ComponentChildren): void {
    this.children = []
  }
}

/**
 * Fragment does not have any DOM node associated within it. All of its children
 * are appended to fragment's parent node.
 */
export class Fragment extends Component {
  constructor(children: ComponentChildren = []) {
    super(document.createElement('template'))
    this.children = children
  }

  override mount(selector: string) {
    const domRoot = document.querySelector(selector)
    if (!domRoot)
      throw new Error('Root element does not exist')

    this.__restartWatchers()
    this.__runOnInit()
    render(domRoot, this.children)
    this.__runOnMount()
  }
}

/**
 * Fragment is not inserted into the DOM. Its children are appended to
 * fragment's parent node. Any methods which require DOM element to be present
 * will not work.
 *
 * @param children {ComponentChildren}
 */
export function fragment(children?: ComponentChildren) {
  return new Fragment(children)
}
