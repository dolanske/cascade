import type { Children } from '.'
import { a, div } from '.'

export function Link(href: string, children: Children<any>) {
  return a(children).setup((ctx) => {
    ctx.attr('href', href)
    ctx.click(() => {})
  })
}

function Comp() {
  return div<{ text: string }>().setup((ctx, props) => {
    ctx.nest(
      Link('#hihihi', props.text),
    )
  })
}

// Cascade playground
const App = div().setup((ctx) => {
  // ctx.for({
  //   A: 1,
  //   B: 2,
  //   C: 3,
  // }, (value, key, index) => {
  //   return Comp().prop('text', key + value + index)
  // })

  ctx.for(10, (index) => {
    return Comp().prop('text', String(index))
  })
})

App.mount('#app')
