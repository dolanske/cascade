import { El } from './factory'
import { getInstance } from './util'
import { Component } from './component'
import type { ComponentChildren as Children } from './types'
import { reusable } from './reusable'

export {
  El,
  reusable,
  getInstance,
  Component,
  Children,
}

// const Name = reusable('span', (ctx, props) => {
//   ctx.text(props.name + props.index)
// })

// const App = El.ul().setup((ctx) => {
//   const names = [
//     'Adam',
//     'Kilmanio',
//     'Jan',
//     'Andrew',
//   ]

//   ctx.for(names, (name, index) => {
//     return El.li(Name().props({ name, index }))
//   })
// })

// App.mount('#app')
