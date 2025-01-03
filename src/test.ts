import type { Children } from '.'
import { a, div, reusable } from '.'

const Comp = reusable('button', (ctx) => {
  ctx.text('Click me')
  ctx.click(() => {
    ctx.emit('bro', { test: 'hiiii' }, {
      bubbles: true,
    })
  })
})

// Cascade playground
const App = div().setup((ctx) => {
  ctx.nest(
    Comp(),
  )
})

App.mount('#app')

App.on('bro', (event) => {
  console.log(2, event.detail)
})x 
