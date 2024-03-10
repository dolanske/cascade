import { watch } from '@vue-reactivity/watch'
import { type Ref, isRef } from '@vue/reactivity'
import type { Component } from '../component'
import { WATCH_CONF, isArray, isNil, isObject } from '../util'

export type ClassObject = Record<string, boolean | Ref<boolean>>
export type ClassNames = string | ClassObject

export function class_impl(this: Component, classNames?: ClassNames, value?: boolean | Ref<boolean>) {
  if (isObject(classNames) && !isNil(value))
    throw new TypeError('Cannot use object notation with second argument.')

  let prevString = ''
  const prevObj: Record<number, string | null> = Object.create(null)

  const assignObjectClasses = (parsed: ClassObject) => {
    for (const key of Object.keys(parsed)) {
      if (parsed[key])
        this.el.classList.add(key)
      else
        this.el.classList.remove(key)
    }
  }

  const processClassAssignment = (results: ClassNames) => {
    if (!results)
      return

    if (typeof results === 'string') {
      if (prevString)
        this.el.classList.remove(prevString)

      prevString = results
      this.el.classList.add(prevString)
    }
    else if (isArray(results)) {
      const len = results.length
      for (let i = 0; i < len; i++) {
        const result = results[i]

        if (!result) {
          const prevResult = prevObj[i]

          if (prevResult) {
            this.el.classList.remove(prevResult)
            prevObj[i] = null
          }
        }
        else if (typeof result === 'string') {
          this.el.classList.add(result)
          prevObj[i] = result
        }
        else if (isObject(results)) {
          assignObjectClasses(result)
        }
      }
    }
    else if (isObject(results)) {
      assignObjectClasses(results)
    }
  }

  const checkPrimitive = (classNames: string, value?: boolean | Ref<boolean>) => {
    if (isRef(value)) {
      this.onDestroy(watch(value, (result) => {
        processClassAssignment({ [classNames]: result })
      }, WATCH_CONF))
    }
    else if (classNames && !!value) {
      processClassAssignment(classNames)
    }
  }

  const checkObject = (classNames: ClassObject) => {
    for (const [key, value] of Object.entries(classNames))
      checkPrimitive(key, value)
  }

  // Extract any Refs within object of classes
  if (isObject(classNames))
    checkObject(classNames)

  else if (typeof classNames === 'string')
    checkPrimitive(classNames, value)

  return this
}
