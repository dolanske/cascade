import { ref } from '@vue/reactivity'
import { El } from './factory'
import { getInstance } from './util'
import { Component } from './component'
import type { ComponentChildren as Children } from './types'

export {
  El,
  getInstance,
  Component,
  Children,
}

const text = ref('hello')

const el = El.div().setup((ctx) => {
  ctx.text(text)
})

el.mount('#app')

text.value = 'cum'

const cloned = el.clone()
text.value = 'hhihihi'

el.destroy()

cloned.mount('#app2')

// requestAnimationFrame(() => {
// })
