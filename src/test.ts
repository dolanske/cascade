import { ref } from '@vue/reactivity'
import { button, div } from '.'

// const CompA = reusable('h1', (ctx) => {
//   ctx.text('FIRST')
// })

// const CompB = reusable('h5', (ctx) => {
//   ctx.text('S E C O N D')
// })

// Cascade playground
const App = div().setup((ctx) => {
  const child = ref('Ahoj')

  ctx.nest(
    button('Toggle').on('click', () => {
      child.value = child.value === 'Ahoj' ? 'Goodbye' : 'Ahoj'
      console.log(child.value)
    }),
    child,
  )
})

App.mount('#app')
