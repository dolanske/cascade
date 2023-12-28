import type { Primitive, Ref } from '@vue/reactivity'
import type { Component } from '../component'

type ModelTransform<T = string> = (value: string) => T

// Transforms
export const NUMBER: ModelTransform<number> = (val: string) => {
  return Number(val)
}

interface ModelOptions {
  lazy?: boolean
  transforms?: ModelTransform[]
}

function applyTransforms(value: string, transforms?: ModelTransform[]) {
  if (!transforms || transforms.length === 0)
    return value

  return transforms.reduce((input, transform) => {
    return transform(input)
  }, value)
}

// Pass a ref in and have it updated based on the value
// This also work as a two way binding.
export function model(this: Component, defaultRef: Ref<Primitive>, options: ModelOptions = {}) {
  this.onMount(() => {
    // let root = this.el

    switch (this.el.tagName) {
      case 'INPUT':
      case 'TEXTAREA': {
        const root = this.el as HTMLInputElement | HTMLTextAreaElement

        root.value = String(defaultRef.value)

        switch (root.type) {
          case 'checkbox': {
            break
          }

          case 'radio': {
            break
          }

          default: {
            // @value inputs
            root.addEventListener(options.lazy ? 'change' : 'input', (event) => {
              let newValue = (event.target as HTMLInputElement).value
              newValue = applyTransforms(newValue, options.transforms)
              defaultRef.value = newValue
            })

            break
          }
        }
        break
      }

      // case 'SELECT': {
      //   const root = this.el as HTMLSelectElement

      //   break
      // }

      // case 'DETAILS': {
      //   const root = this.el as HTMLDetailsElement

      //   break
      // }
    }
  })

  return this
}
