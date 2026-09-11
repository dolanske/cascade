import { EffectScope } from '@vue/reactivity';
import { MaybeRefOrGetter } from '@vue/reactivity';
import { Primitive } from '@vue/reactivity';
import { Properties } from 'csstype';
import { PropertiesHyphen } from 'csstype';
import { Ref } from '@vue/reactivity';

export declare const a: ComponentInstance;

export declare const abbr: ComponentInstance;

export declare const address: ComponentInstance;

export declare const applet: ComponentInstance;

export declare const area: <PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>() => VoidComponent<PropsType, EventsType>;

export declare const article: ComponentInstance;

export declare const aside: ComponentInstance;

export declare const audio: ComponentInstance;

export declare const b: ComponentInstance;

export declare const base: <PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>() => VoidComponent<PropsType, EventsType>;

export declare const basefont: ComponentInstance;

export declare const bdi: ComponentInstance;

export declare const bdo: ComponentInstance;

export declare const bgsound: ComponentInstance;

export declare const blink: ComponentInstance;

export declare const blockquote: ComponentInstance;

export declare const body: ComponentInstance;

export declare const br: <PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>() => VoidComponent<PropsType, EventsType>;

export declare const button: ComponentInstance;

export declare const canvas: ComponentInstance;

export declare const caption: ComponentInstance;

/**
 * Values which render as text, plus the ones which render nothing at all
 * (`null`, `undefined`, booleans), so `condition && span('hi')` works.
 */
declare type ChildPrimitive = string | number | bigint | boolean | null | undefined;

export declare const cite: ComponentInstance;

/**
 * Clamps a numeric output between `min` and `max`. Use after `Transform.number`.
 */
declare function clamp(min: number, max: number): ModelTransform<number, number>;

export declare type ClassObject = Record<string, MaybeRefOrGetter<boolean>>;

/**
 * Everything `.class()` accepts: a class string (`'a b'`), an array of
 * strings / objects, or an object mapping class names to conditions.
 */
export declare type ClassValue = string | ClassObject | ClassValue[] | null | undefined | false;

export declare const code: ComponentInstance;

export declare const col: <PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>() => VoidComponent<PropsType, EventsType>;

export declare const colgroup: ComponentInstance;

export declare class Component<PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents> {
    /**
     * Unique identifier of the component instance.
     */
    identifier: string;
    /**
     * Reference to the DOM element of the current component.
     */
    el: HTMLElement;
    /**
     * Children which will be rendered inside the component. Can be replaced
     * with `.nest()`.
     */
    componentChildren: ComponentChildrenItems<PropsType>[];
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
    children: ComponentChildrenItems<PropsType>[];
    /**
     * Reference to the parent component instance, if there is one.
     */
    parent: Component<any, any> | null;
    /**
     * If true, the component can not have any child components
     */
    isVoid: boolean;
    /**
     * Element the component was mounted to with `.mount()`. Only the top-most
     * component has a root element.
     */
    root: Element | null;
    isRoot: boolean;
    $onInitCbs: GenericCallback[];
    $onMountCbs: MountCallback[];
    $onBeforeDestroyCbs: GenericCallback[];
    $onDestroyCbs: GenericCallback[];
    $onVisibilityCbs: VisibilityCallback[];
    /**
     * Amount of callbacks registered before the first initialization. Anything
     * registered later (inside `setup`, `onMount`, ...) belongs to a single
     * mount and is dropped on destroy, so the component can be mounted again.
     */
    $persisted: number[] | null;
    /**
     * Every watcher of the component lives in this scope. Destroying the
     * component stops it, `.if()` pauses it while the component is hidden.
     */
    $scope: EffectScope;
    /**
     * Rendered children. Destroyed together with the component.
     */
    $blocks: Disposable_2[];
    /**
     * Placeholder which keeps the position of the component while `.if()`
     * removed it from the DOM.
     */
    $anchor: Comment | null;
    $visible: boolean;
    $key: Key | undefined;
    $initialized: boolean;
    $mounted: boolean;
    $destroyed: boolean;
    $componentProps: PropsType;
    constructor(el: HTMLElement, props?: PropsType);
    $setComponentChildren(value: ComponentChildren<PropsType>): void;
    /**
     * Resets the state for a (re)mount.
     */
    $prepare(): void;
    /**
     * Runs `onInit` callbacks. Must run inside `$scope`.
     */
    $init(): void;
    /**
     * Runs `onMount` callbacks once the component is in the DOM.
     */
    $mount(): void;
    $setVisible(visible: boolean): void;
    $destroy(removeDom?: boolean): void;
    /**
     * True when child blocks live next to the component instead of inside
     * `el` (fragments), so they must remove their own DOM nodes.
     */
    get $childrenDetached(): boolean;
    /**
     * Executes provided callback function when the component is initialized,
     * before it is inserted into the DOM. Reactive bindings are created here.
     *
     * @param callback {function}
     */
    onInit(callback: GenericCallback): this;
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
    onMount(callback: MountCallback): this;
    /**
     * Executes provided callback right before the component is removed from
     * the DOM, while its element is still attached.
     */
    onBeforeDestroy(callback: GenericCallback): this;
    /**
     * Executes provided callback function when the component is removed from
     * the DOM and all of its watchers have been stopped.
     */
    onDestroy(callback: GenericCallback): this;
    /**
     * Executes provided callback whenever `.if()` inserts or removes the
     * component.
     */
    onVisibilityChange(callback: VisibilityCallback): this;
    /**
     * Mounts the component in the DOM. Usually, you would use this function
     * either in the root App component, or a single component, if you're simply
     * adding small reactive scopes into an otherwise static site.
     *
     * @param target Selector or element, defaults to `body`
     */
    mount(target?: string | Element): this;
    /**
     * Removes the component from the DOM, runs destroy hooks and stops every
     * watcher. A destroyed component can be rendered again, its setup and
     * bindings are re-created.
     */
    destroy(): void;
    /**
     * Identifies the component inside `.for()` loops and reactive children
     * lists. When the source changes, components with the same key are kept
     * and moved instead of being re-created.
     *
     * ```ts
     * ctx.for(items, item => li(item.name).key(item.id))
     * ```
     */
    key(value: Key): this;
    /**
     * Pass a single prop value into the component. You can also pass in refs, but
     * make sure to use the `.value` in the components, as these refs are directly
     * passed through.
     *
     * @param key {string}
     * @param value {any}
     */
    prop<K extends keyof PropsType>(key: K, value: PropsType[K]): this;
    /**
     * Pass an object of props into the component. You can also pass in refs, but
     * make sure to use the `.value` in the components, as these refs are directly
     * passed through.
     */
    props(props: Partial<PropsType>): this;
    /**
     * Create a component scope, in which you can declare reactive variables. When
     * the component is removed from the DOM, all of the scope properties get
     * removed. This is the best way to declare reusable components.
     */
    setup(setupFn: SetupArguments<PropsType, EventsType>): this;
    /**
     * Set `textContent` of the current component.
     */
    text(value: MaybeRefOrGetter<Primitive>): this;
    /**
     * Set `innerHTML` of the current component.
     */
    html(value: MaybeRefOrGetter<string>): this;
    /**
     * Replaces the component's children. Accepts everything a component
     * factory accepts: text, components, DOM nodes, refs and getters.
     */
    nest(children: ComponentChildren<any>, ...rest: ComponentChildrenItems<any>[]): this;
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
    for<S extends MaybeRefOrGetter<readonly any[]>>(source: S, callback: (item: Unwrapped<S>[number], index: number) => ComponentChildrenItems<any>, options?: ForOptions<Unwrapped<S>[number], number>): this;
    for<S extends MaybeRefOrGetter<number>>(source: S, callback: (index: number) => ComponentChildrenItems<any>): this;
    for<S extends MaybeRefOrGetter<object>>(source: S, callback: (value: Unwrapped<S>[keyof Unwrapped<S>], key: keyof Unwrapped<S> & string, index: number) => ComponentChildrenItems<any>, options?: ForOptions<Unwrapped<S>[keyof Unwrapped<S>], keyof Unwrapped<S> & string>): this;
    /**
     * Add an event listener to the current component. Native events are typed
     * by their name, custom events declared on the component are typed by their
     * payload.
     *
     * @param type Event name
     * @param listener Function which runs on event trigger, receives the event and the custom event payload
     * @param config Optional listener options and modifiers
     */
    on<K extends ListenableEvent<EventsType>>(type: K, listener: Listener<EventsType, K>, config?: EventConfig): this;
    /**
     * Emit a custom event which parent components can listen for. Additionally,
     * you can provide data which should be sent along.
     *
     * @param eventName Your custom event name
     * @param args Payload to send along and optional custom event options (bubbles by default)
     */
    emit<K extends EventKey<EventsType>>(eventName: K, ...args: EmitArgs<EventsType, K>): this;
    /**
     * Shorthand for binding `on("click")` event listener to the current component.
     */
    click(listener: Listener<EventsType, 'click'>, config?: EventConfig): this;
    /**
     * Shorthand for binding `on("submit")` event listener to the current component.
     */
    submit(listener: Listener<EventsType, 'submit'>, config?: EventConfig): this;
    /**
     * Shorthand for binding `on("focus")` event listener to the current component.
     */
    focus(listener: Listener<EventsType, 'focus'>, config?: EventConfig): this;
    /**
     * Shorthand for binding `on("blur")` event listener to the current component.
     */
    blur(listener: Listener<EventsType, 'blur'>, config?: EventConfig): this;
    /**
     * Shorthand for binding `on("change")` event listener to the current component.
     */
    change(listener: Listener<EventsType, 'change'>, config?: EventConfig): this;
    /**
     * Shorthand for binding `on("input")` event listener to the current component.
     */
    input(listener: Listener<EventsType, 'input'>, config?: EventConfig): this;
    /**
     * Shorthand for binding `on("keydown")` event listener to the current component.
     */
    keydown(listener: Listener<EventsType, 'keydown'>, config?: EventConfig): this;
    /**
     * Shorthand for binding `on("keydown")` event listener to the current
     * component and listening for specific keys to be pressed down.
     *
     * ```
     * Component.keydownExact(["Shift", "T"], () => ...)
     * ```
     */
    keydownExact(requiredKeyOrKeys: string | string[], listener: Listener<EventsType, 'keydown'>, config?: EventConfig & KeyInputOptions): this;
    /**
     * Shorthand for binding `on("keyup")` event listener to the current component.
     */
    keyup(listener: Listener<EventsType, 'keyup'>, config?: EventConfig): this;
    /**
     * Shorthand for binding `on("keyup")` event listener to the current
     * component and listening for specific keys to be released.
     *
     * ```
     * Component.keyupExact(["Shift", "T"], () => ...)
     * ```
     */
    keyupExact(requiredKeyOrKeys: string | string[], listener: Listener<EventsType, 'keyup'>, config?: EventConfig & KeyInputOptions): this;
    /**
     * Shorthand for binding `on("keypress")` event listener to the current component.
     */
    keypress(listener: Listener<EventsType, 'keypress'>, config?: EventConfig): this;
    /**
     * Shorthand for binding `on("keypress")` event listener to the current
     * component and listening for specific keys to be pressed.
     *
     * ```
     * Component.keypressExact(["Shift", "T"], () => ...)
     * ```
     */
    keypressExact(requiredKeyOrKeys: string | string[], listener: Listener<EventsType, 'keypress'>, config?: EventConfig & KeyInputOptions): this;
    /**
     * Two way binding of a reactive variable to the value of an input, select,
     * textarea or details element.
     */
    model(value: Ref<ModelValue>, options?: ModelOptions): this;
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
    class(classNames: ClassValue | MaybeRefOrGetter<ClassValue>, value?: MaybeRefOrGetter<boolean>): this;
    /**
     * Add static or reactive inline styles.
     */
    style(key: keyof CSSStyle | MaybeRefOrGetter<CSSStyle>, value?: MaybeRefOrGetter<StyleValue>): this;
    /**
     * Bind attribute object to the component.
     */
    attrs(attrData: MaybeRefOrGetter<Record<string, Primitive>>): this;
    /**
     * Bind a single attribute to the component.
     */
    attr(key: string, value?: MaybeRefOrGetter<Primitive>): this;
    /**
     * Dynamically bind a `disabled` attribute to the component.
     */
    disabled(value?: MaybeRefOrGetter<boolean>): this;
    /**
     * Dynamically bind an `id` attribute to the component.
     */
    id(value: MaybeRefOrGetter<Primitive>): this;
    /**
     * Toggle between showing or hiding the current component. The component is
     * still rendered, but has `display: none` applied to it.
     *
     * This function also preserves the previously added inline styles.
     */
    show(value: MaybeRefOrGetter<any>): this;
    /**
     * Conditionally render a component. While the condition is falsy the
     * element is removed from the DOM and the component's watchers are paused.
     * The instance is kept, so toggling back is cheap.
     */
    if(expr: MaybeRefOrGetter<any>): this;
}

declare type ComponentChildren<PropsType extends object = any> = ComponentChildrenItems<PropsType> | ComponentChildrenItems<PropsType>[];
export { ComponentChildren as Children }
export { ComponentChildren }

export declare type ComponentChildrenItems<PropsType extends object = any> = StaticChild<PropsType> | DynamicChild<PropsType> | ComponentChildrenItems<PropsType>[];

declare type ComponentInstance = <PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>(children?: ComponentChildren<PropsType>, ...rest: ComponentChildrenItems<PropsType>[]) => Component<PropsType, EventsType>;

export declare const content: ComponentInstance;

/**
 * Creates a random identifier which is guaranteed not to collide with any
 * other id handed out by this function.
 *
 * @param limited Only use lowercase letters, so the id is a valid identifier
 */
export declare function createId(limited?: boolean): string;

export declare interface CSSStyle extends Properties, PropertiesHyphen {
    /**
     * Custom properties, e.g. `--accent-color`
     */
    [customProperty: `--${string}`]: string | number | null | undefined;
}

export declare const data: ComponentInstance;

export declare const datalist: ComponentInstance;

export declare const dd: ComponentInstance;

export declare const decorator: ComponentInstance;

export declare const del: ComponentInstance;

/**
 * Delays the execution of the event callback
 *
 * @param amount Delay in milliseconds
 */
declare function delay(amount: number): EventModifier;

export declare const details: ComponentInstance;

export declare const dfn: ComponentInstance;

export declare const dialog: ComponentInstance;

declare interface Disposable_2 {
    /**
     * Tears down watchers and component instances. `removeDom` is false when
     * an ancestor element is removed anyway, which saves a DOM call per node.
     */
    destroy: (removeDom: boolean) => void;
}

export declare const div: ComponentInstance;

export declare const dl: ComponentInstance;

export declare const dt: ComponentInstance;

/**
 * A ref or a getter function resolving to any renderable value. Whenever it
 * changes only that part of the tree is patched.
 */
declare type DynamicChild<PropsType extends object = any> = Ref<any> | (() => ComponentChildren<PropsType>);

declare const El: Record<"object" | "a" | "abbr" | "address" | "applet" | "article" | "aside" | "audio" | "b" | "basefont" | "bdi" | "bdo" | "bgsound" | "blink" | "blockquote" | "body" | "button" | "canvas" | "caption" | "cite" | "code" | "colgroup" | "content" | "data" | "datalist" | "dd" | "decorator" | "del" | "details" | "dfn" | "dialog" | "div" | "dl" | "dt" | "element" | "em" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "html" | "i" | "iframe" | "ins" | "isindex" | "kbd" | "keygen" | "label" | "legend" | "li" | "listing" | "main" | "map" | "mark" | "menu" | "meter" | "nav" | "noscript" | "ol" | "optgroup" | "output" | "p" | "picture" | "pre" | "progress" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "script" | "section" | "select" | "shadow" | "small" | "spacer" | "span" | "strong" | "style" | "sub" | "summary" | "sup" | "table" | "tbody" | "td" | "template" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "u" | "ul" | "var" | "video", ComponentInstance> & Record<"area" | "base" | "br" | "col" | "embed" | "hr" | "link" | "meta" | "source" | "track" | "wbr", <PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>() => VoidComponent<PropsType, EventsType>> & {
    fragment: typeof fragment;
    input: typeof input;
    textarea: typeof textarea;
    option: typeof option;
    img: typeof img;
};

export declare const element: ComponentInstance;

export declare const em: ComponentInstance;

export declare const embed: <PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>() => VoidComponent<PropsType, EventsType>;

/**
 * Arguments of `.emit()`. The payload is required when the event declares a
 * payload type, optional otherwise.
 */
declare type EmitArgs<EventsType, K> = unknown extends EventPayload<EventsType, K> ? [payload?: unknown, options?: CustomEventInit] : undefined extends EventPayload<EventsType, K> ? [payload?: EventPayload<EventsType, K>, options?: CustomEventInit] : [payload: EventPayload<EventsType, K>, options?: CustomEventInit];

export declare interface EventConfig {
    options?: AddEventListenerOptions;
    modifiers?: EventModifier[];
}

/**
 * Event names accepted by `.emit()`. When no events are declared any string is
 * allowed, otherwise only the declared names.
 */
declare type EventKey<EventsType> = keyof EventsType extends never ? (string & {}) : (keyof EventsType & string);

/**
 * Runs before the listener. Returning `false` (or a promise of `false`)
 * cancels the listener.
 */
export declare type EventModifier = (evt: Event, state: EventModifierState) => boolean | Promise<boolean>;

export declare interface EventModifierState {
    executedTimes: number;
    lastCall: number;
}

/**
 * Payload type of a custom event. `unknown` when the event was not declared.
 */
declare type EventPayload<EventsType, K> = K extends keyof EventsType ? EventsType[K] : unknown;

/**
 * Map of custom event names to the payload they carry. Passed as the second
 * type argument of a component to get typed `.emit()` and `.on()` calls.
 *
 * ```ts
 * const Row = reusable<Props, { remove: { id: number } }>('li', (ctx) => { ... })
 * ```
 */
export declare type EventsMap = Record<string, any>;

/**
 * Returns `fallback` when the output is empty (`''`, `null`, `undefined` or `NaN`)
 */
declare function fallback<T>(fallbackValue: T): ModelTransform<any, any>;

export declare const fieldset: ComponentInstance;

export declare const figcaption: ComponentInstance;

export declare const figure: ComponentInstance;

/**
 * Immediately applies every pending structural update instead of waiting for
 * the microtask. Mostly useful in tests or when measuring the DOM right after
 * a mutation.
 */
export declare function flushSync(): void;

export declare const footer: ComponentInstance;

export declare const form: ComponentInstance;

export declare interface ForOptions<Item, Second> {
    /**
     * Returns a unique key for an item. Faster than `.key()` on the rendered
     * component because the callback only has to run for new items.
     *
     * Receives `(item, index)` for arrays and `(value, key, index)` for
     * objects.
     */
    key?: (item: Item, second: Second, index: number) => Key;
}

/**
 * Fragment does not have any DOM element associated with it. All of its
 * children are rendered into the fragment's parent element.
 */
export declare class Fragment<PropsType extends object = Record<string, any>> extends Component<PropsType, any> {
    $start: Comment;
    $end: Comment;
    constructor(children?: ComponentChildren<PropsType>);
    get $childrenDetached(): boolean;
    $destroy(removeDom?: boolean): void;
    if(_expr: MaybeRefOrGetter<any>): this;
}

/**
 * Fragment is not inserted into the DOM. Its children are appended to
 * fragment's parent element. Any methods which require DOM element to be
 * present will not work.
 *
 * @param children {ComponentChildren}
 */
export declare function fragment<PropsType extends object = Record<string, any>>(children?: ComponentChildren<PropsType>, ...rest: ComponentChildrenItems<PropsType>[]): Fragment<PropsType>;

declare type GenericCallback = () => void;

/**
 * Returns the associated component instance, if the element has one. The
 * returned instance does not have its props typed, so the props of the expected
 * instance can be provided.
 *
 * @param el HTMLElement
 * @returns Component | null
 */
export declare function getInstance<PropsType extends object>(el: HTMLElement | Element): Component<PropsType, any> | null;

export declare const h1: ComponentInstance;

export declare const h2: ComponentInstance;

export declare const h3: ComponentInstance;

export declare const h4: ComponentInstance;

export declare const h5: ComponentInstance;

export declare const h6: ComponentInstance;

export declare const head: ComponentInstance;

export declare const header: ComponentInstance;

export declare const hgroup: ComponentInstance;

export declare const hr: <PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>() => VoidComponent<PropsType, EventsType>;

export declare const html: ComponentInstance;

/**
 * Every tag has a factory function. The list is the single source of truth,
 * the `HtmlTags` / `HtmlVoidtags` types are derived from it, so a tag can not
 * end up in the type without also having a runtime factory.
 */
declare const htmlNormalTags: readonly ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "shadow", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "var", "video"];

export declare type HtmlTags = typeof htmlNormalTags[number];

export declare type HtmlVoidtags = typeof htmlVoidTags[number] | 'img';

declare const htmlVoidTags: readonly ["area", "base", "br", "col", "embed", "hr", "link", "meta", "source", "track", "wbr"];

export declare const i: ComponentInstance;

export declare const iframe: ComponentInstance;

export declare function img<PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>(src?: MaybeRefOrGetter<string>): ImgElement<PropsType, EventsType>;

export declare class ImgElement<PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents> extends VoidComponent<PropsType, EventsType> {
    el: HTMLImageElement;
    constructor();
    src(value: MaybeRefOrGetter<string>): this;
    alt(value: MaybeRefOrGetter<string>): this;
    /**
     * `lazy` defers loading until the image is near the viewport
     */
    loading(value: MaybeRefOrGetter<'lazy' | 'eager'>): this;
}

export declare function input<PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>(type?: InputType): InputElement<HTMLInputElement, PropsType, EventsType>;

export declare class InputElement<T extends HTMLInputElement | HTMLTextAreaElement, PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents> extends VoidComponent<PropsType, EventsType> {
    el: T;
    constructor(el: T, type?: InputType);
    type(type: InputType): this;
    value(value: MaybeRefOrGetter<Primitive>): this;
    placeholder(value: MaybeRefOrGetter<string | undefined>): this;
    name(value: MaybeRefOrGetter<string | undefined>): this;
    required(value?: MaybeRefOrGetter<boolean>): this;
    /**
     * Checked state of checkbox and radio inputs. For two way binding use
     * `.model()`.
     */
    checked(value?: MaybeRefOrGetter<boolean>): this;
    min(value: MaybeRefOrGetter<Primitive>): this;
    max(value: MaybeRefOrGetter<Primitive>): this;
    step(value: MaybeRefOrGetter<Primitive>): this;
    autofocus(value?: MaybeRefOrGetter<boolean>): this;
}

declare type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

export declare const ins: ComponentInstance;

export declare const isindex: ComponentInstance;

export declare const kbd: ComponentInstance;

/**
 * Identifies an item inside a `.for()` loop or a reactive children list. See
 * `Component.key()`.
 */
export declare type Key = string | number | bigint | symbol;

export declare const keygen: ComponentInstance;

export declare interface KeyInputOptions {
    /**
     * `some` triggers the listener when any of the provided keys is pressed.
     * `every` (default) only triggers when all keys have been pressed in that
     * exact sequence.
     */
    detect?: 'some' | 'every';
}

export declare const label: ComponentInstance;

export declare const legend: ComponentInstance;

export declare const li: ComponentInstance;

export declare const link: <PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>() => VoidComponent<PropsType, EventsType>;

/**
 * Every event name `.on()` accepts: native DOM events plus the declared
 * custom events. Undeclared custom events are still accepted as any string.
 */
declare type ListenableEvent<EventsType> = keyof HTMLElementEventMap | EventKey<EventsType> | (string & {});

/**
 * Listener parameters are bivariant on purpose, so a listener on a component
 * without declared events can still annotate the payload it expects:
 * `ctx.on('remove', (e, payload: { id: number }) => ...)`.
 */
declare type Listener<EventsType, K> = {
    bivarianceHack(event: ListenerEvent<EventsType, K>, payload: EventPayload<EventsType, K>): void;
}['bivarianceHack'];

/**
 * The event object a listener receives. Native events are typed by their
 * name, custom events are `CustomEvent<Payload>`.
 */
declare type ListenerEvent<EventsType, K> = K extends keyof HTMLElementEventMap ? HTMLElementEventMap[K] : CustomEvent<EventPayload<EventsType, K>>;

export declare const listing: ComponentInstance;

export declare const main: ComponentInstance;

export declare const map: ComponentInstance;

export declare const mark: ComponentInstance;

export declare const menu: ComponentInstance;

export declare const meta: <PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>() => VoidComponent<PropsType, EventsType>;

export declare const meter: ComponentInstance;

export declare interface ModelOptions {
    /**
     * Listen to `change` instead of `input`
     */
    lazy?: boolean;
    /**
     * Wait for the given amount of milliseconds after the last input before
     * updating the ref
     */
    debounce?: number;
    /**
     * Transform the value coming from an input element.
     *
     * ```ts
     * ctx.model(value, {
     *    transforms: [
     *      // If you write a number inside `<input type="text">` it'll be
     *      // returned as a string. Eg.: "1234". Using a Number transform
     *      // your reactive variable will receive an actual number type
     *      Transform.number,
     *      // You can also define your own transforms. You can pipe multiple
     *      // transforms in a row and each will receive the output of the
     *      // previous one
     *      (value: number) => value / 2
     *    ]
     * })
     * ```
     */
    transforms?: ModelTransform[];
    eventOptions?: AddEventListenerOptions;
}

export declare type ModelTransform<In = any, Out = any> = (value: In) => Out;

export declare type ModelValue = Primitive | Primitive[];

export declare const Modifier: {
    /**
     * Executes event callback if the provided expression passes.
     *
     * @param expression Ref<boolean> | boolean
     * @returns EventModifier
     */
    readonly if: (expression: boolean | Ref<boolean> | (() => boolean)) => EventModifier;
    readonly throttle: typeof throttle;
    readonly once: EventModifier;
    readonly stop: EventModifier;
    readonly stopImmediate: EventModifier;
    readonly prevent: EventModifier;
    readonly cancel: EventModifier;
    readonly delay: typeof delay;
    readonly self: EventModifier;
};

/**
 * `onMount` callbacks can return a cleanup function, which runs on destroy.
 */
declare type MountCallback = () => unknown;

export declare const nav: ComponentInstance;

/**
 * Structural updates (lists, reactive children) are batched into a microtask.
 * Await `nextTick()` to read the DOM after it has been patched.
 *
 * ```ts
 * items.value.push('new')
 * await nextTick()
 * // DOM is up to date
 * ```
 */
export declare function nextTick<T = void>(callback?: () => T): Promise<T | void>;

/**
 * Default for components which don't declare any custom events.
 */
export declare type NoEvents = Record<never, never>;

export declare const noscript: ComponentInstance;

export declare const object: ComponentInstance;

export declare const ol: ComponentInstance;

export declare const optgroup: ComponentInstance;

export declare function option<PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>(label?: MaybeRefOrGetter<Primitive>, value?: MaybeRefOrGetter<Primitive>): Option_2<PropsType, EventsType>;

declare class Option_2<PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents> extends VoidComponent<PropsType, EventsType> {
    el: HTMLOptionElement;
    constructor(label?: MaybeRefOrGetter<Primitive>, value?: MaybeRefOrGetter<Primitive>);
    value(inputValue: MaybeRefOrGetter<Primitive>): this;
    /**
     * Marks the option as selected. Pass a ref or getter to control it
     * reactively.
     */
    selected(value?: MaybeRefOrGetter<boolean>): this;
}
export { Option_2 as Option }

export declare const output: ComponentInstance;

export declare const p: ComponentInstance;

export declare const picture: ComponentInstance;

export declare const pre: ComponentInstance;

export declare const progress: ComponentInstance;

export declare const q: ComponentInstance;

/**
 * Replaces every match of `pattern` with `replacement`
 */
declare function replace(pattern: string | RegExp, replacement: string): ModelTransform<string, string>;

/**
 * Defines a component which can be used multiple times. Every call creates a
 * new instance with its own setup scope.
 *
 * ```ts
 * interface Props { title: string }
 * interface Events { close: { reason: string } }
 *
 * const Dialog = reusable<Props, Events>('dialog', (ctx, props) => {
 *   ctx.nest(
 *     h1(() => props.title),
 *     button('Close').click(() => ctx.emit('close', { reason: 'button' })),
 *     ctx.children,
 *   )
 * })
 *
 * Dialog(p('Body')).props({ title: 'Hi' }).on('close', (e, { reason }) => ...)
 * ```
 */
export declare function reusable<PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>(el: keyof typeof El, setupFn: SetupArguments<PropsType, EventsType>): ReusableComponent<PropsType, EventsType>;

export declare type ReusableComponent<PropsType extends object, EventsType extends EventsMap = NoEvents> = (children?: ComponentChildren<PropsType>, ...rest: ComponentChildrenItems<PropsType>[]) => Component<PropsType, EventsType>;

export declare const rp: ComponentInstance;

export declare const rt: ComponentInstance;

export declare const ruby: ComponentInstance;

export declare const s: ComponentInstance;

export declare const samp: ComponentInstance;

export declare const script: ComponentInstance;

export declare const section: ComponentInstance;

export declare const select: ComponentInstance;

export declare type SetupArguments<PropsType extends object, EventsType extends EventsMap = NoEvents> = (componentInstance: Component<PropsType, EventsType>, props: PropsType) => void;

export declare const shadow: ComponentInstance;

export declare const small: ComponentInstance;

export declare const source: <PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>() => VoidComponent<PropsType, EventsType>;

export declare const spacer: ComponentInstance;

export declare const span: ComponentInstance;

declare type StaticChild<PropsType extends object = any> = ChildPrimitive | Component<PropsType, any> | Fragment<PropsType> | Node;

export declare const strong: ComponentInstance;

export declare const style: ComponentInstance;

export declare type StyleValue = string | number | null | undefined;

export declare const sub: ComponentInstance;

export declare const summary: ComponentInstance;

export declare const sup: ComponentInstance;

export declare const table: ComponentInstance;

export declare const tbody: ComponentInstance;

export declare const td: ComponentInstance;

export declare const template: ComponentInstance;

export declare function textarea<PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>(): InputElement<HTMLTextAreaElement, PropsType, EventsType>;

export declare const tfoot: ComponentInstance;

export declare const th: ComponentInstance;

export declare const thead: ComponentInstance;

/**
 * Throttle the execution of the event callback based on the provided delay amount
 *
 * @param amount Delay in milliseconds
 * @returns EventModifier
 */
declare function throttle(amount: number): EventModifier;

export declare const time: ComponentInstance;

export declare const title: ComponentInstance;

export declare const tr: ComponentInstance;

export declare const track: <PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>() => VoidComponent<PropsType, EventsType>;

export declare const Transform: {
    readonly trim: ModelTransform<string, string>;
    readonly number: ModelTransform<string, number>;
    readonly integer: ModelTransform<string, number>;
    readonly uppercase: ModelTransform<string, string>;
    readonly lowercase: ModelTransform<string, string>;
    readonly truncate: typeof truncate;
    readonly capitalize: ModelTransform<string, string>;
    readonly capitalizeAll: ModelTransform<string, string>;
    readonly clamp: typeof clamp;
    readonly replace: typeof replace;
    readonly fallback: typeof fallback;
};

/**
 * Truncates the output at the given length
 */
declare function truncate(length: number): ModelTransform<string, string>;

export declare const u: ComponentInstance;

export declare const ul: ComponentInstance;

/**
 * Resolves the value type of a `MaybeRefOrGetter`.
 */
declare type Unwrapped<T> = T extends Ref<infer V> ? V : T extends () => infer V ? V : T;

export declare const varElement: ComponentInstance;

export declare const video: ComponentInstance;

declare type VisibilityCallback = (visible: boolean) => void;

/**
 * Void components are those which can not contain any child components. The
 * implementation is the same as normal elements, except it is not possible to
 * provide any child elements.
 */
export declare class VoidComponent<PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents> extends Component<PropsType, EventsType> {
    constructor(el: HTMLElement);
    $setComponentChildren(_value: ComponentChildren<PropsType>): void;
}

export declare const wbr: <PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>() => VoidComponent<PropsType, EventsType>;

export { }
