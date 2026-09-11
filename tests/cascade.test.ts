import { computed, reactive, ref, shallowRef } from '@vue/reactivity'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { button, dialog, div, flushSync, fragment, getInstance, input, li, Modifier, nextTick, option, p, reusable, select, span, Transform, ul, varElement as varEl } from '../src/index'

let root: HTMLElement

beforeEach(() => {
  root = document.createElement('div')
  root.id = 'app'
  document.body.appendChild(root)
})

afterEach(() => {
  document.body.innerHTML = ''
})

function texts(parent: Element) {
  return Array.from(parent.children).map(el => el.textContent)
}

//////////////////////////////

describe('rendering', () => {
  it('renders text, numbers, nested components and skips empty children', () => {
    const app = div('a', 1, null, false && span('x'), undefined, span('b'), [p('c'), 'd']).mount('#app')

    expect(app.el.childNodes.length).toBe(5)
    expect(app.el.innerHTML).toBe('a1<span>b</span><p>c</p>d')
  })

  it('renders text as text nodes, not as html', () => {
    const app = div('<b>x</b>').mount('#app')
    expect(app.el.textContent).toBe('<b>x</b>')
    expect(app.el.querySelector('b')).toBeNull()
  })

  it('renders raw DOM nodes and fragments', () => {
    const node = document.createElement('input')
    const app = div(node, fragment(span('a'), span('b'))).mount('#app')
    expect(app.el.querySelector('input')).toBe(node)
    expect(app.el.children.length).toBe(3)
    expect(texts(app.el).slice(1)).toEqual(['a', 'b'])
  })

  it('assigns parent and instance lookups', () => {
    const child = span('x')
    const app = div(fragment(child)).mount('#app')
    expect(child.parent).toBe(app)
    expect(getInstance(child.el)).toBe(child)
  })

  it('exposes factories for every tag including dialog and var', () => {
    expect(dialog().el.tagName).toBe('DIALOG')
    expect(varEl('x').el.tagName).toBe('VAR')
  })
})

describe('reactive children', () => {
  it('renders a ref as a child and updates the text node in place', async () => {
    const name = ref('a')
    const app = span(name).mount('#app')
    const node = app.el.firstChild!.nextSibling as Text

    expect(app.el.textContent).toBe('a')
    name.value = 'b'
    await nextTick()
    expect(app.el.textContent).toBe('b')
    // Same text node, updated in place
    expect(app.el.firstChild!.nextSibling).toBe(node)
  })

  it('renders computed values and getters', async () => {
    const count = ref(1)
    const double = computed(() => count.value * 2)
    const app = div(double, ' ', () => `count: ${count.value}`).mount('#app')

    expect(app.el.textContent).toBe('2 count: 1')
    count.value = 5
    await nextTick()
    expect(app.el.textContent).toBe('10 count: 5')
  })

  it('renders components returned from a getter and swaps them', async () => {
    const show = ref(true)
    const app = div(() => show.value ? span('yes') : p('no')).mount('#app')

    expect(app.el.innerHTML).toContain('<span>yes</span>')
    show.value = false
    await nextTick()
    expect(app.el.innerHTML).toContain('<p>no</p>')
    expect(app.el.querySelector('span')).toBeNull()
  })

  it('renders `cond && component` getters', async () => {
    const show = ref(false)
    const app = div(() => show.value && span('x')).mount('#app')

    expect(app.el.querySelector('span')).toBeNull()
    show.value = true
    await nextTick()
    expect(app.el.querySelector('span')).not.toBeNull()
  })

  it('renders arrays from a ref and reuses keyed components', async () => {
    const items = shallowRef([1, 2, 3])
    const app = ul(() => items.value.map(n => li(n).key(n))).mount('#app')

    const second = app.el.children[1]
    expect(texts(app.el)).toEqual(['1', '2', '3'])

    items.value = [3, 2, 4]
    await nextTick()
    expect(texts(app.el)).toEqual(['3', '2', '4'])
    // Keyed element is moved, not re-created
    expect(app.el.children[1]).toBe(second)
  })

  it('does not proxy components stored in refs', () => {
    const child = span('x')
    const list = ref([child])
    expect(list.value[0]).toBe(child)
  })

  it('destroys dynamic children together with the parent', async () => {
    const value = ref('a')
    const destroyed = vi.fn()
    const app = div(() => span(value.value).onDestroy(destroyed)).mount('#app')

    app.destroy()
    expect(destroyed).toHaveBeenCalledTimes(1)
    value.value = 'b'
    await nextTick()
    // No re-render after destroy
    expect(destroyed).toHaveBeenCalledTimes(1)
    expect(root.innerHTML).toBe('')
  })
})

describe('for', () => {
  it('renders arrays, numbers and objects', () => {
    const list = ul().for(['a', 'b'], (item, i) => li(`${i}${item}`)).mount('#app')
    expect(texts(list.el)).toEqual(['0a', '1b'])

    const nums = ul().for(3, i => li(i)).mount('#app')
    expect(texts(nums.el)).toEqual(['0', '1', '2'])

    const obj = ul().for({ x: 1, y: 2 }, (value, key, i) => li(`${key}${value}${i}`)).mount('#app')
    expect(texts(obj.el)).toEqual(['x10', 'y21'])
  })

  it('appends and removes without touching other items', async () => {
    const items = ref(['a', 'b'])
    const created = vi.fn()
    const list = ul().for(items, item => li(item).onInit(created)).mount('#app')
    const first = list.el.children[0]

    expect(created).toHaveBeenCalledTimes(2)
    items.value.push('c')
    await nextTick()
    expect(texts(list.el)).toEqual(['a', 'b', 'c'])
    expect(created).toHaveBeenCalledTimes(3)
    expect(list.el.children[0]).toBe(first)

    items.value.splice(1, 1)
    await nextTick()
    expect(texts(list.el)).toEqual(['a', 'c'])
    expect(list.el.children[0]).toBe(first)
    expect(created).toHaveBeenCalledTimes(3)
  })

  it('moves keyed items instead of re-creating them', async () => {
    const items = ref([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }])
    const created = vi.fn()
    const list = ul().for(items, item => li(item.id).key(item.id).onInit(created)).mount('#app')
    const [a, b, c, d] = Array.from(list.el.children)

    items.value.reverse()
    await nextTick()
    expect(Array.from(list.el.children)).toEqual([d, c, b, a])
    expect(created).toHaveBeenCalledTimes(4)

    items.value.unshift({ id: 0 })
    await nextTick()
    expect(texts(list.el)).toEqual(['0', '4', '3', '2', '1'])
    expect(created).toHaveBeenCalledTimes(5)
    expect(list.el.children[1]).toBe(d)
  })

  it('supports the key option so the callback only runs for new items', async () => {
    const items = ref([{ id: 1 }, { id: 2 }])
    const callback = vi.fn((item: { id: number }) => li(item.id))
    const list = ul().for(items, callback, { key: item => item.id }).mount('#app')

    expect(callback).toHaveBeenCalledTimes(2)
    items.value.push({ id: 3 })
    await nextTick()
    expect(callback).toHaveBeenCalledTimes(3)
    expect(texts(list.el)).toEqual(['1', '2', '3'])
  })

  it('re-renders a single item when a reactive property read in the callback changes', async () => {
    const items = ref([{ id: 1, label: 'a' }, { id: 2, label: 'b' }])
    const callback = vi.fn((item: { id: number, label: string }) => li(item.label).key(item.id))
    const list = ul().for(items, callback).mount('#app')
    const second = list.el.children[1]

    items.value[0].label = 'A'
    await nextTick()
    expect(texts(list.el)).toEqual(['A', 'b'])
    expect(callback).toHaveBeenCalledTimes(3)
    expect(list.el.children[1]).toBe(second)
  })

  it('updates in place when the callback uses getters', async () => {
    const items = ref([{ id: 1, label: 'a' }])
    const callback = vi.fn((item: { id: number, label: string }) => li(() => item.label).key(item.id))
    const list = ul().for(items, callback).mount('#app')
    const first = list.el.children[0]

    items.value[0].label = 'A'
    await nextTick()
    expect(texts(list.el)).toEqual(['A'])
    expect(callback).toHaveBeenCalledTimes(1)
    expect(list.el.children[0]).toBe(first)
  })

  it('re-creates items whose index changed when the callback declares the index', async () => {
    const items = ref([{ id: 1 }, { id: 2 }])
    const list = ul().for(items, (item, i) => li(`${i}:${item.id}`).key(item.id)).mount('#app')

    items.value.shift()
    await nextTick()
    expect(texts(list.el)).toEqual(['0:2'])
  })

  it('batches multiple mutations into a single update', async () => {
    const items = ref<number[]>([])
    const created = vi.fn()
    const list = ul().for(items, n => li(n).onInit(created)).mount('#app')

    items.value.push(1)
    items.value.push(2)
    items.value.pop()
    items.value.push(3)
    expect(list.el.children.length).toBe(0)
    await nextTick()
    expect(texts(list.el)).toEqual(['1', '3'])
    expect(created).toHaveBeenCalledTimes(2)
  })

  it('flushSync applies pending updates immediately', () => {
    const items = ref([1])
    const list = ul().for(items, n => li(n)).mount('#app')
    items.value.push(2)
    flushSync()
    expect(texts(list.el)).toEqual(['1', '2'])
  })

  it('works with computed sources and .if() inside items', async () => {
    const items = ref([{ id: 1, done: false }, { id: 2, done: true }])
    const pending = computed(() => items.value.filter(i => !i.done))
    const showAll = ref(true)
    const list = ul().for(pending, item => li(item.id).key(item.id).if(showAll)).mount('#app')

    expect(texts(list.el)).toEqual(['1'])
    items.value[1].done = false
    await nextTick()
    expect(texts(list.el)).toEqual(['1', '2'])

    showAll.value = false
    expect(list.el.querySelectorAll('li').length).toBe(0)
    showAll.value = true
    expect(texts(list.el)).toEqual(['1', '2'])
  })

  it('destroys removed items and stops their watchers', async () => {
    const items = ref([{ id: 1, label: 'a' }])
    const destroyed = vi.fn()
    const list = ul().for(items, item => li(() => item.label).key(item.id).onDestroy(destroyed)).mount('#app')

    const removed = items.value[0]
    items.value = []
    await nextTick()
    expect(destroyed).toHaveBeenCalledTimes(1)
    expect(list.el.children.length).toBe(0)
    removed.label = 'b'
    await nextTick()
    // Nothing explodes, nothing renders
    expect(list.el.children.length).toBe(0)
  })

  it('warns once about object lists without keys', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    ul().for([{ a: 1 }, { a: 2 }], item => li(item.a)).mount('#app')
    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn.mock.calls[0][0]).toContain('without keys')
    warn.mockRestore()
  })

  it('renders nested reusable components with their own lists', async () => {
    const groups = ref([{ id: 'g1', items: ['a', 'b'] }, { id: 'g2', items: ['c'] }])
    const Group = reusable<{ group: { id: string, items: string[] } }>('li', (ctx, props) => {
      ctx.nest(span(props.group.id), ul().for(() => props.group.items, item => li(item)))
    })
    const list = ul().for(groups, group => Group().props({ group }).key(group.id)).mount('#app')

    expect(list.el.querySelectorAll('li ul li').length).toBe(3)
    groups.value[1].items.push('d')
    await nextTick()
    expect(list.el.querySelectorAll('li ul li').length).toBe(4)
    expect(texts(list.el.querySelectorAll('ul')[1])).toEqual(['c', 'd'])
  })
})

describe('if', () => {
  it('toggles the element and keeps its position', () => {
    const show = ref(false)
    const app = div(span('a'), span('b').if(show), span('c')).mount('#app')

    expect(texts(app.el)).toEqual(['a', 'c'])
    show.value = true
    expect(texts(app.el)).toEqual(['a', 'b', 'c'])
    show.value = false
    expect(texts(app.el)).toEqual(['a', 'c'])
  })

  it('pauses reactive bindings while hidden and catches up when shown', () => {
    const show = ref(true)
    const label = ref('a')
    const runs = vi.fn()
    const child = span(() => {
      runs()
      return label.value
    }).if(show)
    div(child).mount('#app')

    show.value = false
    label.value = 'b'
    label.value = 'c'
    flushSync()
    expect(runs).toHaveBeenCalledTimes(1)

    show.value = true
    flushSync()
    expect(child.el.textContent).toBe('c')
  })

  it('accepts static values and fires visibility callbacks', () => {
    const cb = vi.fn()
    const show = ref(true)
    const app = div(span('never').if(false), span('x').if(show).onVisibilityChange(cb)).mount('#app')

    expect(texts(app.el)).toEqual(['x'])
    show.value = false
    expect(cb).toHaveBeenCalledWith(false)
  })

  it('works on the root component', () => {
    const show = ref(false)
    const app = div('x').if(show).mount('#app')
    expect(root.contains(app.el)).toBe(false)
    show.value = true
    expect(root.contains(app.el)).toBe(true)
  })
})

describe('lifecycle', () => {
  it('runs init, mount and destroy in order, children first on mount', () => {
    const order: string[] = []
    const child = span('c')
      .onInit(() => order.push('child init'))
      .onMount(() => order.push('child mount'))
      .onDestroy(() => order.push('child destroy'))
    const app = div(child)
      .onInit(() => order.push('init'))
      .onMount(() => {
        order.push('mount')
        expect(document.body.contains(child.el)).toBe(true)
      })
      .onBeforeDestroy(() => {
        order.push('before destroy')
        expect(document.body.contains(app.el)).toBe(true)
      })
      .onDestroy(() => order.push('destroy'))
      .mount('#app')

    app.destroy()
    expect(order).toEqual(['init', 'child init', 'child mount', 'mount', 'before destroy', 'child destroy', 'destroy'])
    expect(root.innerHTML).toBe('')
  })

  it('runs setup exactly once for the root component', () => {
    const setup = vi.fn()
    reusable('div', setup)().mount('#app')
    expect(setup).toHaveBeenCalledTimes(1)
  })

  it('treats a function returned from onMount as a cleanup', () => {
    const cleanup = vi.fn()
    const app = div().onMount(() => cleanup).mount('#app')
    expect(cleanup).not.toHaveBeenCalled()
    app.destroy()
    expect(cleanup).toHaveBeenCalledTimes(1)
  })

  it('can render a destroyed component again', () => {
    const setup = vi.fn()
    const count = ref(0)
    const comp = span(() => count.value).setup(setup)
    const app = div(comp).mount('#app')

    comp.destroy()
    expect(app.el.textContent).toBe('')
    app.nest(comp)
    div(comp).mount('#app')
    count.value = 1
    flushSync()
    expect(comp.el.textContent).toBe('1')
    expect(setup).toHaveBeenCalledTimes(2)
  })

  it('stops watchers of every descendant on destroy', async () => {
    const value = ref('a')
    const child = span(value)
    const app = div(div(child)).mount('#app')
    app.destroy()
    value.value = 'b'
    await nextTick()
    expect(child.el.textContent).toBe('a')
  })
})

describe('events', () => {
  it('emits typed custom events which bubble to parents', () => {
    const Child = reusable<Record<string, never>, { remove: { id: number } }>('button', (ctx) => {
      ctx.click(() => ctx.emit('remove', { id: 7 }))
    })
    const onChild = vi.fn()
    const onParent = vi.fn()
    const child = Child().on('remove', (e, payload) => onChild(e.detail, payload.id))
    div(child).on('remove', (_, payload: { id: number }) => onParent(payload.id)).mount('#app')

    child.el.click()
    expect(onChild).toHaveBeenCalledWith({ id: 7 }, 7)
    expect(onParent).toHaveBeenCalledWith(7)
  })

  it('runs modifiers synchronously so preventDefault works', () => {
    const event = new Event('click', { cancelable: true })
    const listener = vi.fn((e: Event) => e.preventDefault())
    const btn = button('x').click(listener, { modifiers: [Modifier.once, Modifier.stop] }).mount('#app')

    btn.el.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(true)
    btn.el.click()
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('removes listeners on destroy', () => {
    const listener = vi.fn()
    const btn = button('x').click(listener).mount('#app')
    const el = btn.el
    btn.destroy()
    el.click()
    expect(listener).not.toHaveBeenCalled()
  })

  it('detects key sequences regardless of earlier presses', () => {
    const listener = vi.fn()
    const el = input().keydownExact('Enter', listener).mount('#app').el
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    expect(listener).toHaveBeenCalledTimes(1)

    const seq = vi.fn()
    const el2 = input().keydownExact(['Shift', 'T'], seq).mount('#app').el
    el2.dispatchEvent(new KeyboardEvent('keydown', { key: 'T' }))
    el2.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift' }))
    expect(seq).not.toHaveBeenCalled()
    el2.dispatchEvent(new KeyboardEvent('keydown', { key: 'T' }))
    expect(seq).toHaveBeenCalledTimes(1)
  })

  it('binds keypress to the keypress event', () => {
    const listener = vi.fn()
    const el = input().keypress(listener).mount('#app').el
    el.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }))
    expect(listener).not.toHaveBeenCalled()
    el.dispatchEvent(new KeyboardEvent('keypress', { key: 'a' }))
    expect(listener).toHaveBeenCalledTimes(1)
  })
})

describe('attributes', () => {
  it('handles class strings, toggles, objects and reactive arrays', () => {
    const active = ref(false)
    const theme = ref('dark')
    const el = div()
      .class('a b')
      .class('active', active)
      .class({ big: true, small: () => !active.value })
      .class(() => [theme.value, { light: theme.value === 'light' }])
      .mount('#app')
      .el

    expect(el.className).toBe('a b big small dark')
    active.value = true
    theme.value = 'light'
    expect(el.classList.contains('active')).toBe(true)
    expect(el.classList.contains('small')).toBe(false)
    expect(el.classList.contains('dark')).toBe(false)
    expect(el.classList.contains('light')).toBe(true)
  })

  it('applies styles immediately, including camelCase and reactive objects', () => {
    const width = ref(10)
    const styles = ref({ backgroundColor: 'red', color: 'blue' })
    const el = div()
      .style('width', () => `${width.value}px`)
      .style(styles)
      .style({ 'marginTop': '1px', '--custom': 'x' })
      .mount('#app')
      .el

    expect(el.style.width).toBe('10px')
    expect(el.style.backgroundColor).toBe('red')
    expect(el.style.marginTop).toBe('1px')
    expect(el.style.getPropertyValue('--custom')).toBe('x')

    width.value = 20
    styles.value = { color: 'green' }
    expect(el.style.width).toBe('20px')
    expect(el.style.backgroundColor).toBe('')
    expect(el.style.color).toBe('green')
  })

  it('binds attributes, removes stale ones and toggles disabled', () => {
    const attrs = ref<Record<string, string | boolean>>({ title: 'a', hidden: true })
    const disabled = ref(true)
    const el = button().attrs(attrs).disabled(disabled).attr('data-x', 1).mount('#app').el

    expect(el.getAttribute('title')).toBe('a')
    expect(el.hasAttribute('hidden')).toBe(true)
    expect(el.hasAttribute('disabled')).toBe(true)
    expect(el.getAttribute('data-x')).toBe('1')

    attrs.value = { title: 'b' }
    disabled.value = false
    expect(el.getAttribute('title')).toBe('b')
    expect(el.hasAttribute('hidden')).toBe(false)
    expect(el.hasAttribute('disabled')).toBe(false)
  })

  it('show toggles display and restores inline values', () => {
    const visible = ref(true)
    const el = div().style('display', 'flex').show(visible).mount('#app').el
    expect(el.style.display).toBe('flex')
    visible.value = false
    expect(el.style.display).toBe('none')
    visible.value = true
    expect(el.style.display).toBe('flex')
  })

  it('binds text, html and id reactively', () => {
    const text = ref('a')
    const el = span().text(text).id(() => `id-${text.value}`).mount('#app').el
    expect(el.textContent).toBe('a')
    text.value = 'b'
    expect(el.textContent).toBe('b')
    expect(el.id).toBe('id-b')
  })
})

describe('model', () => {
  it('binds text inputs both ways with transforms', () => {
    const value = ref<string | number>('a')
    const el = input('text').model(value, { transforms: [Transform.trim, Transform.uppercase] }).mount('#app').el as HTMLInputElement

    expect(el.value).toBe('a')
    el.value = ' b '
    el.dispatchEvent(new Event('input'))
    expect(value.value).toBe('B')
    value.value = 'c'
    expect(el.value).toBe('c')
  })

  it('binds checkbox arrays and select elements', () => {
    const picked = ref<string[]>(['x'])
    const box = input('checkbox').attr('value', 'y').model(picked).mount('#app').el as HTMLInputElement
    box.checked = true
    box.dispatchEvent(new Event('change'))
    expect(picked.value).toEqual(['x', 'y'])
    picked.value = ['x']
    expect(box.checked).toBe(false)

    const choice = ref('')
    const sel = select(option('One', 1), option('Two', 2).selected()).model(choice).mount('#app').el as HTMLSelectElement
    expect(choice.value).toBe('2')
    choice.value = '1'
    expect(sel.value).toBe('1')
  })

  it('fixes the lowercase and capitalizeAll transforms', () => {
    expect(Transform.lowercase('ABC')).toBe('abc')
    expect(Transform.capitalizeAll('hello big world')).toBe('Hello Big World')
    expect(Transform.clamp(0, 10)(15)).toBe(10)
    expect(Transform.fallback(5)('')).toBe(5)
  })
})

describe('reusable components', () => {
  it('creates independent instances with slots and props', () => {
    const Wrapper = reusable<{ title: string }>('section', (ctx, props) => {
      ctx.nest(span(() => props.title), div(ctx.children).class('slot'))
    })
    const a = Wrapper(p('a')).props({ title: 'A' })
    const b = Wrapper(p('b')).prop('title', 'B')
    div(a, b).mount('#app')

    expect(a.el.querySelector('span')!.textContent).toBe('A')
    expect(b.el.querySelector('span')!.textContent).toBe('B')
    expect(a.el.querySelector('.slot p')!.textContent).toBe('a')
    expect(b.el.querySelector('.slot p')!.textContent).toBe('b')
  })

  it('does not share method state between instances', () => {
    const a = div()
    const b = div()
    expect(Object.hasOwn(a, 'text')).toBe(false)
    expect(a.text).toBe(b.text)
  })

  it('renders reactive state declared inside setup', async () => {
    const Counter = reusable('div', (ctx) => {
      const count = ref(0)
      const state = reactive({ label: 'count' })
      ctx.nest(
        span(() => `${state.label}: ${count.value}`),
        button('+').click(() => count.value++),
      )
    })
    const counter = Counter().mount('#app')
    counter.el.querySelector('button')!.click()
    await nextTick()
    expect(counter.el.querySelector('span')!.textContent).toBe('count: 1')
  })
})

describe('router style re-mounting (pantry)', () => {
  it('re-mounts the same route instance with fresh props and setup state', () => {
    const setup = vi.fn()
    const view = div<{ $params: { id: string }, $data: string[] }>().setup((ctx, props) => {
      setup()
      const local = ref(0)
      ctx.nest(
        span(`Id ${props.$params.id}`),
        p(() => `${props.$data.join(',')} / ${local.value}`),
        button('+').click(() => local.value++),
      )
    })

    const navigate = (id: string, data: string[]) => {
      // What pantry does on `onRouteResolve`, minus `clone()`
      view.destroy()
      const boundary = document.createElement('div')
      boundary.setAttribute('route-boundary', '')
      root.replaceChildren(boundary)
      view.props({ $params: { id }, $data: data }).mount('[route-boundary]')
    }

    navigate('3', ['a'])
    view.el.querySelector('button')!.click()
    flushSync()
    expect(view.el.textContent).toBe('Id 3a / 1+')

    // Same route, different params: local state starts over
    navigate('4', ['b', 'c'])
    expect(view.el.textContent).toBe('Id 4b,c / 0+')
    expect(setup).toHaveBeenCalledTimes(2)
    expect(root.querySelectorAll('span').length).toBe(1)

    // Old listeners were removed with the previous mount
    view.el.querySelector('button')!.click()
    flushSync()
    expect(view.el.textContent).toBe('Id 4b,c / 1+')
  })

  it('creates independent views from a reusable factory', () => {
    const View = reusable<{ $params: { id: string } }>('div', (ctx, props) => {
      ctx.nest(span(() => props.$params.id))
    })
    const first = View().props({ $params: { id: '1' } }).mount('#app')
    first.destroy()
    const second = View().props({ $params: { id: '2' } }).mount('#app')
    expect(second).not.toBe(first)
    expect(root.textContent).toBe('2')
  })
})
