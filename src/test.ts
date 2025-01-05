import { ref } from '@vue/reactivity'
import { div, fragment, reusable } from '.'

const Comp = reusable('button', (ctx, props) => {
  ctx.text('Click me')
  ctx.click(() => {
    ctx.emit('seeProps', props)
  })
})

// Cascade playground
const App = div().setup((ctx) => {
  // TODO: maybe event bus?
  // ctx.on('bro', (e) => {
  //   console.log(e.detail)
  // })
  const r = ref('hello World')
  ctx.nest(
    fragment(
      Comp().model(r),
      Comp().model(r),
      Comp().model(r),
      Comp().model(r),
    ),
  )
})

// App.on('seeProps', (e, data) => {
//   console.log(data)
// })

App.mount('#app')
