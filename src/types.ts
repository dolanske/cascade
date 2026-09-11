import type { Ref } from '@vue/reactivity'
import type { Properties, PropertiesHyphen } from 'csstype'
import type { Component, Fragment } from './component'

export type { HtmlTags, HtmlVoidtags } from './tags'

export type CustomTags = 'fragment'

/**
 * Identifies an item inside a `.for()` loop or a reactive children list. See
 * `Component.key()`.
 */
export type Key = string | number | bigint | symbol

/**
 * Map of custom event names to the payload they carry. Passed as the second
 * type argument of a component to get typed `.emit()` and `.on()` calls.
 *
 * ```ts
 * const Row = reusable<Props, { remove: { id: number } }>('li', (ctx) => { ... })
 * ```
 */
export type EventsMap = Record<string, any>
/**
 * Default for components which don't declare any custom events.
 */
export type NoEvents = Record<never, never>

/**
 * Event names accepted by `.emit()`. When no events are declared any string is
 * allowed, otherwise only the declared names.
 */
export type EventKey<EventsType> = keyof EventsType extends never
  ? (string & {})
  : (keyof EventsType & string)

/**
 * Payload type of a custom event. `unknown` when the event was not declared.
 */
export type EventPayload<EventsType, K> = K extends keyof EventsType ? EventsType[K] : unknown

/**
 * Every event name `.on()` accepts: native DOM events plus the declared
 * custom events. Undeclared custom events are still accepted as any string.
 */
export type ListenableEvent<EventsType> = keyof HTMLElementEventMap | EventKey<EventsType> | (string & {})

/**
 * The event object a listener receives. Native events are typed by their
 * name, custom events are `CustomEvent<Payload>`.
 */
export type ListenerEvent<EventsType, K> = K extends keyof HTMLElementEventMap
  ? HTMLElementEventMap[K]
  : CustomEvent<EventPayload<EventsType, K>>

/**
 * Listener parameters are bivariant on purpose, so a listener on a component
 * without declared events can still annotate the payload it expects:
 * `ctx.on('remove', (e, payload: { id: number }) => ...)`.
 */
export type Listener<EventsType, K> = {
  // eslint-disable-next-line ts/method-signature-style
  bivarianceHack(event: ListenerEvent<EventsType, K>, payload: EventPayload<EventsType, K>): void
}['bivarianceHack']

/**
 * Values which render as text, plus the ones which render nothing at all
 * (`null`, `undefined`, booleans), so `condition && span('hi')` works.
 */
export type ChildPrimitive = string | number | bigint | boolean | null | undefined

export type StaticChild<PropsType extends object = any> =
  | ChildPrimitive
  | Component<PropsType, any>
  | Fragment<PropsType>
  | Node

/**
 * A ref or a getter function resolving to any renderable value. Whenever it
 * changes only that part of the tree is patched.
 */
export type DynamicChild<PropsType extends object = any> =
  | Ref<any>
  | (() => ComponentChildren<PropsType>)

export type ComponentChildrenItems<PropsType extends object = any> =
  | StaticChild<PropsType>
  | DynamicChild<PropsType>
  | ComponentChildrenItems<PropsType>[]

export type ComponentChildren<PropsType extends object = any> =
  | ComponentChildrenItems<PropsType>
  | ComponentChildrenItems<PropsType>[]

export type ComponentInstance = <PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>(
  children?: ComponentChildren<PropsType>,
  ...rest: ComponentChildrenItems<PropsType>[]
) => Component<PropsType, EventsType>

export type ValueOf<T> = T[keyof T]
export interface CSSStyle extends Properties, PropertiesHyphen { }
export type GenericCallbackWithThis<PropsType extends object> = (this: Component<PropsType, any>) => void
export type GenericCallback = () => void
/**
 * `onMount` callbacks can return a cleanup function, which runs on destroy.
 */
export type MountCallback = () => void | GenericCallback
export type VisibilityCallback = (visible: boolean) => void

export type SetupArguments<PropsType extends object, EventsType extends EventsMap = NoEvents>
  = (componentInstance: Component<PropsType, EventsType>, props: PropsType) => void

/**
 * Resolves the value type of a `MaybeRefOrGetter`.
 */
export type Unwrapped<T> = T extends Ref<infer V>
  ? V
  : T extends () => infer V
    ? V
    : T
