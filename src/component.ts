import { effectScope } from '@vue/reactivity'
import type { EffectScope, UnwrapRef } from '@vue/reactivity'
import type { ComponentChildren, GenericCallback, HtmlVoidtags } from './types'
import { text } from './methods/text'
import { blur, change, click, focus, input, keydown, keydownExact, keypress, keypressExact, keyup, keyupExact, on, submit } from './methods/on'
import { class_impl } from './methods/class'
import { html } from './methods/html'
import type { SetupArguments } from './methods/setup'
import { prop, props, setup } from './methods/setup'
import { nest } from './methods/nest'
import { model } from './methods/model'
import { render } from './render'
import { attr, attrs } from './methods/attributes'
import { disabled } from './methods/disabled'
import { id } from './methods/id'
import { destroy } from './lifecycle'
import { show } from './methods/show'
import type { CallbackType } from './methods/for'
import { for_impl } from './methods/for'
import { style } from './methods/style'
import { if_impl } from './methods/if'
import { clone } from './methods/clone'
import { createId } from './id'

export class Component {
  /**
   * Set `textContent` of the current component.
   */
  text = text.bind(this)
  /**
   * Set `innerHTML` of the current component.
   */
  html = html.bind(this)
  /**
   * Add an event listener to the current component.
   *
   * @param on {keyof HTMLElementEventMap} Event name
   * @param listener {EventListenerOrEventListenerObject} Function which runs on event trigger
   * @param options {EventListenerOptions | undefined} Optional event configuration
   *
   */
  on = on.bind(this)
  /**
   * Shorthand for binding `on("click")` event listener to the current component.
   */
  click = click.bind(this)
  /**
   * Shorthand for binding `on("submit")` event listener to the current component.
   */
  submit = submit.bind(this)
  /**
   * Shorthand for binding `on("focus")` event listener to the current component.
   */
  focus = focus.bind(this)
  /**
   * Shorthand for binding `on("blur")` event listener to the current component.
   */
  blur = blur.bind(this)
  /**
   * Shorthand for binding `on("change")` event listener to the current component.
   */
  change = change.bind(this)
  /**
   * Shorthand for binding `on("input")` event listener to the current component.
   */
  input = input.bind(this)
  /**
   * Shorthand for binding `on("keydown")` event listener to the current component.
   */
  keydown = keydown.bind(this)
  /**
   * Shorthand for binding `on("keydown")` event listener to the current
   * component and listening for specific keys to be pressed down.
   *
   * ```
   * Component.keydownExact(["Shift", "T"], () => ...)
   * ```
   */
  keydownExact = keydownExact.bind(this)
  /**
   * Shorthand for binding `on("keyup")` event listener to the current component.
   */
  keyup = keyup.bind(this)
  /**
   * Shorthand for binding `on("keyup")` event listener to the current
   * component and listening for specific keys to be released.
   *
   * ```
   * Component.keyupExact(["Shift", "T"], () => ...)
   * ```
   */
  keyupExact = keyupExact.bind(this)
  /**
   * Shorthand for binding `on("keypress")` event listener to the current component.
   */
  keypress = keypress.bind(this)
  /**
   * Shorthand for binding `on("keypress")` event listener to the current
   * component and listening for specific keys to be pressed.
   *
   * ```
   * Component.keypressExact(["Shift", "T"], () => ...)
   * ```
   */
  keypressExact = keypressExact.bind(this)
  /**
   * Bind reactive class object to the current component.
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
  /**
   * Two way binding of a reactive variable to the inputs / selects value.
   */
  model = model.bind(this)
  /**
   * Bind attribute object to the component.
   */
  attrs = attrs.bind(this)
  /**
   * Bind a single attribute to the component.
   */
  attr = attr.bind(this)
  /**
   * Dynamically bind a `disabled` attribute to the component.
   */
  disabled = disabled.bind(this)
  /**
   * Dynamically bind an `id` attribute to the component.
   */
  id = id.bind(this)
  /**
   * Toggle between showing or hiding the current component. the component is still
   * rendered, but has `display: none` applied to it.
   *
   * This function also preserves the previously added inline styles.
   */
  show = show.bind(this)
  /**
   * Add reactive styling object to the current component.
   */
  style = style.bind(this)
  /**
   * Conditionally render a component.
   */
  if = if_impl.bind(this)
  /**
   * Clone the component
   */
  clone = clone.bind(this)

  //
  // Public stuff which could be useful to users
  identifier: string
  /**
   * Stores reference to the mounted DOM Element of the current component.
   */
  el: HTMLElement
  /**
   * Stores child component instances.
   */
  componentChildren: ComponentChildren = []
  /**
   * Normally, providing children to a component will render them as the first descendant of said component. You can change the place where children will render, effectively creating a slot component.
   * You can do this by using `ctx.children` in your component's `.nest()` call.
   *
   * ```ts
   * // Inside Wrapper component
   * ctx.nest(div(ctx.children).class("wrapper"))
   * // Using the Wrapper component
   * Wrapper(h1("Hello world"))
   * // Will render
   * <div><div><h1>"Hello world"</h1></div></div>
   * ```
   */
  children: ComponentChildren = []
  /**
   * Stores the reference to the parent Component instance, if it has one.
   */
  parent: Component | null = null

  //
  // Private stuff for implementation
  #onMountCbs: GenericCallback[] = []
  #onDestroyCbs: GenericCallback[] = []
  #onInitCbs: GenericCallback[] = []

  __scopes = new Set<SetupArguments>()
  __runningScopes = new Set<EffectScope>()
  __componentProps: object

  constructor(el: HTMLElement, props: object = {}) {
    this.el = el
    Object.defineProperty(this.el, '__instance', this)
    this.__componentProps = props
    this.identifier = createId(true)
  }

  /////////////////////////////////////////////////////////////
  // Private API
  __setComponentChildren(value: ComponentChildren) {
    this.componentChildren = value
  }

  __runOnMount() {
    for (const cb of this.#onMountCbs)
      cb()
  }

  __runOnDestroy() {
    for (const cb of this.#onDestroyCbs)
      cb()
  }

  __runOnInit() {
    for (const cb of this.#onInitCbs)
      cb()
  }

  __rerunSetup() {
    for (const runner of this.__scopes) {
      const scope = effectScope()
      scope.run(() => {
        runner(this, this.__componentProps)
      })

      this.__runningScopes.add(scope)
    }
  }

  __closeScopes() {
    for (const scope of this.__runningScopes)
      scope.stop()

    this.__runningScopes = new Set()
  }

  /////////////////////////////////////////////////////////////
  // Public API

  /**
   * Executes provided callback function when the component is initialized.
   * Before being rendered in the DOM.
   *
   * @param callback {function}
   */
  onInit(callback: GenericCallback) {
    this.#onInitCbs.push(callback)
  }

  /**
   * Executes provided callback function when the component is mounted in the
   * DOM.
   *
   * @param callback {function}
   */
  onMount(callback: GenericCallback) {
    this.#onMountCbs.push(callback)
  }

  /**
   *
   * @param callback executes provided callback function when the component is
   * removed from the DOM.
   */

  onDestroy(callback: GenericCallback) {
    this.#onDestroyCbs.push(callback)
  }

  /**
   * Mounts the current element in the DOM. Usually, you would use this function
   * either in the root App component, or a single component, if you're simply
   * adding small reactive __scopes into an otherwise static site.
   *
   * @param selector {string} Default: "body" element
   */
  mount(selector: string = 'body') {
    const domRoot = document.querySelector(selector)
    if (!domRoot)
      throw new Error('Root element does not exist')

    domRoot.appendChild(this.el)
    this.__rerunSetup()
    this.__runOnInit()
    render(this, this.componentChildren)
    this.__runOnMount()
  }

  // Removes the root component and its desendants. It also
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
  for<S extends readonly any[] | number | object>(source: S, callback: CallbackType<UnwrapRef<S>>) {
    return for_impl.call(this, source, callback)
  }
}

/**
 * Void components are those which can not contain any more child components. The
 * implementation is the same as normal elements, except it is not possible to
 * provide any child elements. The
 */
export class VoidComponent extends Component {
  constructor(type: HtmlVoidtags | 'option') {
    super(document.createElement(type))
  }

  override __setComponentChildren(_value: ComponentChildren): void {
    this.componentChildren = []
  }
}

/**
 * Fragment does not have any DOM element associated within it. All of its children
 * are appended to fragment's parent element.
 */
export class Fragment extends Component {
  constructor(children: ComponentChildren = []) {
    super(document.createElement('template'))
    this.componentChildren = children
  }

  override mount(selector: string) {
    const domRoot = document.querySelector(selector)
    if (!domRoot)
      throw new Error('Root element does not exist')
    this.__runOnInit()
    render(domRoot, this.componentChildren)
    this.__runOnMount()
  }
}

/**
 * Fragment is not inserted into the DOM. Its children are appended to
 * fragment's parent element. Any methods which require DOM element to be
 * present will not work.
 *
 * @param children {ComponentChildren}
 */
export function fragment(children?: ComponentChildren) {
  return new Fragment(children)
}
