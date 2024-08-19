import type { MaybeRefOrGetter } from '@vue/reactivity'
import { VoidComponent } from '../component'
import { registerWatchedProp } from '../property-method'

export class ImgElement extends VoidComponent {
  el: HTMLImageElement

  constructor(el: HTMLImageElement) {
    super('img')
    this.el = el
  }

  src(value: MaybeRefOrGetter<string>) {
    registerWatchedProp.call(this, 'src', value)
    return this
  }

  alt(value: MaybeRefOrGetter<string>) {
    registerWatchedProp.call(this, 'alt', value)
    return this
  }
}

export function img(src: string) {
  const el = document.createElement('img')
  const component = new ImgElement(el)
  if (src)
    component.src(src)

  return component
}
