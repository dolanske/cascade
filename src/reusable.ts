/**
 * This file outlines the way reusable components are defined.
 */

import type { Component } from './component'
import type { ComponentChildren, ComponentChildrenItems, EventsMap, NoEvents, SetupArguments } from './types'
import { El, htmlVoidTags } from './factory'

export type ReusableComponent<PropsType extends object, EventsType extends EventsMap = NoEvents> = (children?: ComponentChildren<PropsType>, ...rest: ComponentChildrenItems<PropsType>[]) => Component<PropsType, EventsType>

const elementsWithoutChildren: readonly string[] = [
  ...htmlVoidTags,
  'img',
  'input',
  'textarea',
  'option',
]

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
export function reusable<PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>(el: keyof typeof El, setupFn: SetupArguments<PropsType, EventsType>): ReusableComponent<PropsType, EventsType> {
  return (children: ComponentChildren<PropsType> = [], ...rest: ComponentChildrenItems<PropsType>[]) => {
    const inst = (elementsWithoutChildren.includes(el)
      ? (El[el] as () => Component<PropsType, EventsType>)()
      : (El[el] as (children: ComponentChildren<PropsType>, ...rest: ComponentChildrenItems<PropsType>[]) => Component<PropsType, EventsType>)(children, ...rest))

    inst.setup(setupFn)
    return inst
  }
}
