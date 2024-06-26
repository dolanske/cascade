import { EffectScope } from '@vue/reactivity';
import { Primitive } from '@vue/reactivity';
import type { Properties } from 'csstype';
import type { PropertiesHyphen } from 'csstype';
import { Ref } from '@vue/reactivity';
import { UnwrapRef } from '@vue/reactivity';

export declare const a: ComponentInstance;

export declare const abbr: ComponentInstance;

export declare const address: ComponentInstance;

export declare const applet: ComponentInstance;

export declare const area: () => VoidComponent;

export declare const article: ComponentInstance;

export declare const aside: ComponentInstance;

export declare const audio: ComponentInstance;

export declare const b: ComponentInstance;

export declare const base: () => VoidComponent;

export declare const basefont: ComponentInstance;

export declare const bdi: ComponentInstance;

export declare const bdo: ComponentInstance;

export declare const bgsound: ComponentInstance;

export declare const blink: ComponentInstance;

export declare const blockquote: ComponentInstance;

export declare const body: ComponentInstance;

export declare const br: () => VoidComponent;

export declare const button: ComponentInstance;

declare type CallbackType<T> = T extends any[] ? (value: T[number], index: number) => ComponentChildrenItems : T extends object ? (value: keyof T, key: string, index: number) => ComponentChildrenItems : (index: number) => ComponentChildrenItems;

export declare const canvas: ComponentInstance;

export declare const caption: ComponentInstance;

export declare type Children = ComponentChildrenItems | ComponentChildrenItems[];

export declare const cite: ComponentInstance;

declare type ClassNames = string | ClassObject;

declare type ClassObject = Record<string, boolean | Ref<boolean>>;

export declare const code: ComponentInstance;

export declare const col: () => VoidComponent;

export declare const colgroup: ComponentInstance;

export declare class Component {
    /**
     * Set `textContent` of the current node.
     *
     * @param text {string | () => string}
     */
    text: (value: RefOrValue<Primitive>) => Component;
    /**
     * Set `innerHTML` of the current node.
     */
    html: (value: RefOrValue<string>) => Component;
    /**
     * Add an event listener to the current node.
     *
     * @param on {keyof HTMLElementEventMap} Event name
     * @param listener {EventListenerOrEventListenerObject} Function which runs on event trigger
     * @param options {EventListenerOptions | undefined} Optional event configuration
     *
     */
    on: (type: keyof HTMLElementEventMap, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions | undefined) => Component;
    /**
     * Shorthand for binding `on("click")` event listener to the current node.
     */
    click: (listener: EventListenerOrEventListenerObject, options?: EventListenerOptions | undefined) => Component;
    /**
     * Bind reactive class object to the current node.
     */
    class: (classNames?: ClassNames | undefined, value?: boolean | Ref<boolean> | undefined) => Component;
    /**
     * Create a component scope, in which you can declare reactive variables. When
     * the component is removed from the DOM, all of the scope properties get
     * removed. This is the best way to declare reusable components.
     */
    setup: (setupFn: SetupArguments) => Component;
    /**
     * Pass a single prop value into the component. You can also pass in refs, but
     * make sure to use the `.value` in the components, as these refs are directly
     * passed through.
     *
     * @param propKey {string}
     * @param propValue {any}
     */
    prop: (key: string, value: any) => Component;
    /**
     * Pass an object of props into the component. You can also pass in refs, but
     * make sure to use the `.value` in the components, as these refs are directly
     * passed through.
     */
    props: (props: Record<string, any>) => Component;
    /**
     * Simple helper which allows you to insert component's children anywhere in
     * the chain. This was made mainly because it feels less natural to add
     * children to a component and only then use methods like `if` or `for` on it.
     */
    nest: (children: Children, ...rest: ComponentChildrenItems[]) => Component;
    model: (defaultRef: Ref<Primitive | Primitive[]>, options?: ModelOptions | undefined) => Component;
    attrs: (attrData: {
        [x: string]: Primitive;
    } | Ref<{
        [x: string]: Primitive;
    }>) => Component;
    attr: (key: string, value?: Primitive | Ref<Primitive>) => Component;
    /**
     * Dynamically bind a `disabled` attribute to the node.
     */
    disabled: (value?: RefOrValue<boolean> | undefined) => Component;
    /**
     * Dynamically bind an `id` attribute to the node.
     */
    id: (value: RefOrValue<Primitive>) => Component;
    /**
     * Toggle between showing or hiding the current node. The node is still
     * rendered, but has `display: none` applied to it.
     *
     * This function also preserves the previously added inline styles.
     */
    show: (defaultValue: any) => Component;
    /**
     * Add reactive styling object to the current node.
     */
    style: (key: CSSStyle | keyof CSSStyle | Ref<CSSStyle>, value?: (string | number) | Ref<string | number> | undefined) => Component;
    if: (expr: any) => Component;
    clone: () => Component;
    el: HTMLElement;
    children: Children;
    componentProps: object;
    parent: Component | null;
    onMountCbs: GenericCallback[];
    onDestroyCbs: GenericCallback[];
    onInitCbs: GenericCallback[];
    scopes: Set<SetupArguments>;
    runningScopes: Set<EffectScope>;
    __identifier: string;
    constructor(el: HTMLElement, props?: object);
    __children(value: Children): void;
    __runOnMount(): void;
    __runOnDestroy(): void;
    __runOnInit(): void;
    __rerunSetup(): void;
    __closeScopes(): void;
    /**
     * Executes provided callback function when the component is initialized.
     * Before being rendered in the dom.
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
     * adding small reactive scopes into an otherwise static site.
     *
     * @param selector {string} Default: "body" element
     */
    mount(selector?: string): void;
    destroy(): void;
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
    for<S extends readonly any[] | number | object>(source: S, callback: CallbackType<UnwrapRef<S>>): Component;
}

declare type ComponentChildrenItems = string | number | Component | Element | Fragment | Ref<string | number>;

declare type ComponentInstance = (children?: Children) => Component;

export declare const content: ComponentInstance;

export declare function createId(limited?: boolean): string;

declare interface CSSStyle extends Properties, PropertiesHyphen {
}

export declare const data: ComponentInstance;

export declare const datalist: ComponentInstance;

export declare const dd: ComponentInstance;

export declare const decorator: ComponentInstance;

export declare const del: ComponentInstance;

export declare const details: ComponentInstance;

export declare const dfn: ComponentInstance;

export declare const div: ComponentInstance;

export declare const dl: ComponentInstance;

export declare const dt: ComponentInstance;

declare const El: Record<HtmlTags, ComponentInstance> & Record<HtmlVoidtags, () => VoidComponent> & {
    fragment: typeof fragment;
    input: typeof input;
    textarea: typeof textarea;
    option: typeof option;
    img: typeof img;
};

export declare const element: ComponentInstance;

export declare const em: ComponentInstance;

export declare const embed: () => VoidComponent;

export declare const fieldset: ComponentInstance;

export declare const figcaption: ComponentInstance;

export declare const figure: ComponentInstance;

export declare const footer: ComponentInstance;

export declare const form: ComponentInstance;

/**
 * Fragment does not have any DOM node associated within it. All of its children
 * are appended to fragment's parent node.
 */
declare class Fragment extends Component {
    constructor(children?: Children);
    mount(selector: string): void;
}

/**
 * Fragment is not inserted into the DOM. Its children are appended to
 * fragment's parent node. Any methods which require DOM element to be present
 * will not work.
 *
 * @param children {ComponentChildren}
 */
export declare function fragment(children?: Children): Fragment;

declare type GenericCallback = () => void;

/**
 * Returns the associated component instnace, if the element has one
 *
 * @param el HTMLElement
 * @returns Component | null
 */
export declare function getInstance(el: HTMLElement | Element): Component | null;

export declare const h1: ComponentInstance;

export declare const h2: ComponentInstance;

export declare const h3: ComponentInstance;

export declare const h4: ComponentInstance;

export declare const h5: ComponentInstance;

export declare const h6: ComponentInstance;

export declare const head: ComponentInstance;

export declare const header: ComponentInstance;

export declare const hgroup: ComponentInstance;

export declare const hr: () => VoidComponent;

export declare const html: ComponentInstance;

declare type HtmlTags = 'a' | 'abbr' | 'address' | 'applet' | 'article' | 'aside' | 'audio' | 'b' | 'basefont' | 'bdi' | 'bdo' | 'bgsound' | 'blink' | 'blockquote' | 'body' | 'button' | 'canvas' | 'caption' | 'cite' | 'code' | 'colgroup' | 'content' | 'data' | 'datalist' | 'dd' | 'decorator' | 'del' | 'details' | 'dfn' | 'div' | 'dl' | 'dt' | 'element' | 'em' | 'fieldset' | 'figcaption' | 'figure' | 'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'head' | 'header' | 'hgroup' | 'html' | 'i' | 'iframe' | 'ins' | 'isindex' | 'kbd' | 'keygen' | 'label' | 'legend' | 'li' | 'listing' | 'main' | 'map' | 'mark' | 'menu' | 'meter' | 'nav' | 'noscript' | 'object' | 'ol' | 'optgroup' | 'output' | 'p' | 'picture' | 'pre' | 'progress' | 'q' | 'rp' | 'rt' | 'ruby' | 's' | 'samp' | 'script' | 'section' | 'select' | 'shadow' | 'small' | 'spacer' | 'span' | 'strong' | 'style' | 'sub' | 'summary' | 'sup' | 'table' | 'tbody' | 'td' | 'template' | 'tfoot' | 'th' | 'thead' | 'time' | 'title' | 'tr' | 'u' | 'ul' | 'var' | 'video';

declare type HtmlVoidtags = 'area' | 'base' | 'br' | 'col' | 'embed' | 'hr' | 'img' | 'link' | 'meta' | 'source' | 'track' | 'wbr';

export declare const i: ComponentInstance;

export declare const iframe: ComponentInstance;

export declare function img(src: string): ImgElement;

declare class ImgElement extends VoidComponent {
    el: HTMLImageElement;
    constructor(el: HTMLImageElement);
    src(value: RefOrValue<string>): this;
    alt(value: RefOrValue<string>): this;
}

export declare function input(type?: InputType): InputElement<HTMLInputElement>;

declare class InputElement<T extends HTMLInputElement | HTMLTextAreaElement> extends VoidComponent {
    el: T;
    constructor(el: T, type?: InputType);
    type(type: InputType): void;
    value(value: RefOrValue<Primitive | undefined>): this;
    placeholder(value: RefOrValue<string | undefined>): this;
    name(value: RefOrValue<Primitive | undefined>): this;
    required(value: RefOrValue<boolean>): this;
}

declare type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

export declare const ins: ComponentInstance;

export declare const isindex: ComponentInstance;

export declare const kbd: ComponentInstance;

export declare const keygen: ComponentInstance;

export declare const label: ComponentInstance;

export declare const legend: ComponentInstance;

export declare const li: ComponentInstance;

export declare const link: () => VoidComponent;

export declare const listing: ComponentInstance;

export declare const main: ComponentInstance;

export declare const map: ComponentInstance;

export declare const mark: ComponentInstance;

export declare const menu: ComponentInstance;

export declare const meta: () => VoidComponent;

export declare const meter: ComponentInstance;

declare interface ModelOptions {
    lazy?: boolean;
    transforms?: ModelTransform[];
    eventOptions?: EventListenerOptions;
}

declare type ModelTransform<T = string> = (value: string) => T;

export declare const nav: ComponentInstance;

export declare const noscript: ComponentInstance;

export declare const object: ComponentInstance;

export declare const ol: ComponentInstance;

export declare const optgroup: ComponentInstance;

export declare function option(value?: string, label?: string): Option_2;

declare class Option_2 extends VoidComponent {
    el: HTMLOptionElement;
    constructor(value?: string, label?: string);
    value(inputValue: RefOrValue<Primitive>): this;
    selected(): this;
}

export declare const output: ComponentInstance;

export declare const p: ComponentInstance;

export declare const picture: ComponentInstance;

export declare const pre: ComponentInstance;

export declare const progress: ComponentInstance;

export declare const q: ComponentInstance;

declare type RefOrValue<T> = T | Ref<T>;

export declare function reusable(el: keyof typeof El, setupFn: SetupArguments): ReusableComponent;

declare type ReusableComponent = (children?: ComponentChildrenItems) => Component;

export declare const rp: ComponentInstance;

export declare const rt: ComponentInstance;

export declare const ruby: ComponentInstance;

export declare const s: ComponentInstance;

export declare const samp: ComponentInstance;

export declare const script: ComponentInstance;

export declare const section: ComponentInstance;

export declare const select: ComponentInstance;

declare type SetupArguments = (componentInstance: Component, props: any) => void;

export declare const shadow: ComponentInstance;

export declare const small: ComponentInstance;

export declare const source: () => VoidComponent;

export declare const spacer: ComponentInstance;

export declare const span: ComponentInstance;

export declare const strong: ComponentInstance;

export declare const style: ComponentInstance;

export declare const sub: ComponentInstance;

export declare const summary: ComponentInstance;

export declare const sup: ComponentInstance;

export declare const table: ComponentInstance;

export declare const tbody: ComponentInstance;

export declare const td: ComponentInstance;

export declare const template: ComponentInstance;

export declare function textarea(): InputElement<HTMLTextAreaElement>;

export declare const tfoot: ComponentInstance;

export declare const th: ComponentInstance;

export declare const thead: ComponentInstance;

export declare const time: ComponentInstance;

export declare const title: ComponentInstance;

export declare const tr: ComponentInstance;

export declare const track: () => VoidComponent;

export declare const u: ComponentInstance;

export declare const ul: ComponentInstance;

export declare const video: ComponentInstance;

/**
 * Void components are those which can not contain any more child nodes. The
 * implementation is the same as normal elements, except it is not possible to
 * provide any child elements. The
 */
declare class VoidComponent extends Component {
    constructor(type: HtmlVoidtags | 'option');
    __children(_value: Children): void;
}

export declare const wbr: () => VoidComponent;

export { }
