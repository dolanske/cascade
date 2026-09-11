import type { EffectScope, MaybeRefOrGetter, Primitive, Ref } from '@vue/reactivity'
import type { ClassValue } from './methods/class'
import type { ForCallback, ForOptions, ForSource } from './methods/for'
import type { ModelOptions, ModelValue } from './methods/model'
import type { EventConfig, KeyInputOptions } from './methods/on'
import type { StyleValue } from './methods/style'
import type { Disposable } from './render'
import type { ComponentChildren, ComponentChildrenItems, CSSStyle, EventKey, EventPayload, EventsMap, GenericCallback, Key, ListenableEvent, Listener, MountCallback, NoEvents, SetupArguments, Unwrapped, VisibilityCallback } from './types'
import { effectScope, markRaw } from '@vue/reactivity'
import { attr, attrs } from './methods/attributes'
import { class_impl } from './methods/class'
import { emit } from './methods/emit'
import { for_impl } from './methods/for'
import { html } from './methods/html'
import { id } from './methods/id'
import { if_impl } from './methods/if'
import { model } from './methods/model'
import { keyEventImpl, on } from './methods/on'
import { show } from './methods/show'
import { style } from './methods/style'
import { text } from './methods/text'
import { mountChild, normalizeChildren } from './render'
import { isFn, setInstance, warnOnce } from './util'

let uid = 0

/**
 * Arguments of `.emit()`. The payload is required when the event declares a
 * payload type, optional otherwise.
 */
export type EmitArgs<EventsType, K> = unknown extends EventPayload<EventsType, K>
  ? [payload?: unknown, options?: CustomEventInit]
  : undefined extends EventPayload<EventsType, K>
    ? [payload?: EventPayload<EventsType, K>, options?: CustomEventInit]
    : [payload: EventPayload<EventsType, K>, options?: CustomEventInit]

export class Component<PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents> {
  /**
   * Unique identifier of the component instance.
   */
  identifier: string
  /**
   * Reference to the DOM element of the current component.
   */
  el: HTMLElement
  /**
   * Children which will be rendered inside the component. Can be replaced
   * with `.nest()`.
   */
  componentChildren: ComponentChildrenItems<PropsType>[] = []
  /**
   * Children which were passed when the component was created. Use them in
   * `.nest()` to create a slot.
   *
   * ```ts
   * // Inside Wrapper component
   * ctx.nest(div(ctx.children).class('wrapper'))
   * // Using the Wrapper component
   * Wrapper(h1('Hello world'))
   * // Will render
   * <div><div><h1>"Hello world"</h1></div></div>
   * ```
   */
  children: ComponentChildrenItems<PropsType>[] = []
  /**
   * Reference to the parent component instance, if there is one.
   */
  parent: Component<any, any> | null = null
  /**
   * If true, the component can not have any child components
   */
  isVoid: boolean = false
  /**
   * Element the component was mounted to with `.mount()`. Only the top-most
   * component has a root element.
   */
  root: Element | null = null
  isRoot = false

  //////////////////////////////
  // Internals

  $onInitCbs: GenericCallback[] = []
  $onMountCbs: MountCallback[] = []
  $onBeforeDestroyCbs: GenericCallback[] = []
  $onDestroyCbs: GenericCallback[] = []
  $onVisibilityCbs: VisibilityCallback[] = []
  /**
   * Amount of callbacks registered before the first initialization. Anything
   * registered later (inside `setup`, `onMount`, ...) belongs to a single
   * mount and is dropped on destroy, so the component can be mounted again.
   */
  $persisted: number[] | null = null

  /**
   * Every watcher of the component lives in this scope. Destroying the
   * component stops it, `.if()` pauses it while the component is hidden.
   */
  $scope: EffectScope = effectScope(true)
  /**
   * Rendered children. Destroyed together with the component.
   */
  $blocks: Disposable[] = []
  /**
   * Placeholder which keeps the position of the component while `.if()`
   * removed it from the DOM.
   */
  $anchor: Comment | null = null
  $visible = true
  $key: Key | undefined = undefined
  $initialized = false
  $mounted = false
  $destroyed = false
  $componentProps: PropsType

  constructor(el: HTMLElement, props?: PropsType) {
    // Components hold DOM references and internal state, wrapping them into a
    // reactive proxy (for instance by storing them in a `ref([])`) would only
    // add overhead.
    markRaw(this)
    this.el = el
    setInstance(el, this)
    this.$componentProps = props ?? {} as PropsType
    this.identifier = `c${(++uid).toString(36)}`
  }

  //////////////////////////////
  // Private API

  $setComponentChildren(value: ComponentChildren<PropsType>) {
    if (this.isVoid)
      return
    this.componentChildren = normalizeChildren(value)
  }

  /**
   * Resets the state for a (re)mount.
   */
  $prepare() {
    if (this.$destroyed) {
      this.$scope = effectScope(true)
      // Children are rendered again, drop whatever the previous mount left
      // inside the element
      if (!this.$childrenDetached)
        this.el.replaceChildren()
    }
    this.$destroyed = false
    this.$visible = true
  }

  /**
   * Runs `onInit` callbacks. Must run inside `$scope`.
   */
  $init() {
    if (this.$initialized)
      return
    this.$initialized = true
    this.$persisted = [this.$onInitCbs.length, this.$onMountCbs.length, this.$onBeforeDestroyCbs.length, this.$onDestroyCbs.length, this.$onVisibilityCbs.length]

    // Callbacks may register further `onInit` callbacks, the iterator picks
    // them up
    for (const cb of this.$onInitCbs)
      cb()
  }

  /**
   * Runs `onMount` callbacks once the component is in the DOM.
   */
  $mount() {
    if (this.$mounted || this.$destroyed)
      return
    this.$mounted = true

    this.$scope.run(() => {
      for (const cb of this.$onMountCbs) {
        const cleanup = cb()
        if (isFn(cleanup))
          this.$onDestroyCbs.push(cleanup as GenericCallback)
      }
    })

    // Watchers created while mounting a hidden component need pausing too
    if (!this.$visible) {
      this.$scope.resume()
      this.$scope.pause()
    }
  }

  $setVisible(visible: boolean) {
    if (visible === this.$visible)
      return
    this.$visible = visible

    // Not rendered yet, mounting reads `$visible`
    if (!this.$anchor?.parentNode)
      return

    if (visible) {
      this.$scope.resume()
      this.$anchor.parentNode.insertBefore(this.el, this.$anchor.nextSibling)
    }
    else {
      this.el.remove()
      this.$scope.pause()
    }

    for (const cb of this.$onVisibilityCbs)
      cb(visible)
  }

  $destroy(removeDom: boolean = true) {
    if (!this.$initialized) {
      if (removeDom)
        this.el.remove()
      return
    }

    for (const cb of this.$onBeforeDestroyCbs)
      cb()

    for (const block of this.$blocks)
      block.destroy(removeDom && this.$childrenDetached)
    this.$blocks = []

    for (const cb of this.$onDestroyCbs)
      cb()

    this.$scope.stop()

    if (removeDom) {
      this.el.remove()
      this.$anchor?.remove()
    }

    // Drop everything registered during this mount
    const [init, mount, beforeDestroy, destroy, visibility] = this.$persisted!
    this.$onInitCbs.length = init
    this.$onMountCbs.length = mount
    this.$onBeforeDestroyCbs.length = beforeDestroy
    this.$onDestroyCbs.length = destroy
    this.$onVisibilityCbs.length = visibility

    this.$initialized = false
    this.$mounted = false
    this.$destroyed = true
  }

  /**
   * True when child blocks live next to the component instead of inside
   * `el` (fragments), so they must remove their own DOM nodes.
   */
  get $childrenDetached() {
    return false
  }

  //////////////////////////////
  // Lifecycle

  /**
   * Executes provided callback function when the component is initialized,
   * before it is inserted into the DOM. Reactive bindings are created here.
   *
   * @param callback {function}
   */
  onInit(callback: GenericCallback) {
    this.$onInitCbs.push(callback)
    return this
  }

  /**
   * Executes provided callback function when the component is mounted in the
   * DOM. The callback can return a cleanup function which runs on destroy.
   *
   * ```ts
   * ctx.onMount(() => {
   *   const interval = setInterval(tick, 1000)
   *   return () => clearInterval(interval)
   * })
   * ```
   */
  onMount(callback: MountCallback) {
    this.$onMountCbs.push(callback)
    return this
  }

  /**
   * Executes provided callback right before the component is removed from
   * the DOM, while its element is still attached.
   */
  onBeforeDestroy(callback: GenericCallback) {
    this.$onBeforeDestroyCbs.push(callback)
    return this
  }

  /**
   * Executes provided callback function when the component is removed from
   * the DOM and all of its watchers have been stopped.
   */
  onDestroy(callback: GenericCallback) {
    this.$onDestroyCbs.push(callback)
    return this
  }

  /**
   * Executes provided callback whenever `.if()` inserts or removes the
   * component.
   */
  onVisibilityChange(callback: VisibilityCallback) {
    this.$onVisibilityCbs.push(callback)
    return this
  }

  //////////////////////////////
  // Public API

  /**
   * Mounts the component in the DOM. Usually, you would use this function
   * either in the root App component, or a single component, if you're simply
   * adding small reactive scopes into an otherwise static site.
   *
   * @param target Selector or element, defaults to `body`
   */
  mount(target: string | Element = 'body') {
    const domRoot = typeof target === 'string' ? document.querySelector(target) : target
    if (!domRoot)
      throw new Error('Root element does not exist')

    this.root = domRoot
    this.isRoot = true
    mountChild(this, null, domRoot, null)
    return this
  }

  /**
   * Removes the component from the DOM, runs destroy hooks and stops every
   * watcher. A destroyed component can be rendered again, its setup and
   * bindings are re-created.
   */
  destroy() {
    this.$destroy(true)
  }

  /**
   * Identifies the component inside `.for()` loops and reactive children
   * lists. When the source changes, components with the same key are kept
   * and moved instead of being re-created.
   *
   * ```ts
   * ctx.for(items, item => li(item.name).key(item.id))
   * ```
   */
  key(value: Key) {
    this.$key = value
    return this
  }

  /**
   * Pass a single prop value into the component. You can also pass in refs, but
   * make sure to use the `.value` in the components, as these refs are directly
   * passed through.
   *
   * @param key {string}
   * @param value {any}
   */
  prop<K extends keyof PropsType>(key: K, value: PropsType[K]) {
    Object.assign(this.$componentProps, { [key]: value })
    return this
  }

  /**
   * Pass an object of props into the component. You can also pass in refs, but
   * make sure to use the `.value` in the components, as these refs are directly
   * passed through.
   */
  props(props: Partial<PropsType>) {
    Object.assign(this.$componentProps, props)
    return this
  }

  /**
   * Create a component scope, in which you can declare reactive variables. When
   * the component is removed from the DOM, all of the scope properties get
   * removed. This is the best way to declare reusable components.
   */
  setup(setupFn: SetupArguments<PropsType, EventsType>) {
    this.onInit(() => {
      setupFn(this, this.$componentProps)
    })
    return this
  }

  //////////////////////////////
  // Content

  /**
   * Set `textContent` of the current component.
   */
  text(value: MaybeRefOrGetter<Primitive>) {
    text.call(this, value)
    return this
  }

  /**
   * Set `innerHTML` of the current component.
   */
  html(value: MaybeRefOrGetter<string>) {
    html.call(this, value)
    return this
  }

  /**
   * Replaces the component's children. Accepts everything a component
   * factory accepts: text, components, DOM nodes, refs and getters.
   */
  nest(children: ComponentChildren<any>, ...rest: ComponentChildrenItems<any>[]) {
    this.$setComponentChildren([children, ...rest])
    return this
  }

  /**
   * Iterate over the provided array / object / number and render the
   * component returned from the callback for each item. The list replaces
   * the component's children.
   *
   * Items are reconciled: when the source changes, only the items which were
   * added, removed or changed are touched. Use `.key()` on the returned
   * component (or the `key` option) so that reordered items are moved instead
   * of re-created.
   *
   * @param source Array | Object | Number, or a ref / getter of one
   * @param callback Runs for each item and returns what to render
   * @param options Optional `key` function
   */
  for<S extends MaybeRefOrGetter<readonly any[]>>(
    source: S,
    callback: (item: Unwrapped<S>[number], index: number) => ComponentChildrenItems<any>,
    options?: ForOptions<Unwrapped<S>[number], number>,
  ): this
  for<S extends MaybeRefOrGetter<number>>(
    source: S,
    callback: (index: number) => ComponentChildrenItems<any>,
  ): this
  for<S extends MaybeRefOrGetter<object>>(
    source: S,
    callback: (value: Unwrapped<S>[keyof Unwrapped<S>], key: keyof Unwrapped<S> & string, index: number) => ComponentChildrenItems<any>,
    options?: ForOptions<Unwrapped<S>[keyof Unwrapped<S>], keyof Unwrapped<S> & string>,
  ): this
  for(source: MaybeRefOrGetter<ForSource>, callback: ForCallback, options?: ForOptions<any, any>) {
    for_impl.call(this, source, callback, options)
    return this
  }

  //////////////////////////////
  // Events

  /**
   * Add an event listener to the current component. Native events are typed
   * by their name, custom events declared on the component are typed by their
   * payload.
   *
   * @param type Event name
   * @param listener Function which runs on event trigger, receives the event and the custom event payload
   * @param config Optional listener options and modifiers
   */
  on<K extends ListenableEvent<EventsType>>(type: K, listener: Listener<EventsType, K>, config?: EventConfig) {
    on.call(this, type, listener as any, config)
    return this
  }

  /**
   * Emit a custom event which parent components can listen for. Additionally,
   * you can provide data which should be sent along.
   *
   * @param eventName Your custom event name
   * @param args Payload to send along and optional custom event options (bubbles by default)
   */
  emit<K extends EventKey<EventsType>>(eventName: K, ...args: EmitArgs<EventsType, K>) {
    emit.call(this, eventName, args[0], args[1])
    return this
  }

  /**
   * Shorthand for binding `on("click")` event listener to the current component.
   */
  click(listener: Listener<EventsType, 'click'>, config?: EventConfig) {
    return this.on('click', listener, config)
  }

  /**
   * Shorthand for binding `on("submit")` event listener to the current component.
   */
  submit(listener: Listener<EventsType, 'submit'>, config?: EventConfig) {
    return this.on('submit', listener, config)
  }

  /**
   * Shorthand for binding `on("focus")` event listener to the current component.
   */
  focus(listener: Listener<EventsType, 'focus'>, config?: EventConfig) {
    return this.on('focus', listener, config)
  }

  /**
   * Shorthand for binding `on("blur")` event listener to the current component.
   */
  blur(listener: Listener<EventsType, 'blur'>, config?: EventConfig) {
    return this.on('blur', listener, config)
  }

  /**
   * Shorthand for binding `on("change")` event listener to the current component.
   */
  change(listener: Listener<EventsType, 'change'>, config?: EventConfig) {
    return this.on('change', listener, config)
  }

  /**
   * Shorthand for binding `on("input")` event listener to the current component.
   */
  input(listener: Listener<EventsType, 'input'>, config?: EventConfig) {
    return this.on('input', listener, config)
  }

  /**
   * Shorthand for binding `on("keydown")` event listener to the current component.
   */
  keydown(listener: Listener<EventsType, 'keydown'>, config?: EventConfig) {
    return this.on('keydown', listener, config)
  }

  /**
   * Shorthand for binding `on("keydown")` event listener to the current
   * component and listening for specific keys to be pressed down.
   *
   * ```
   * Component.keydownExact(["Shift", "T"], () => ...)
   * ```
   */
  keydownExact(requiredKeyOrKeys: string | string[], listener: Listener<EventsType, 'keydown'>, config?: EventConfig & KeyInputOptions) {
    keyEventImpl.call(this, 'keydown', requiredKeyOrKeys, listener as any, config)
    return this
  }

  /**
   * Shorthand for binding `on("keyup")` event listener to the current component.
   */
  keyup(listener: Listener<EventsType, 'keyup'>, config?: EventConfig) {
    return this.on('keyup', listener, config)
  }

  /**
   * Shorthand for binding `on("keyup")` event listener to the current
   * component and listening for specific keys to be released.
   *
   * ```
   * Component.keyupExact(["Shift", "T"], () => ...)
   * ```
   */
  keyupExact(requiredKeyOrKeys: string | string[], listener: Listener<EventsType, 'keyup'>, config?: EventConfig & KeyInputOptions) {
    keyEventImpl.call(this, 'keyup', requiredKeyOrKeys, listener as any, config)
    return this
  }

  /**
   * Shorthand for binding `on("keypress")` event listener to the current component.
   */
  keypress(listener: Listener<EventsType, 'keypress'>, config?: EventConfig) {
    return this.on('keypress', listener, config)
  }

  /**
   * Shorthand for binding `on("keypress")` event listener to the current
   * component and listening for specific keys to be pressed.
   *
   * ```
   * Component.keypressExact(["Shift", "T"], () => ...)
   * ```
   */
  keypressExact(requiredKeyOrKeys: string | string[], listener: Listener<EventsType, 'keypress'>, config?: EventConfig & KeyInputOptions) {
    keyEventImpl.call(this, 'keypress', requiredKeyOrKeys, listener as any, config)
    return this
  }

  /**
   * Two way binding of a reactive variable to the value of an input, select,
   * textarea or details element.
   */
  model(value: Ref<ModelValue>, options?: ModelOptions) {
    model.call(this, value, options)
    return this
  }

  //////////////////////////////
  // Attributes

  /**
   * Bind static or reactive classes.
   *
   * ```ts
   * ctx.class('btn primary')
   * ctx.class('active', isActive)
   * ctx.class({ active: isActive, large: () => size.value > 10 })
   * ctx.class(() => [theme.value, { active: isActive.value }])
   * ```
   */
  class(classNames: ClassValue | MaybeRefOrGetter<ClassValue>, value?: MaybeRefOrGetter<boolean>) {
    class_impl.call(this, classNames, value)
    return this
  }

  /**
   * Add static or reactive inline styles.
   */
  style(key: keyof CSSStyle | MaybeRefOrGetter<CSSStyle>, value?: MaybeRefOrGetter<StyleValue>) {
    style.call(this, key, value)
    return this
  }

  /**
   * Bind attribute object to the component.
   */
  attrs(attrData: MaybeRefOrGetter<Record<string, Primitive>>) {
    attrs.call(this, attrData)
    return this
  }

  /**
   * Bind a single attribute to the component.
   */
  attr(key: string, value?: MaybeRefOrGetter<Primitive>) {
    attr.call(this, key, value)
    return this
  }

  /**
   * Dynamically bind a `disabled` attribute to the component.
   */
  disabled(value: MaybeRefOrGetter<boolean> = true) {
    attr.call(this, 'disabled', value)
    return this
  }

  /**
   * Dynamically bind an `id` attribute to the component.
   */
  id(value: MaybeRefOrGetter<Primitive>) {
    id.call(this, value)
    return this
  }

  //////////////////////////////
  // Conditional rendering

  /**
   * Toggle between showing or hiding the current component. The component is
   * still rendered, but has `display: none` applied to it.
   *
   * This function also preserves the previously added inline styles.
   */
  show(value: MaybeRefOrGetter<any>) {
    show.call(this, value)
    return this
  }

  /**
   * Conditionally render a component. While the condition is falsy the
   * element is removed from the DOM and the component's watchers are paused.
   * The instance is kept, so toggling back is cheap.
   */
  if(expr: MaybeRefOrGetter<any>) {
    if_impl.call(this, expr)
    return this
  }
}

/**
 * Void components are those which can not contain any child components. The
 * implementation is the same as normal elements, except it is not possible to
 * provide any child elements.
 */
export class VoidComponent<PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents> extends Component<PropsType, EventsType> {
  constructor(el: HTMLElement) {
    super(el)
    this.isVoid = true
  }

  override $setComponentChildren(_value: ComponentChildren<PropsType>): void {
    this.componentChildren = []
  }
}

/**
 * Fragment does not have any DOM element associated with it. All of its
 * children are rendered into the fragment's parent element.
 */
export class Fragment<PropsType extends object = Record<string, any>> extends Component<PropsType, any> {
  $start = document.createComment('')
  $end = document.createComment('')

  constructor(children: ComponentChildren<PropsType> = []) {
    super(document.createElement('template'))
    this.componentChildren = normalizeChildren(children)
  }

  override get $childrenDetached() {
    return true
  }

  override $destroy(removeDom: boolean = true) {
    super.$destroy(removeDom)
    if (removeDom) {
      this.$start.remove()
      this.$end.remove()
    }
  }

  override if(_expr: MaybeRefOrGetter<any>) {
    warnOnce('fragment-if', '[cascade] `.if()` is not supported on fragments. Use a getter child instead: `() => condition.value && fragment(...)`')
    return this
  }
}

/**
 * Fragment is not inserted into the DOM. Its children are appended to
 * fragment's parent element. Any methods which require DOM element to be
 * present will not work.
 *
 * @param children {ComponentChildren}
 */
export function fragment<PropsType extends object = Record<string, any>>(children: ComponentChildren<PropsType> = [], ...rest: ComponentChildrenItems<PropsType>[]) {
  return new Fragment<PropsType>([children, ...rest])
}
