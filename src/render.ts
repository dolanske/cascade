/**
 * Rendering is block based. Every child a component receives (text, DOM
 * node, component, fragment, ref or getter) becomes a `Block`: a contiguous
 * range of DOM nodes which knows how to destroy itself. Blocks are what the
 * keyed reconciler shuffles around, so `.for()` lists, reactive children and
 * fragments all share the same machinery.
 */

import type { Component } from './component'
import type { ComponentChildren, ComponentChildrenItems, Key } from './types'
import { toValue, watch } from '@vue/reactivity'
import { Component as ComponentClass, Fragment } from './component'
import { batched } from './scheduler'
import { isArray, isEmptyChild, isTextValue, isWatchSource, warnOnce } from './util'

export interface Disposable {
  /**
   * Tears down watchers and component instances. `removeDom` is false when
   * an ancestor element is removed anyway, which saves a DOM call per node.
   */
  destroy: (removeDom: boolean) => void
}

export interface Block extends Disposable {
  /**
   * Text node of the block, if it renders plain text. Allows updating text
   * in place instead of re-creating the node.
   */
  text: Text | null
  first: () => Node
  last: () => Node
}

/**
 * Entry of a reconciled list.
 */
export interface Entry {
  key: Key | undefined
  item: unknown
  block: Block | null
}

//////////////////////////////
// Mount queue

// `onMount` callbacks must run once the whole subtree is in the DOM. Every
// mounted component is queued and the queue is flushed once the outermost
// mount call finishes.
const mountQueue: Component<any, any>[] = []
let mountDepth = 0

export function queueMounted(component: Component<any, any>) {
  mountQueue.push(component)
}

export function beginMount() {
  mountDepth++
}

export function endMount() {
  if (--mountDepth > 0 || mountQueue.length === 0)
    return

  // Callbacks may mount further components which push to the queue again
  while (mountQueue.length > 0) {
    const batch = mountQueue.splice(0)
    for (const component of batch)
      component.$mount()
  }
}

//////////////////////////////
// Helpers

/**
 * Turns whatever the user provided into a flat list of children.
 */
export function normalizeChildren(children: ComponentChildren<any> | undefined, target: ComponentChildrenItems<any>[] = []): ComponentChildrenItems<any>[] {
  if (isArray(children)) {
    for (const child of children)
      normalizeChildren(child, target)
  }
  else {
    target.push(children)
  }
  return target
}

export function insertBlock(block: Block, container: Node, before: Node | null) {
  const last = block.last()
  let node: Node | null = block.first()

  while (node) {
    const next: Node | null = node === last ? null : node.nextSibling
    container.insertBefore(node, before)
    node = next
  }
}

function removeRange(first: Node, last: Node) {
  let node: Node | null = first
  while (node) {
    const next: Node | null = node === last ? null : node.nextSibling
    node.parentNode?.removeChild(node)
    node = next
  }
}

function nodeBlock(node: Node, text: Text | null = null): Block {
  return {
    text,
    first: () => node,
    last: () => node,
    destroy(removeDom) {
      if (removeDom)
        node.parentNode?.removeChild(node)
    },
  }
}

//////////////////////////////
// Mounting

/**
 * Renders a single child into `container` before `before` (appends when
 * `null`) and returns its block.
 *
 * @param child Anything a component accepts as a child
 * @param owner Component whose effect scope collects any watcher created
 * for the child and which becomes the child's `parent`
 * @param container Element the child is inserted into
 * @param before Node to insert before, appends when `null`
 */
export function mountChild(child: ComponentChildrenItems<any>, owner: Component<any, any> | null, container: Node, before: Node | null): Block {
  beginMount()
  try {
    return mountChildInner(child, owner, container, before)
  }
  finally {
    endMount()
  }
}

function mountChildInner(child: ComponentChildrenItems<any>, owner: Component<any, any> | null, container: Node, before: Node | null): Block {
  if (isEmptyChild(child)) {
    const node = document.createTextNode('')
    container.insertBefore(node, before)
    return nodeBlock(node, node)
  }

  if (isTextValue(child)) {
    const node = document.createTextNode(String(child))
    container.insertBefore(node, before)
    return nodeBlock(node, node)
  }

  if (child instanceof ComponentClass)
    return mountComponent(child, owner, container, before)

  if (child instanceof Node) {
    container.insertBefore(child, before)
    return nodeBlock(child)
  }

  if (isWatchSource(child))
    return mountDynamic(child, owner, container, before)

  if (isArray(child)) {
    // Nested arrays are normally flattened before we get here. Treat the
    // remaining case as a fragment.
    return mountComponent(new Fragment(child), owner, container, before)
  }

  warnOnce('unknown-child', '[cascade] Unsupported child value, rendering nothing:', child)
  const node = document.createTextNode('')
  container.insertBefore(node, before)
  return nodeBlock(node, node)
}

/**
 * Renders the component's children into its element. Runs inside the
 * component's effect scope so that reactive children are paused / stopped
 * together with the component.
 */
export function renderChildren(component: Component<any, any>, container: Node, before: Node | null) {
  const children = normalizeChildren(component.componentChildren)
  const len = children.length

  for (let i = 0; i < len; i++) {
    const child = children[i]
    // Static empty children (`false && span()`) render nothing at all
    if (isEmptyChild(child))
      continue
    component.$blocks.push(mountChildInner(child, component, container, before))
  }
}

function mountComponent(component: Component<any, any>, owner: Component<any, any> | null, container: Node, before: Node | null): Block {
  if (component.$initialized) {
    warnOnce(`remount-${component.identifier}`, '[cascade] A component instance can only be rendered once. Create a new instance instead of reusing', component)
    const node = document.createTextNode('')
    container.insertBefore(node, before)
    return nodeBlock(node, node)
  }

  component.parent = owner instanceof Fragment ? owner.parent : owner

  if (component instanceof Fragment)
    return mountFragment(component, container, before)

  component.$prepare()
  component.$scope.run(() => {
    component.$init()
    renderChildren(component, component.el, null)
  })

  if (component.$anchor)
    container.insertBefore(component.$anchor, before)
  if (component.$visible)
    container.insertBefore(component.el, before)
  else
    component.$scope.pause()

  queueMounted(component)

  return {
    text: null,
    first: () => component.$anchor ?? component.el,
    last: () => component.$visible ? component.el : component.$anchor!,
    destroy: removeDom => component.$destroy(removeDom),
  }
}

function mountFragment(fragment: Fragment<any>, container: Node, before: Node | null): Block {
  const start = fragment.$start
  const end = fragment.$end

  container.insertBefore(start, before)
  container.insertBefore(end, before)

  fragment.$prepare()
  fragment.$scope.run(() => {
    fragment.$init()
    renderChildren(fragment, container, end)
  })

  queueMounted(fragment)

  return {
    text: null,
    first: () => start,
    last: () => end,
    destroy(removeDom) {
      fragment.$destroy(false)
      if (removeDom)
        removeRange(start, end)
    },
  }
}

/**
 * A ref or getter used directly as a child. The resolved value is rendered
 * between two anchors and patched whenever the source changes.
 */
function mountDynamic(source: ComponentChildrenItems<any>, owner: Component<any, any> | null, container: Node, before: Node | null): Block {
  const start = document.createTextNode('')
  const end = document.createTextNode('')
  container.insertBefore(start, before)
  container.insertBefore(end, before)

  let entries: Entry[] = []

  const stop = watch(() => toValue(source as any), (value) => {
    const parent = end.parentNode
    if (!parent)
      return
    beginMount()
    try {
      entries = patchChildren(entries, normalizeChildren(value), owner, parent, end)
    }
    finally {
      endMount()
    }
  }, { immediate: true, deep: 1, scheduler: batched })

  return {
    text: null,
    first: () => start,
    last: () => end,
    destroy(removeDom) {
      stop()
      for (const entry of entries)
        entry.block!.destroy(removeDom)
      entries = []
      if (removeDom) {
        start.remove()
        end.remove()
      }
    },
  }
}

//////////////////////////////
// Reconciliation

/**
 * Patches a list of arbitrary children. Components carrying a `.key()` are
 * matched by key, everything else by position. Text is updated in place.
 */
export function patchChildren(old: Entry[], children: ComponentChildrenItems<any>[], owner: Component<any, any> | null, container: Node, endAnchor: Node | null): Entry[] {
  const keyed = new Map<Key, Entry>()
  for (const entry of old) {
    if (entry.key !== undefined) {
      if (keyed.has(entry.key))
        continue
      keyed.set(entry.key, entry)
    }
  }

  const used = new Set<Entry>()
  const next: Entry[] = []
  const len = children.length

  for (let i = 0; i < len; i++) {
    const child = children[i]
    const key = child instanceof ComponentClass ? child.$key : undefined
    let entry: Entry | undefined

    if (key !== undefined) {
      const candidate = keyed.get(key)
      if (candidate && !used.has(candidate))
        entry = candidate
      else if (candidate)
        warnOnce('duplicate-key', `[cascade] Duplicate key "${String(key)}" in a children list. Keys must be unique.`)
    }
    else {
      const candidate = old[i]
      if (candidate && candidate.key === undefined && !used.has(candidate)) {
        if (candidate.item === child) {
          entry = candidate
        }
        else if (candidate.block!.text && (isTextValue(child) || isEmptyChild(child))) {
          // Text to text, update in place
          candidate.block!.text.data = isEmptyChild(child) ? '' : String(child)
          candidate.item = child
          entry = candidate
        }
      }
    }

    if (entry) {
      used.add(entry)
      next.push(entry)
    }
    else {
      next.push({ key, item: child, block: null })
    }
  }

  for (const entry of old) {
    if (!used.has(entry))
      entry.block!.destroy(true)
  }

  placeEntries(old, next, container, endAnchor, (entry, before) => mountChildInner(entry.item as ComponentChildrenItems<any>, owner, container, before))

  return next
}

/**
 * Moves reused blocks into their new position with the minimum amount of
 * DOM operations (longest increasing subsequence) and mounts new entries in
 * place. Entries in `next` which are also present in `old` are reused, all
 * other entries are created with `create`.
 *
 * `create` receives the node the new block has to be inserted before.
 */
export function placeEntries<E extends Entry>(old: E[], next: E[], container: Node, endAnchor: Node | null, create: (entry: E, before: Node | null) => Block) {
  const oldIndex = new Map<E, number>()
  for (let i = 0; i < old.length; i++)
    oldIndex.set(old[i], i)

  const len = next.length
  // 0 means the entry is new, otherwise old index + 1
  const source = Array.from({ length: len }, () => 0)
  let moved = false
  let maxIndex = 0

  for (let i = 0; i < len; i++) {
    const index = oldIndex.get(next[i])
    if (index === undefined)
      continue
    source[i] = index + 1
    if (index + 1 < maxIndex)
      moved = true
    else
      maxIndex = index + 1
  }

  const sequence = moved ? getSequence(source) : []
  let j = sequence.length - 1
  let nextNode: Node | null = endAnchor

  for (let i = len - 1; i >= 0; i--) {
    const entry = next[i]

    if (source[i] === 0) {
      entry.block = create(entry, nextNode)
    }
    else if (moved) {
      if (j < 0 || i !== sequence[j])
        insertBlock(entry.block!, container, nextNode)
      else
        j--
    }

    nextNode = entry.block!.first()
  }
}

/**
 * Longest increasing subsequence, returns the indices of `arr` which form
 * it. Zero entries are ignored.
 */
function getSequence(arr: number[]): number[] {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length

  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (u + v) >> 1
        if (arr[result[c]] < arrI)
          u = c + 1
        else
          v = c
      }
      if (arrI < arr[result[u]]) {
        if (u > 0)
          p[i] = result[u - 1]
        result[u] = i
      }
    }
  }

  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}
