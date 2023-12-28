import type { Component } from '../component'

export function style(this: Component) {
  // style(key: keyof CSSStyle | CSSStyle, value?: string | number | boolean) {
  //   if (typeof key === 'string' && value) {
  //     // We are adding just key x value style pair
  //     this.el.style.setProperty(key, String(value))
  //   }
  //   else {
  //     // Working with object
  //     Object.assign(this.el.style, key)
  //   }

  //   return this
  // }

  return this
}
