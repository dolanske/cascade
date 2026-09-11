import type { Primitive, Ref } from '@vue/reactivity'
import type { Component } from '../component'
import { watch } from '@vue/reactivity'
import { capitalizeString, isArray, WATCH_CONF_SHALLOW } from '../util'

export type ModelValue = Primitive | Primitive[]
export type ModelTransform<In = any, Out = any> = (value: In) => Out

//////////////////////////////
// Transforms

/**
 * Convert the output to a number
 */
const number: ModelTransform<string, number> = val => Number(val)

/**
 * Convert the output to an integer, `NaN` when the input is not numeric
 */
const integer: ModelTransform<string, number> = val => Number.parseInt(val, 10)

/**
 * Remove leading and trailing spaces from the output
 */
const trim: ModelTransform<string, string> = val => val.trim()

/**
 * Uppercase the output
 */
const uppercase: ModelTransform<string, string> = val => val.toUpperCase()

/**
 * Lowercase the output
 */
const lowercase: ModelTransform<string, string> = val => val.toLowerCase()

/**
 * Capitalize each word
 */
const capitalizeAll: ModelTransform<string, string> = val => val.replace(/(^|\s)(\S)/g, (_, space, char) => space + char.toUpperCase())

/**
 * Capitalize the first word
 */
const capitalize: ModelTransform<string, string> = val => capitalizeString(val)

/**
 * Truncates the output at the given length
 */
function truncate(length: number): ModelTransform<string, string> {
  return val => val.substring(0, length)
}

/**
 * Clamps a numeric output between `min` and `max`. Use after `Transform.number`.
 */
function clamp(min: number, max: number): ModelTransform<number, number> {
  return val => Math.min(max, Math.max(min, val))
}

/**
 * Replaces every match of `pattern` with `replacement`
 */
function replace(pattern: string | RegExp, replacement: string): ModelTransform<string, string> {
  return val => val.replace(pattern, replacement)
}

/**
 * Returns `fallback` when the output is empty (`''`, `null`, `undefined` or `NaN`)
 */
function fallback<T>(fallbackValue: T): ModelTransform<any, any> {
  return val => (val === '' || val == null || Number.isNaN(val)) ? fallbackValue : val
}

export const Transform = {
  trim,
  number,
  integer,
  uppercase,
  lowercase,
  truncate,
  capitalize,
  capitalizeAll,
  clamp,
  replace,
  fallback,
} as const

//////////////////////////////
// Implementation

export interface ModelOptions {
  /**
   * Listen to `change` instead of `input`
   */
  lazy?: boolean
  /**
   * Wait for the given amount of milliseconds after the last input before
   * updating the ref
   */
  debounce?: number
  /**
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
  eventOptions?: AddEventListenerOptions
}

function applyTransforms(value: string, transforms?: ModelTransform[]) {
  if (!transforms || transforms.length === 0)
    return value

  return transforms.reduce((input, transform) => transform(input), value as any)
}

function setCheckboxValue(model: Ref<ModelValue>, value: Primitive, checked: boolean) {
  if (isArray(model.value)) {
    const index = model.value.indexOf(value)
    if (checked && index === -1)
      model.value.push(value)
    else if (!checked && index !== -1)
      model.value.splice(index, 1)
  }
  else {
    model.value = checked ? value : null
  }
}

function setDefaultCheckboxValue(model: Ref<ModelValue>, node: HTMLInputElement) {
  // If no model value is provided and element contains checked, assign default value
  if ((!model.value || (isArray(model.value) && model.value.length === 0)) && node.hasAttribute('checked')) {
    setCheckboxValue(model, node.value, true)
    node.removeAttribute('checked')
  }
}

function debounced<T extends (...args: any[]) => void>(fn: T, wait?: number): T {
  if (!wait)
    return fn
  let timer: ReturnType<typeof setTimeout> | undefined
  return ((...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }) as T
}

// Pass a ref in and have it updated based on the value
// This also work as a two way binding.
export function model(this: Component<any, any>, model: Ref<ModelValue>, options: ModelOptions = {}) {
  const listen = (type: string, handler: (event: Event) => void) => {
    this.on(type, debounced(handler, options.debounce), { options: options.eventOptions })
  }

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
            setDefaultCheckboxValue(model, root)

            // Update the UI based on change in the ref from outside the component
            watch(model, (value) => {
              root.checked = value === root.value || (isArray(value) && value.includes(root.value))
            }, WATCH_CONF_SHALLOW)

            // Listen for changes in the UI element
            listen('change', (event) => {
              const { checked, value } = event.target as HTMLInputElement
              setCheckboxValue(model, value, checked)
            })

            break
          }

          case 'radio': {
            const root = this.el as HTMLInputElement

            setDefaultCheckboxValue(model, root)

            watch(model, (value) => {
              root.checked = value === root.value
            }, WATCH_CONF_SHALLOW)

            listen('change', (event) => {
              const { value, checked } = event.target as HTMLInputElement
              if (checked)
                model.value = value
            })

            break
          }

          default: {
            const root = this.el as HTMLInputElement | HTMLTextAreaElement

            // Watch for changes from the ref
            watch(model, (value) => {
              const next = String(value ?? '')
              // Avoid resetting the caret while the user is typing
              if (root.value !== next)
                root.value = next
            }, WATCH_CONF_SHALLOW)

            // Watch for changes from UI
            listen(options.lazy ? 'change' : 'input', (event) => {
              model.value = applyTransforms((event.target as HTMLInputElement).value, options.transforms)
            })

            break
          }
        }

        break
      }

      case 'SELECT': {
        const root = this.el as HTMLSelectElement

        // Initial assignment of the default value
        const defaultValue = isArray(model.value) ? model.value[0] : model.value
        if (defaultValue) {
          root.value = String(defaultValue)
        }
        else if (root.childElementCount > 0) {
          const preselected = Array.from(root.children).find(c => c.hasAttribute('selected'))

          if (preselected) {
            preselected.removeAttribute('selected')
            const newValue = (preselected as HTMLOptionElement).value
            model.value = newValue
            root.value = newValue
          }
        }

        // Watch for outside changes to the ref
        watch(model, (value) => {
          const next = String((isArray(value) ? value[0] : value) ?? '')
          if (root.value !== next)
            root.value = next
        }, { deep: 1 })

        // Watch for changes from the UI
        listen('change', (event) => {
          model.value = applyTransforms((event.target as HTMLSelectElement).value, options.transforms)
        })

        break
      }

      case 'DETAILS': {
        const root = this.el as HTMLDetailsElement

        watch(model, (value) => {
          root.open = Boolean(isArray(value) ? value[0] : value)
        }, WATCH_CONF_SHALLOW)

        listen('toggle', () => {
          model.value = root.open
        })

        break
      }

      // For all other components, we only pass it as a prop
      default: {
        this.prop('modelValue', model)
      }
    }
  })
}
