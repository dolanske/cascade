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

const Name = El.span().setup((ctx, props) => {
  ctx.text(props.name)
})

const App = El.ul().setup((ctx) => {
  const names = [
    'Adam',
    'Kilmanio',
    'Jan',
    'Andrew',
  ]

  ctx.nest(El.li().for(names, (ctx, { value }) => {
    ctx.nest(Name.prop('name', value))
  }))
})

App.mount('#app')
