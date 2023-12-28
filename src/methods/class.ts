import { watch } from '@vue-reactivity/watch'
import type { Component } from '../component'
import { isArray, isFunction, isObject } from '../util'

// This will serialize vue-like class object/arrays into a string
// So that the little cry-baby react can consume it uwu
export type ClassObject = Record<string, boolean>
export type ClassNames = string | ClassObject | Array<string | ClassObject> | undefined

// TODO
// class("name", boolean | Ref<boolean>)

export function class_impl(this: Component, classNames: ClassNames | (() => ClassNames)) {
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

  const processClass = (results: ClassNames) => {
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

  if (isFunction(classNames)) {
    const release = watch(classNames, val => processClass(val), {
      immediate: true,
      deep: true,
    })

    this.onDestroy(release)
  }
  else {
    processClass(classNames)
  }

  return this
}
