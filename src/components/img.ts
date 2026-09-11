import type { MaybeRefOrGetter } from '@vue/reactivity'
import type { EventsMap, NoEvents } from '../types'
import { VoidComponent } from '../component'
import { bindProp } from '../property-method'

export class ImgElement<PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents> extends VoidComponent<PropsType, EventsType> {
  declare el: HTMLImageElement

  constructor() {
    super(document.createElement('img'))
  }

  src(value: MaybeRefOrGetter<string>) {
    bindProp.call(this, 'src', value)
    return this
  }

  alt(value: MaybeRefOrGetter<string>) {
    bindProp.call(this, 'alt', value)
    return this
  }

  /**
   * `lazy` defers loading until the image is near the viewport
   */
  loading(value: MaybeRefOrGetter<'lazy' | 'eager'>) {
    bindProp.call(this, 'loading', value)
    return this
  }
}

export function img<PropsType extends object = Record<string, any>, EventsType extends EventsMap = NoEvents>(src?: MaybeRefOrGetter<string>) {
  const component = new ImgElement<PropsType, EventsType>()
  if (src)
    component.src(src)

  return component
}
