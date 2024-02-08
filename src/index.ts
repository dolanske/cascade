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

// TODO
// This is happening because each time a reactive watch/watcheffect method is
// registered, it is not re-run after re-mounting the compoennt. The watcher is
// set when the component is created. Not mounted

// FIXME
// The fix is to collect all of the methods and store them in an array. And run
// them each time a component is mounted.

// Could the fix be to wrap every watcher with onInit() ?

const text = ref('hello')

const el = El.div().setup((ctx) => {
  ctx.text(text)
})

el.mount('#app')

text.value = 'cum'

const cloned = el.clone()

el.destroy()

cloned.mount('#app')

console.log('H')
text.value = 'hhihihi'

// el.mount('#app')
