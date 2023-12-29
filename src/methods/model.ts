import type { Primitive, Ref } from '@vue/reactivity'
import { watch } from '@vue-reactivity/watch'
import type { Component } from '../component'
import { isArray } from '../util'

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

function setCheckboxValue(defaultRef: Ref<Primitive | Primitive[]>, value: Primitive, checked: boolean) {
  if (isArray(defaultRef.value)) {
    if (defaultRef.value.includes(value))
      defaultRef.value.splice(defaultRef.value.indexOf(value), 1)
    else
      defaultRef.value.push(value)
  }
  else {
    if (checked)
      defaultRef.value = value
    else
      defaultRef.value = null
  }
}

function setDefaultCheckboxVaule(defaultRef: Ref<Primitive | Primitive[]>, node: HTMLInputElement) {
  // If no model value is provided and element contains checked, assign default value
  if ((!defaultRef.value || (isArray(defaultRef.value) && defaultRef.value.length === 0)) && node.hasAttribute('checked')) {
    setCheckboxValue(defaultRef, node.value, true)
    node.removeAttribute('checked')
  }
}

// Pass a ref in and have it updated based on the value
// This also work as a two way binding.
export function model(this: Component, defaultRef: Ref<Primitive | Primitive[]>, options: ModelOptions = {}) {
  this.onMount(() => {
    switch (this.el.tagName) {
      case 'INPUT':
      case 'TEXTAREA': {
        switch ((this.el as HTMLInputElement | HTMLTextAreaElement).type) {
          case 'checkbox': {
            const root = this.el as HTMLInputElement

            /**
             * With checkbox, there are multiple cases
             *  - no value:       we toggle checked state as a boolean
             *  - value:          we toggle checked state as its value
             *  - array no value: nothing, array of random booleans makes no sense
             *  - array values:   push / splice out if checked or not
             */

            // If no model value is provided and element contains checked, assign default value
            setDefaultCheckboxVaule(defaultRef, root)

            // Update the UI based on change in the ref from outside the component
            const release = watch(defaultRef, (value) => {
              if (value === root.value || (isArray(value) && value.includes(root.value)))
                root.checked = true
              else
                root.checked = false
            }, { deep: true, immediate: true })
            this.onDestroy(release)

            // Listen for changes in the UI element
            root.addEventListener('change', (event) => {
              const { checked, value } = event.target as HTMLInputElement
              setCheckboxValue(defaultRef, value, checked)
            })

            break
          }

          case 'radio': {
            const root = this.el as HTMLInputElement

            // If no model value is provided and element contains checked, assign default value
            setDefaultCheckboxVaule(defaultRef, root)

            // Update the UI based on change in the ref from outside the component
            const release = watch(defaultRef, (value) => {
              root.checked = value === root.value
            }, { deep: true, immediate: true })
            this.onDestroy(release)

            // Listen for changes in the UI element
            root.addEventListener('change', (event) => {
              const { value, checked } = event.target as HTMLInputElement
              if (checked)
                defaultRef.value = value
            })

            break
          }

          default: {
            const root = this.el as HTMLInputElement | HTMLTextAreaElement
            root.value = String(defaultRef.value)

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
