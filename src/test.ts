/**
 * Development playground, served by `npm run dev`. Renders a large keyed list
 * and a few reactive children so the renderer can be profiled in a browser.
 */

import { computed, ref } from '@vue/reactivity'
import { button, div, h1, input, li, nextTick, p, reusable, span, ul } from './index'

interface Item {
  id: number
  label: string
  done: boolean
}

let nextId = 1
function createItems(count: number): Item[] {
  return Array.from({ length: count }, () => ({ id: nextId++, label: `Item ${nextId}`, done: false }))
}

const items = ref<Item[]>(createItems(1000))
const filter = ref('')
const visible = computed(() => items.value.filter(item => item.label.includes(filter.value)))
const doneCount = computed(() => items.value.filter(item => item.done).length)

const Row = reusable<{ item: Item }, { remove: { id: number } }>('li', (ctx, props) => {
  ctx.class({ done: () => props.item.done })
  ctx.nest(
    input('checkbox').checked(() => props.item.done).change(() => props.item.done = !props.item.done),
    span(() => props.item.label),
    button('×').click(() => ctx.emit('remove', { id: props.item.id })),
  )
})

async function measure(name: string, action: () => void) {
  const start = performance.now()
  action()
  await nextTick()
  console.log(`${name}: ${(performance.now() - start).toFixed(2)}ms`)
}

const app = div(
  h1('Cascade playground'),
  p(() => `${visible.value.length} of ${items.value.length} items, ${doneCount.value} done`),
  input('text').placeholder('Filter').model(filter),
  div(
    button('Add 1000').click(() => measure('add 1000', () => items.value.push(...createItems(1000)))),
    button('Prepend 1').click(() => measure('prepend', () => items.value.unshift(...createItems(1)))),
    button('Shuffle').click(() => measure('shuffle', () => items.value.sort(() => Math.random() - 0.5))),
    button('Reverse').click(() => measure('reverse', () => items.value.reverse())),
    button('Update every 10th').click(() => measure('update', () => {
      for (let i = 0; i < items.value.length; i += 10)
        items.value[i].label += ' !'
    })),
    button('Swap 2 & 998').click(() => measure('swap', () => {
      const list = items.value
      ;[list[1], list[998]] = [list[998], list[1]]
    })),
    button('Clear').click(() => measure('clear', () => items.value = [])),
  ),
  ul().for(visible, item => Row().props({ item }).key(item.id)),
).on('remove', (_, payload: { id: number }) => {
  const index = items.value.findIndex(item => item.id === payload.id)
  if (index !== -1)
    items.value.splice(index, 1)
})

const start = performance.now()
app.mount('#app')
console.log(`initial render: ${(performance.now() - start).toFixed(2)}ms`)

const list = ul().for(items, item => li(item.label).key(item.id))
list.mount('#app')
