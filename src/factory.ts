import type { ComponentChildren, ComponentChildrenItems, ComponentInstance, EventsMap, HtmlTags, HtmlVoidtags, NoEvents } from './types'
import { Component, fragment, VoidComponent } from './component'
import { img } from './components/img'
import { input, textarea } from './components/input'
import { option } from './components/select'
import { htmlNormalTags, htmlVoidTags } from './tags'

export { htmlNormalTags, htmlVoidTags }

// Create all elements with possible child elements
export const htmlNormalElFactory = htmlNormalTags.reduce((group, type) => {
  group[type] = <PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>(children: ComponentChildren<PropsType> = [], ...rest: ComponentChildrenItems<PropsType>[]): Component<PropsType, EventsType> => {
    const inst = new Component<PropsType, EventsType>(document.createElement(type))
    inst.$setComponentChildren([children, ...rest])
    inst.children = inst.componentChildren
    return inst
  }
  return group
}, {} as Record<HtmlTags, ComponentInstance>)

// All elements which can not have any child nodes (void elements)
export const htmlVoidElFactory = htmlVoidTags.reduce((group, type) => {
  group[type] = <PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>() => {
    return new VoidComponent<PropsType, EventsType>(document.createElement(type))
  }
  return group
}, {} as Record<Exclude<HtmlVoidtags, 'img'>, <PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>() => VoidComponent<PropsType, EventsType>>)

// Merge all native elements and also custom elements into a single `El` object
export const El = Object.assign(htmlNormalElFactory, htmlVoidElFactory, {
  fragment,
  input,
  textarea,
  option,
  img,
})
