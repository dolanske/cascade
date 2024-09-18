import type { Primitive, Ref } from '@vue/reactivity'
import type { Component } from '../component'
import { watch } from '@vue/reactivity'
import { capitalizeString, isArray } from '../util'

export type ModelTransform<Returns = string> = (value: string) => Returns

//////////////////////////////
// Transforms

/**
 * Convert the output to a number
 */
const number: ModelTransform<number> = (val: string) => {
  return Number(val)
}

/**
 * Remove leading and trailing spaces from the output
 */

const trim: ModelTransform = (val: string) => {
  return val.trim()
}

/**
 * Uppercase the output
 */
const uppercase: ModelTransform = (val: string) => {
  return val.toString().toUpperCase()
}

/**
 * Lowercase the output
 */
const lowercase: ModelTransform = (val: string) => {
  return val.toString().toUpperCase()
}

/**
 * Capitalize each word
 */
function capitalizeAll(val: string) {
  return val.split('\\s+').map(word => capitalizeString(word)).join('\\s+')
}

/**
 * Capitalize the first word
 */
const capitalize = (val: string) => capitalizeString(val)

/**
 * Truncates the output at the given length
 */
function truncate(length: number) {
  return (val: string) => {
    return val.substring(0, length)
  }
}

export const Transform = {
  trim,
  number,
  uppercase,
  lowercase,
  truncate,
  capitalize,
  capitalizeAll,
} as const

//////////////////////////////
// Implementation
export interface ModelOptions {
  /**
   * Determine if event listeners use `change` or `input`
   */
  lazy?: boolean
  /**
   *
   * Transform the value coming from an input element.
   *
   * ```ts
   * ctx.model(value, {
   *    transforms: [
   *      // If you write a number inside `<input type="text">` it'll be
   *      // returned as a string. Eg.: "1234". Using a Number transform
   *      // your reactive variable will receive an actual number type
   *      Transform.number,
   *      // You can also define your own transforms. You can pipe multiple
   *      // transforms in a row and each will receive the output of the
   *      // previous one
   *      (value: number) => value / 2
   *    ]
   * })
   * ```
   */
  transforms?: ModelTransform[]
  eventOptions?: EventListenerOptions
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
export function model<PropsType extends object>(this: Component<PropsType>, defaultRef: Ref<Primitive | Primitive[]>, options: ModelOptions = {}) {
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

            // Update the UI based on change in the ref from outside the component
            const release = watch(defaultRef, (value) => {
              if (value === root.value || (isArray(value) && value.includes(root.value)))
                root.checked = true
              else
                root.checked = false
            }, { deep: true })
            this.onDestroy(release)

            // Listen for changes in the UI element
            root.addEventListener('change', (event) => {
              const { checked, value } = event.target as HTMLInputElement
              setCheckboxValue(defaultRef, value, checked)
            }, options.eventOptions)

            // If no model value is provided and element contains checked, assign default value
            setDefaultCheckboxVaule(defaultRef, root)

            break
          }

          case 'radio': {
            const root = this.el as HTMLInputElement

            // Update the UI based on change in the ref from outside the component
            const release = watch(defaultRef, (value) => {
              root.checked = value === root.value
            }, { deep: true })
            this.onDestroy(release)

            // Listen for changes in the UI element
            root.addEventListener('change', (event) => {
              const { value, checked } = event.target as HTMLInputElement
              if (checked)
                defaultRef.value = value
            }, options.eventOptions)

            // If no model value is provided and element contains checked, assign default value
            setDefaultCheckboxVaule(defaultRef, root)

            break
          }

          default: {
            const root = this.el as HTMLInputElement | HTMLTextAreaElement

            // Watch for changes from the ref
            const release = watch(defaultRef, (value) => {
              root.value = String(value)
            }, { deep: true })
            this.onDestroy(release)

            // Watch for changes from UI
            root.addEventListener(options.lazy ? 'change' : 'input', (event) => {
              let newValue = (event.target as HTMLInputElement).value
              newValue = applyTransforms(newValue, options.transforms)
              defaultRef.value = newValue
            }, options.eventOptions)

            // Default value
            root.value = String(defaultRef.value ?? '')

            break
          }
        }

        break
      }

      case 'SELECT': {
        const root = this.el as HTMLSelectElement

        // Watch for outside changes to the ref
        const release = watch(defaultRef, (value) => {
          defaultRef.value = value
        }, { deep: true })
        this.onDestroy(release)

        // Watch for changes from the UI
        root.addEventListener('change', (event) => {
          let newValue = (event.target as HTMLSelectElement).value
          newValue = applyTransforms(newValue, options.transforms)
          defaultRef.value = newValue
        }, options.eventOptions)

        // Initial assignment of the default value
        const defaultValue = isArray(defaultRef.value) ? defaultRef.value[0] : defaultRef.value
        if (defaultValue) {
          root.value = defaultValue.toString()
        }
        else if (root.childElementCount > 0) {
          const hasSelected = Array.from(root.children).find(c => c.hasAttribute('selected'))

          if (hasSelected) {
            hasSelected.removeAttribute('selected')
            const newValue = (hasSelected as HTMLOptionElement).value
            defaultRef.value = newValue
            root.value = newValue
          }
        }

        break
      }

      case 'DETAILS': {
        const root = this.el as HTMLDetailsElement

        // Watch for outside changes to the ref
        const release = watch(defaultRef, (value) => {
          root.open = Boolean(value)
        }, { deep: true })
        this.onDestroy(release)

        // Watch for changes from the UI
        root.addEventListener('toggle', () => {
          defaultRef.value = root.open
        }, options.eventOptions)

        // Initial assignment of the default value
        const isOpen = isArray(defaultRef.value) ? defaultRef.value[0] : defaultRef.value
        root.open = Boolean(isOpen)

        break
      }
    }
  })

  return this
}
