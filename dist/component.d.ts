import type { EffectScope } from '@vue/reactivity';
import type { ComponentChildren, GenericCallback, HtmlVoidtags } from './types';
import type { SetupArguments } from './methods/setup';
import type { CallbackType } from './methods/for';
export declare class Component {
    /**
     * Set `textContent` of the current node.
     *
     * @param text {string | () => string}
     */
    text: (value: import("./types").RefOrvalue<import("@vue/reactivity").Primitive>) => Component;
    /**
     * Set `innerHTML` of the current node.
     */
    html: (value: import("./types").RefOrvalue<string>) => Component;
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
    class: (classNames?: import("./methods/class").ClassNames | undefined, value?: boolean | import("@vue/reactivity").Ref<boolean> | undefined) => Component;
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
    nest: (children: ComponentChildren, ...rest: import("./types").ComponentChildrenItems[]) => Component;
    model: (defaultRef: import("@vue/reactivity").Ref<import("@vue/reactivity").Primitive | import("@vue/reactivity").Primitive[]>, options?: import("./methods/model").ModelOptions | undefined) => Component;
    attrs: (attrData: {
        [x: string]: import("@vue/reactivity").Primitive;
    } | import("@vue/reactivity").Ref<{
        [x: string]: import("@vue/reactivity").Primitive;
    }>) => Component;
    attr: (key: string, value?: import("@vue/reactivity").Primitive | import("@vue/reactivity").Ref<import("@vue/reactivity").Primitive>) => Component;
    /**
     * Dynamically bind a `disabled` attribute to the node.
     */
    disabled: (value?: import("./types").RefOrvalue<boolean> | undefined) => Component;
    /**
     * Dynamically bind an `id` attribute to the node.
     */
    id: (value: import("./types").RefOrvalue<import("@vue/reactivity").Primitive>) => Component;
    /**
     * Toggle between showing or hiding the current node. The node is still
     * rendered, but has `display: none` applied to it.
     *
     * This function also preserves the previously added inline styles.
     */
    show: (defaultValue: import("./types").RefOrvalue<boolean>) => Component;
    /**
     * Add reactive styling object to the current node.
     */
    style: (key: import("./types").CSSStyle | keyof import("./types").CSSStyle | import("@vue/reactivity").Ref<import("./types").CSSStyle>, value?: (string | number) | import("@vue/reactivity").Ref<string | number> | undefined) => Component;
    if: (expr: import("./methods/if").ConditionalExpr) => Component;
    clone: () => Component;
    el: HTMLElement;
    children: ComponentChildren;
    componentProps: object;
    parent: Component | null;
    onMountCbs: GenericCallback[];
    onDestroyCbs: GenericCallback[];
    onInitCbs: GenericCallback[];
    scopes: Set<SetupArguments>;
    runningScopes: Set<EffectScope>;
    __identifier: string;
    constructor(el: HTMLElement, props?: object);
    __children(value: ComponentChildren): void;
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
    for<S extends readonly any[] | number | object>(source: S, callback: CallbackType<S>): Component;
}
/**
 * Void components are those which can not contain any more child nodes. The
 * implementation is the same as normal elements, except it is not possible to
 * provide any child elements. The
 */
export declare class VoidComponent extends Component {
    constructor(type: HtmlVoidtags | 'option');
    __children(_value: ComponentChildren): void;
}
/**
 * Fragment does not have any DOM node associated within it. All of its children
 * are appended to fragment's parent node.
 */
export declare class Fragment extends Component {
    constructor(children?: ComponentChildren);
    mount(selector: string): void;
}
/**
 * Fragment is not inserted into the DOM. Its children are appended to
 * fragment's parent node. Any methods which require DOM element to be present
 * will not work.
 *
 * @param children {ComponentChildren}
 */
export declare function fragment(children?: ComponentChildren): Fragment;
