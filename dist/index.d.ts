import { EffectScope } from '@vue/reactivity';
import { MaybeRefOrGetter } from '@vue/reactivity';
import { Primitive } from '@vue/reactivity';
import { Properties } from 'csstype';
import { PropertiesHyphen } from 'csstype';
import { Ref } from '@vue/reactivity';
import { UnwrapRef } from '@vue/reactivity';

export declare const a: ComponentInstance;

export declare const abbr: ComponentInstance;

export declare const address: ComponentInstance;

export declare const applet: ComponentInstance;

export declare const area: <PropsType extends object>() => VoidComponent<PropsType>;

export declare const article: ComponentInstance;

export declare const aside: ComponentInstance;

declare function attr<PropsType extends object>(this: Component<PropsType>, key: string, value?: MaybeRefOrGetter<Primitive>): Component<PropsType>;

declare type Attributes = Record<string, Primitive>;

declare function attrs<PropsType extends object>(this: Component<PropsType>, attrData: MaybeRefOrGetter<Attributes>): Component<PropsType>;

export declare const audio: ComponentInstance;

export declare const b: ComponentInstance;

export declare const base: <PropsType extends object>() => VoidComponent<PropsType>;

export declare const basefont: ComponentInstance;

export declare const bdi: ComponentInstance;

export declare const bdo: ComponentInstance;

export declare const bgsound: ComponentInstance;

export declare const blink: ComponentInstance;

export declare const blockquote: ComponentInstance;

declare function blur_2<PropsType extends object>(this: Component<PropsType>, listener: CascadeEvent, options?: EventConfig): Component<PropsType>;

export declare const body: ComponentInstance;

export declare const br: <PropsType extends object>() => VoidComponent<PropsType>;

export declare const button: ComponentInstance;

declare type CallbackType<T, _> = T extends number ? (index: number) => ComponentChildrenItems<any> : T extends any[] ? (value: T[number], index: number) => ComponentChildrenItems<any> : T extends object ? (value: T[keyof T], key: string, index: number) => ComponentChildrenItems<any> : unknown;

export declare const canvas: ComponentInstance;

/**
 * Capitalize each word
 */
declare function capitalizeAll(val: string): string;

export declare const caption: ComponentInstance;

declare type CascadeEvent = (e: Event | CustomEvent, data?: unknown) => void;

declare function change<PropsType extends object>(this: Component<PropsType>, listener: CascadeEvent, options?: EventConfig): Component<PropsType>;

export declare type Children<PropsType extends object> = ComponentChildrenItems<PropsType> | ComponentChildrenItems<PropsType>[];

export declare const cite: ComponentInstance;

declare function class_impl<PropsType extends object>(this: Component<PropsType>, classNames?: ClassnameOrCLassObject, value?: MaybeRefOrGetter<boolean>): Component<PropsType>;

declare type ClassnameOrCLassObject = string | ClassObject;

declare type ClassObject = Record<string, MaybeRefOrGetter<boolean>>;

declare function click<PropsType extends object>(this: Component<PropsType>, listener: CascadeEvent, options?: EventConfig): Component<PropsType>;

export declare const code: ComponentInstance;

export declare const col: <PropsType extends object>() => VoidComponent<PropsType>;

export declare const colgroup: ComponentInstance;

export declare class Component<PropsType extends object> {
    /**
     * Set `textContent` of the current component.
     */
    text: typeof text;
    /**
     * Set `innerHTML` of the current component.
     */
    html: typeof html_2;
    /**
     * Add an event listener to the current component.
     *
     * @param on {keyof HTMLElementEventMap} Event name
     * @param listener {EventListenerOrEventListenerObject} Function which runs on event trigger
     * @param options {EventListenerOptions | undefined} Optional event configuration
     *
     */
    on: typeof on;
    /**
     * Shorthand for binding `on("click")` event listener to the current component.
     */
    click: typeof click;
    /**
     * Shorthand for binding `on("submit")` event listener to the current component.
     */
    submit: typeof submit;
    /**
     * Shorthand for binding `on("focus")` event listener to the current component.
     */
    focus: typeof focus_2;
    /**
     * Shorthand for binding `on("blur")` event listener to the current component.
     */
    blur: typeof blur_2;
    /**
     * Shorthand for binding `on("change")` event listener to the current component.
     */
    change: typeof change;
    /**
     * Shorthand for binding `on("input")` event listener to the current component.
     */
    input: typeof input_2;
    /**
     * Shorthand for binding `on("keydown")` event listener to the current component.
     */
    keydown: typeof keydown;
    /**
     * Shorthand for binding `on("keydown")` event listener to the current
     * component and listening for specific keys to be pressed down.
     *
     * ```
     * Component.keydownExact(["Shift", "T"], () => ...)
     * ```
     */
    keydownExact: typeof keydownExact;
    /**
     * Shorthand for binding `on("keyup")` event listener to the current component.
     */
    keyup: typeof keyup;
    /**
     * Shorthand for binding `on("keyup")` event listener to the current
     * component and listening for specific keys to be released.
     *
     * ```
     * Component.keyupExact(["Shift", "T"], () => ...)
     * ```
     */
    keyupExact: typeof keyupExact;
    /**
     * Shorthand for binding `on("keypress")` event listener to the current component.
     */
    keypress: typeof keypress;
    /**
     * Shorthand for binding `on("keypress")` event listener to the current
     * component and listening for specific keys to be pressed.
     *
     * ```
     * Component.keypressExact(["Shift", "T"], () => ...)
     * ```
     */
    keypressExact: typeof keypressExact;
    /**
     * Bind reactive class object to the current component.
     */
    class: typeof class_impl;
    /**
     * Simple helper which allows you to insert component's children anywhere in
     * the chain. This was made mainly because it feels less natural to add
     * children to a component and only then use methods like `if` or `for` on it.
     */
    nest: typeof nest;
    /**
     * Two way binding of a reactive variable to the inputs / selects value.
     */
    model: typeof model;
    /**
     * Bind attribute object to the component.
     */
    attrs: typeof attrs;
    /**
     * Bind a single attribute to the component.
     */
    attr: typeof attr;
    /**
     * Dynamically bind a `disabled` attribute to the component.
     */
    disabled: typeof disabled;
    /**
     * Dynamically bind an `id` attribute to the component.
     */
    id: typeof id;
    /**
     * Toggle between showing or hiding the current component. the component is still
     * rendered, but has `display: none` applied to it.
     *
     * This function also preserves the previously added inline styles.
     */
    show: typeof show;
    /**
     * Add reactive styling object to the current component.
     */
    style: typeof style_2;
    /**
     * Conditionally render a component.
     */
    if: typeof if_impl;
    identifier: string;
    /**
     * Stores reference to the mounted DOM Element of the current component.
     */
    el: HTMLElement;
    /**
     * Stores child component instances.
     */
    componentChildren: Children<PropsType>;
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
    children: Children<PropsType>;
    /**
     * Stores the reference to the parent Component instance, if it has one.
     */
    parent: Component<any> | null;
    /**
     * If true, the component can not have any child components
     */
    isVoid: boolean;
    __onMountCbs: GenericCallback[];
    __onDestroyCbs: GenericCallback[];
    __onInitCbs: GenericCallback[];
    __scopes: Set<SetupArguments<PropsType>>;
    __runningScopes: Set<EffectScope>;
    __componentProps: PropsType;
    constructor(el: HTMLElement, props?: PropsType);
    __setComponentChildren(value: Children<PropsType>): void;
    __runOnMount(): void;
    __runOnDestroy(): void;
    __runOnInit(): void;
    __rerunSetup(): void;
    __closeScopes(): void;
    /**
     * Executes provided callback function when the component is initialized.
     * Before being rendered in the DOM.
     *
     * @param callback {function}
     */
    onInit(callback: GenericCallback): void;
    /**
     * Executes provided callback function when the component is mounted in the
     * DOM.
     *
     * @param callback {function}
     */
    onMount(callback: GenericCallback): void;
    /**
     *
     * @param callback executes provided callback function when the component is
     * removed from the DOM.
     */
    onDestroy(callback: GenericCallback): void;
    /**
     * Mounts the current element in the DOM. Usually, you would use this function
     * either in the root App component, or a single component, if you're simply
     * adding small reactive __scopes into an otherwise static site.
     *
     * @param selector {string} Default: "body" element
     */
    mount(selector?: string): void;
    /**
     * Removes component from the DOM, deactivates its instance and removes all reactive scopes.
     */
    destroy(): void;
    /**
     * Clones the component. All reactive variables, DOM child nodes and chained
     * functions should work. Cloning does not reassign the component back to the
     * DOM, so it must be re-inserted.
     *
     * @returns Cloned component
     */
    clone(): Component<PropsType>;
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
    for: typeof for_impl;
    /**
     * Pass a single prop value into the component. You can also pass in refs, but
     * make sure to use the `.value` in the components, as these refs are directly
     * passed through.
     *
     * @param key {string}
     * @param value {any}
     */
    prop<Key extends keyof PropsType>(key: Key, value: PropsType[Key]): this;
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
    setup(setupFn: SetupArguments<PropsType>): this;
    emit: typeof emit;
}

declare type ComponentChildrenItems<PropsType extends object> = string | number | Component<PropsType> | Element | Fragment<PropsType> | MaybeRefOrGetter<string | number | Component<PropsType>>;

declare type ComponentInstance = <PropsType extends object>(children?: Children<PropsType>) => Component<PropsType>;

export declare const content: ComponentInstance;

export declare function createId(limited?: boolean): string;

declare interface CSSStyle extends Properties, PropertiesHyphen {
}

export declare const data: ComponentInstance;

export declare const datalist: ComponentInstance;

export declare const dd: ComponentInstance;

export declare const decorator: ComponentInstance;

export declare const del: ComponentInstance;

declare function delay(amount: number): EventModifier;

export declare const details: ComponentInstance;

export declare const dfn: ComponentInstance;

declare function disabled<PropsType extends object>(this: Component<PropsType>, value?: MaybeRefOrGetter<boolean>): Component<PropsType>;

export declare const div: ComponentInstance;

export declare const dl: ComponentInstance;

export declare const dt: ComponentInstance;

declare const El: Record<HtmlTags, ComponentInstance> & Record<HtmlVoidtags, <PropsType extends object>() => VoidComponent<PropsType>> & {
    fragment: typeof fragment;
    input: typeof input;
    textarea: typeof textarea;
    option: typeof option;
    img: typeof img;
};

export declare const element: ComponentInstance;

export declare const em: ComponentInstance;

export declare const embed: <PropsType extends object>() => VoidComponent<PropsType>;

declare function emit<PropsType extends object>(this: Component<PropsType>, eventName: string, data: unknown, options?: CustomEventInit): Component<PropsType>;

declare interface EventConfig {
    options?: EventListenerOptions;
    modifiers?: EventModifier[];
}

export declare type EventModifier = (evt: Event, state: EventModifierState) => boolean | Promise<boolean>;

declare interface EventModifierState {
    executedTimes: number;
    lastCall: number;
}

export declare const fieldset: ComponentInstance;

export declare const figcaption: ComponentInstance;

export declare const figure: ComponentInstance;

declare function focus_2<PropsType extends object>(this: Component<PropsType>, listener: CascadeEvent, options?: EventConfig): Component<PropsType>;

export declare const footer: ComponentInstance;

declare function for_impl<T extends MaybeRefOrGetter<object>, PropsType extends object>(this: Component<PropsType>, source: T, callback: CallbackType<UnwrapRef<T>, any>): any;

declare function for_impl<T extends MaybeRefOrGetter<any[]>, PropsType extends object>(this: Component<PropsType>, source: T, callback: CallbackType<UnwrapRef<T>, any>): any;

declare function for_impl<PropsType extends object>(this: Component<PropsType>, source: MaybeRefOrGetter<number>, callback: CallbackType<number, any>): any;

export declare const form: ComponentInstance;

/**
 * Fragment does not have any DOM element associated within it. All of its children
 * are appended to fragment's parent element.
 */
declare class Fragment<PropsType extends object> extends Component<PropsType> {
    constructor(children?: Children<PropsType>);
    mount(selector: string): void;
}

/**
 * Fragment is not inserted into the DOM. Its children are appended to
 * fragment's parent element. Any methods which require DOM element to be
 * present will not work.
 *
 * @param children {ComponentChildren}
 */
export declare function fragment<PropsType extends object>(children?: Children<PropsType>, ...rest: ComponentChildrenItems<PropsType>[]): Fragment<PropsType>;

declare type GenericCallback = () => void;

/**
 * Returns the associated component instnace, if the element has one. The
 * returned instance does not have its props typed, so the pros of the expected
 * instance can be provided.
 *
 * @param el HTMLElement
 * @returns Component | null
 */
export declare function getInstance<PropsType extends object>(el: HTMLElement | Element): Component<PropsType> | null;

export declare const h1: ComponentInstance;

export declare const h2: ComponentInstance;

export declare const h3: ComponentInstance;

export declare const h4: ComponentInstance;

export declare const h5: ComponentInstance;

export declare const h6: ComponentInstance;

export declare const head: ComponentInstance;

export declare const header: ComponentInstance;

export declare const hgroup: ComponentInstance;

export declare const hr: <PropsType extends object>() => VoidComponent<PropsType>;

export declare const html: ComponentInstance;

declare function html_2<PropsType extends object>(this: Component<PropsType>, value: MaybeRefOrGetter<string>): Component<PropsType>;

declare type HtmlTags = 'a' | 'abbr' | 'address' | 'applet' | 'article' | 'aside' | 'audio' | 'b' | 'basefont' | 'bdi' | 'bdo' | 'bgsound' | 'blink' | 'blockquote' | 'body' | 'button' | 'canvas' | 'caption' | 'cite' | 'code' | 'colgroup' | 'content' | 'data' | 'datalist' | 'dd' | 'decorator' | 'del' | 'details' | 'dfn' | 'div' | 'dl' | 'dt' | 'element' | 'em' | 'fieldset' | 'figcaption' | 'figure' | 'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'head' | 'header' | 'hgroup' | 'html' | 'i' | 'iframe' | 'ins' | 'isindex' | 'kbd' | 'keygen' | 'label' | 'legend' | 'li' | 'listing' | 'main' | 'map' | 'mark' | 'menu' | 'meter' | 'nav' | 'noscript' | 'object' | 'ol' | 'optgroup' | 'output' | 'p' | 'picture' | 'pre' | 'progress' | 'q' | 'rp' | 'rt' | 'ruby' | 's' | 'samp' | 'script' | 'section' | 'select' | 'shadow' | 'small' | 'spacer' | 'span' | 'strong' | 'style' | 'sub' | 'summary' | 'sup' | 'table' | 'tbody' | 'td' | 'template' | 'tfoot' | 'th' | 'thead' | 'time' | 'title' | 'tr' | 'u' | 'ul' | 'var' | 'video';

declare type HtmlVoidtags = 'area' | 'base' | 'br' | 'col' | 'embed' | 'hr' | 'img' | 'link' | 'meta' | 'source' | 'track' | 'wbr';

export declare const i: ComponentInstance;

declare function id<PropsType extends object>(this: Component<PropsType>, value: MaybeRefOrGetter<Primitive>): Component<PropsType>;

declare function if_impl<PropsType extends object>(this: Component<PropsType>, expr: MaybeRefOrGetter): Component<PropsType>;

export declare const iframe: ComponentInstance;

export declare function img<PropsType extends object>(src: string): ImgElement<PropsType>;

declare class ImgElement<PropsType extends object> extends VoidComponent<PropsType> {
    el: HTMLImageElement;
    constructor(el: HTMLImageElement);
    src(value: MaybeRefOrGetter<string>): this;
    alt(value: MaybeRefOrGetter<string>): this;
}

export declare function input<PropsType extends object>(type?: InputType): InputElement<HTMLInputElement, PropsType>;

declare function input_2<PropsType extends object>(this: Component<PropsType>, listener: CascadeEvent, options?: EventConfig): Component<PropsType>;

declare class InputElement<T extends HTMLInputElement | HTMLTextAreaElement, PropsType extends object> extends VoidComponent<PropsType> {
    el: T;
    constructor(el: T, type?: InputType);
    type(type: InputType): void;
    value(value: MaybeRefOrGetter<Primitive>): this;
    placeholder(value: MaybeRefOrGetter<string | undefined>): this;
    name(value: MaybeRefOrGetter<string | undefined>): this;
    required(value: MaybeRefOrGetter<boolean>): this;
}

declare type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

export declare const ins: ComponentInstance;

export declare const isindex: ComponentInstance;

export declare const kbd: ComponentInstance;

declare function keydown<PropsType extends object>(this: Component<PropsType>, listener: CascadeEvent, options?: EventConfig): Component<PropsType>;

declare function keydownExact<PropsType extends object>(this: Component<PropsType>, requiredKeyOrKeys: string | string[], listener: CascadeEvent, options?: EventConfig & KeyInputOptions): Component<PropsType>;

export declare const keygen: ComponentInstance;

declare interface KeyInputOptions {
    detect?: 'some' | 'every';
}

declare function keypress<PropsType extends object>(this: Component<PropsType>, listener: CascadeEvent, options?: EventConfig): Component<PropsType>;

declare function keypressExact<PropsType extends object>(this: Component<PropsType>, requiredKeyOrKeys: string | string[], listener: CascadeEvent, options?: EventConfig & KeyInputOptions): Component<PropsType>;

declare function keyup<PropsType extends object>(this: Component<PropsType>, listener: CascadeEvent, options?: EventConfig): Component<PropsType>;

declare function keyupExact<PropsType extends object>(this: Component<PropsType>, requiredKeyOrKeys: string | string[], listener: CascadeEvent, options?: EventConfig & KeyInputOptions): Component<PropsType>;

export declare const label: ComponentInstance;

export declare const legend: ComponentInstance;

export declare const li: ComponentInstance;

declare type LimitedPrimitive = string | number;

export declare const link: <PropsType extends object>() => VoidComponent<PropsType>;

export declare const listing: ComponentInstance;

export declare const main: ComponentInstance;

export declare const map: ComponentInstance;

export declare const mark: ComponentInstance;

export declare const menu: ComponentInstance;

export declare const meta: <PropsType extends object>() => VoidComponent<PropsType>;

export declare const meter: ComponentInstance;

declare function model<PropsType extends object>(this: Component<PropsType>, defaultRef: Ref<Primitive | Primitive[]>, options?: ModelOptions): Component<PropsType>;

declare interface ModelOptions {
    /**
     * Determine if event listeners use `change` or `input`
     */
    lazy?: boolean;
    /**
     *
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
    eventOptions?: EventListenerOptions;
}

export declare type ModelTransform<Returns = string> = (value: string) => Returns;

export declare const Modifier: {
    /**
     * Executes event callback if the provided expression passes.
     *
     * @param expression Ref<boolean> | boolean
     * @returns EventModifier
     */
    readonly if: (expression: boolean | Ref<boolean>) => EventModifier;
    readonly throttle: typeof throttle;
    readonly once: EventModifier;
    readonly stop: EventModifier;
    readonly stopImmediate: EventModifier;
    readonly prevent: EventModifier;
    readonly cancel: EventModifier;
    readonly delay: typeof delay;
};

export declare const nav: ComponentInstance;

declare function nest<PropsType extends object>(this: Component<PropsType>, children: Children<any>, ...rest: ComponentChildrenItems<any>[]): Component<PropsType>;

export declare const noscript: ComponentInstance;

export declare const object: ComponentInstance;

export declare const ol: ComponentInstance;

declare function on<PropsType extends object>(this: Component<PropsType>, type: keyof HTMLElementEventMap | (string & {}), listener: CascadeEvent, config?: EventConfig): Component<PropsType>;

export declare const optgroup: ComponentInstance;

export declare function option<PropsType extends object>(label?: string, value?: MaybeRefOrGetter<Primitive>): Option_2<PropsType>;

declare class Option_2<PropsType extends object> extends VoidComponent<PropsType> {
    el: HTMLOptionElement;
    constructor(label?: string, value?: MaybeRefOrGetter<Primitive>);
    value(inputValue: MaybeRefOrGetter<Primitive>): this;
    selected(): this;
}

export declare const output: ComponentInstance;

export declare const p: ComponentInstance;

export declare const picture: ComponentInstance;

export declare const pre: ComponentInstance;

export declare const progress: ComponentInstance;

export declare const q: ComponentInstance;

export declare function reusable<PropsType extends object>(el: keyof typeof El, setupFn: SetupArguments<PropsType>): ReusableComponent<PropsType>;

declare type ReusableComponent<PropsType extends object> = (children?: Children<PropsType>, ...rest: ComponentChildrenItems<PropsType>[]) => Component<PropsType>;

export declare const rp: ComponentInstance;

export declare const rt: ComponentInstance;

export declare const ruby: ComponentInstance;

export declare const s: ComponentInstance;

export declare const samp: ComponentInstance;

export declare const script: ComponentInstance;

export declare const section: ComponentInstance;

export declare const select: ComponentInstance;

declare type SetupArguments<PropsType extends object> = (componentInstance: Component<PropsType>, props: PropsType) => void;

export declare const shadow: ComponentInstance;

declare function show(this: Component<any>, defaultValue: MaybeRefOrGetter): Component<any>;

export declare const small: ComponentInstance;

export declare const source: <PropsType extends object>() => VoidComponent<PropsType>;

export declare const spacer: ComponentInstance;

export declare const span: ComponentInstance;

export declare const strong: ComponentInstance;

export declare const style: ComponentInstance;

declare function style_2(this: Component<any>, key: keyof CSSStyle | CSSStyle | MaybeRefOrGetter<CSSStyle>, value?: MaybeRefOrGetter<LimitedPrimitive>): Component<any>;

export declare const sub: ComponentInstance;

declare function submit<PropsType extends object>(this: Component<PropsType>, listener: CascadeEvent, options?: EventConfig): Component<PropsType>;

export declare const summary: ComponentInstance;

export declare const sup: ComponentInstance;

export declare const table: ComponentInstance;

export declare const tbody: ComponentInstance;

export declare const td: ComponentInstance;

export declare const template: ComponentInstance;

declare function text<PropsType extends object>(this: Component<PropsType>, value: MaybeRefOrGetter<Primitive>): Component<PropsType>;

export declare function textarea<PropsType extends object>(): InputElement<HTMLTextAreaElement, PropsType>;

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

export declare const track: <PropsType extends object>() => VoidComponent<PropsType>;

export declare const Transform: {
    readonly trim: ModelTransform<string>;
    readonly number: ModelTransform<number>;
    readonly uppercase: ModelTransform<string>;
    readonly lowercase: ModelTransform<string>;
    readonly truncate: typeof truncate;
    readonly capitalize: (val: string) => string;
    readonly capitalizeAll: typeof capitalizeAll;
};

/**
 * Truncates the output at the given length
 */
declare function truncate(length: number): (val: string) => string;

export declare const u: ComponentInstance;

export declare const ul: ComponentInstance;

export declare const video: ComponentInstance;

/**
 * Void components are those which can not contain any more child components. The
 * implementation is the same as normal elements, except it is not possible to
 * provide any child elements. The
 */
declare class VoidComponent<PropsType extends object> extends Component<PropsType> {
    constructor(type: HtmlVoidtags | 'option');
    __setComponentChildren(_value: Children<PropsType>): void;
}

export declare const wbr: <PropsType extends object>() => VoidComponent<PropsType>;

export { }
