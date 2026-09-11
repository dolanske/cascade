/**
 * Renders a few thousand rows of nested components and prints timings for
 * common list operations. Run with `BENCH=1 npx vitest run tests/perf.test.ts`.
 */

import { ref } from '@vue/reactivity'
import { describe, it } from 'vitest'
import { button, input, li, nextTick, reusable, span, ul } from '../src/index'

interface Item {
  id: number
  label: string
  done: boolean
}

function createItems(count: number, offset = 0): Item[] {
  return Array.from({ length: count }, (_, i) => ({ id: offset + i, label: `Item ${offset + i}`, done: i % 3 === 0 }))
}

type Mode = 'unkeyed' | 'key()' | 'key option'

async function run(mode: Mode, count: number) {
  const root = document.createElement('div')
  root.id = 'bench'
  document.body.appendChild(root)

  const Row = reusable<{ item: Item }>('li', (ctx, props) => {
    ctx.class({ done: () => props.item.done })
    ctx.nest(
      input('checkbox'),
      span(() => props.item.label),
      button('x').if(() => !props.item.done),
      ul().for(() => [props.item.id, props.item.id + 1], n => li(n)),
    )
  })

  const items = ref<Item[]>(createItems(count))
  const results: Record<string, number> = {}

  const measure = async (label: string, action: () => void) => {
    const start = performance.now()
    action()
    await nextTick()
    results[label] = performance.now() - start
  }

  await measure('initial render', () => {
    const list = ul()
    if (mode === 'key option')
      list.for(items, item => Row().props({ item }), { key: item => item.id })
    else
      list.for(items, item => mode === 'key()' ? Row().props({ item }).key(item.id) : Row().props({ item }))
    list.mount('#bench')
  })
  await measure('push 1', () => items.value.push(...createItems(1, count)))
  await measure('push 100', () => items.value.push(...createItems(100, count + 1)))
  await measure('update 1 label', () => items.value[10].label = 'changed')
  await measure('toggle 1 done', () => items.value[10].done = !items.value[10].done)
  await measure('remove first', () => items.value.shift())
  await measure('reverse', () => items.value.reverse())
  await measure('clear', () => items.value = [])

  root.remove()
  console.log(`\n${mode} (${count} rows)`)
  for (const [label, ms] of Object.entries(results))
    console.log(`  ${label.padEnd(16)} ${ms.toFixed(1).padStart(9)} ms`)
}

describe.skipIf(!process.env.BENCH)('performance', () => {
  it('list operations', async () => {
    const count = Number(process.env.BENCH_N ?? 3000)
    console.log('\nEach row is a reusable component with a nested .for() and .if()')
    await run('unkeyed', count)
    await run('key()', count)
    await run('key option', count)
  }, 600_000)
})
