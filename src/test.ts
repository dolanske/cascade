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

// interface Props

// Cascade playground
const App = div().setup((ctx) => {
  ctx.nest(
    Comp().prop('text', 'Hello'),
    Link('/', 'uwuw'),
  )
})

App.mount('#app')
