import type { Component } from '../component'

// export function setAttribute(el: HTMLElement, key: string | Record<string, Primitive>, value: Primitive) {
//   if (isObject(key)) {
//     Object.entries(key).forEach(([k, v]) => {
//       setAttribute(el, k, v)
//     })
//     return
//   }

//   if (!value) {
//     el.setAttribute(key, '')
//   }
//   else if (typeof value === 'boolean') {
//     if (value)
//       el.setAttribute(key, '')
//     else
//       el.removeAttribute(key)
//   }
//   else {
//     el.setAttribute(key, String(value))
//   }
// }

export function attributes(this: Component) {
  return this
}

export function attribute(this: Component) {
  // attr(key: string | Record<string, Primitive>, value?: Primitive) {
  //   // No value means we are setting a boolean attribute
  //   setAttribute(this.el, key, value)

  //   return this
  // }

  return this
}
