import { ref } from '@vue/reactivity'
import { button, div, reusable } from '.'

const CompA = reusable('button', (ctx) => {
  ctx.text('FIRST')
})

const CompB = reusable('button', (ctx) => {
  ctx.text('S E C O N D')
})

// Cascade playground
const App = div().setup((ctx) => {
  const child = ref(CompA)

  ctx.nest(
    child.value(),
    button('Toggle').on('click', () => {
      child.value = child.value === CompA ? CompB : CompA
    }),
  )
})

App.mount('#app')
