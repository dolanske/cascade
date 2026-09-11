import type { MaybeRefOrGetter, WatchHandle } from '@vue/reactivity'
import type { Component } from '../component'
import type { Block, Entry } from '../render'
import type { ComponentChildrenItems, Key } from '../types'
import { toValue, watch } from '@vue/reactivity'
import { Component as ComponentClass } from '../component'
import { mountChild, placeEntries } from '../render'
import { batched } from '../scheduler'
import { isArray, isObject, isWatchSource, warnOnce } from '../util'

export type ForSource = number | readonly any[] | object
export type ForCallback = (...args: any[]) => ComponentChildrenItems<any>

export interface ForOptions<Item, Second> {
  /**
   * Returns a unique key for an item. Faster than `.key()` on the rendered
   * component because the callback only has to run for new items.
   *
   * Receives `(item, index)` for arrays and `(value, key, index)` for
   * objects.
   */
  key?: (item: Item, second: Second, index: number) => Key
}

interface ForEntry extends Entry {
  key: Key
  /**
   * Arguments the callback is called with
   */
  args: unknown[]
  index: number
  /**
   * Watcher which re-runs the callback when a reactive value read inside of
   * it changes. Only that item is then re-rendered.
   */
  stop: WatchHandle | null
  /**
   * Result of the first callback run, waiting to be mounted.
   */
  pending: ComponentChildrenItems<any> | undefined
}

interface ForItem {
  item: unknown
  args: unknown[]
  /**
   * Key which is used when neither `.key()` nor the `key` option provide one.
   * Object keys and numeric indices are stable, so they are used directly.
   */
  defaultKey: Key | undefined
}

function collect(src: ForSource, callback: ForCallback): { items: ForItem[], usesIndex: boolean } {
  const items: ForItem[] = []

  if (isArray(src)) {
    const len = src.length
    for (let i = 0; i < len; i++)
      items.push({ item: src[i], args: [src[i], i], defaultKey: undefined })
    // `(item, index) => ...` declares the index, so its output depends on
    // the position and can not be reused after a move
    return { items, usesIndex: callback.length >= 2 }
  }

  if (typeof src === 'number') {
    for (let i = 0; i < src; i++)
      items.push({ item: i, args: [i], defaultKey: i })
    return { items, usesIndex: false }
  }

  if (isObject(src)) {
    const keys = Object.keys(src)
    const len = keys.length
    for (let i = 0; i < len; i++) {
      const key = keys[i]
      const value = Reflect.get(src, key)
      items.push({ item: value, args: [value, key, i], defaultKey: key })
    }
    return { items, usesIndex: callback.length >= 3 }
  }

  return { items, usesIndex: false }
}

export function for_impl(this: Component<any, any>, source: MaybeRefOrGetter<ForSource>, callback: ForCallback, options: ForOptions<any, any> = {}) {
  const keyFn = options.key
  let entries: ForEntry[] = []

  // `.for()` takes over the element, other children would end up in
  // unpredictable positions
  this.$setComponentChildren([])

  /**
   * Creates the tracked per-item effect. The first run happens synchronously
   * and stores its result in `entry.pending`.
   */
  const attach = (entry: ForEntry) => {
    let first = true

    entry.stop = watch(() => callback(...entry.args), (result) => {
      if (first) {
        first = false
        entry.pending = result
        return
      }

      // A reactive value read inside the callback changed, swap the block of
      // this single item
      const old = entry.block
      if (!old)
        return
      const container = old.first().parentNode
      if (!container)
        return

      entry.block = mountChild(result, this, container, old.first())
      old.destroy(true)
    }, { immediate: true, scheduler: batched })
  }

  const update = (src: ForSource) => {
    const { items, usesIndex } = collect(src, callback)
    const oldByKey = new Map<Key, ForEntry>()
    // Unkeyed array items fall back to matching by identity, so removing an
    // item from the middle of a list does not re-create everything after it
    const oldByItem = isArray(src) && !keyFn ? new Map<unknown, ForEntry[]>() : null
    for (const entry of entries) {
      oldByKey.set(entry.key, entry)
      if (oldByItem) {
        const list = oldByItem.get(entry.item)
        if (list)
          list.push(entry)
        else
          oldByItem.set(entry.item, [entry])
      }
    }

    const used = new Set<ForEntry>()
    const reusable = (candidate: ForEntry | undefined, item: unknown, index: number) => {
      return !!candidate && !used.has(candidate) && Object.is(candidate.item, item) && (!usesIndex || candidate.index === index)
    }

    const seen = new Set<Key>()
    const next: ForEntry[] = []
    const len = items.length

    for (let i = 0; i < len; i++) {
      const { item, args, defaultKey } = items[i]
      const entry: ForEntry = { key: i, item, args, index: i, block: null, stop: null, pending: undefined }
      let key: Key
      let explicitKey = true

      if (keyFn) {
        key = keyFn(...args as [any, any, number])
      }
      else if (defaultKey !== undefined) {
        key = defaultKey
      }
      else {
        // The key lives on the rendered component, so the callback has to
        // run. If the item turns out to be known, the result is discarded.
        attach(entry)
        const result = entry.pending

        if (result instanceof ComponentClass && result.$key !== undefined) {
          key = result.$key
        }
        else {
          key = i
          explicitKey = false
          if (isObject(item) && result instanceof ComponentClass)
            warnOnce(`for-key-${this.identifier}`, '[cascade] `.for()` renders a list of objects without keys. Add `.key(uniqueId)` to the returned component (or pass a `key` option) so items are tracked reliably when the list changes.', this.el)
        }
      }

      if (seen.has(key)) {
        warnOnce(`for-duplicate-${this.identifier}`, `[cascade] Duplicate key "${String(key)}" in \`.for()\`. Keys must be unique, the item is re-rendered on every update.`, this.el)
        key = Symbol('duplicate')
      }
      seen.add(key)
      entry.key = key

      let old = oldByKey.get(key)
      if (!reusable(old, item, i)) {
        old = undefined
        if (oldByItem && !explicitKey)
          old = oldByItem.get(item)?.find(candidate => reusable(candidate, item, i))
      }

      if (old) {
        // Known item, keep its rendered block
        entry.stop?.()
        old.key = key
        old.index = i
        used.add(old)
        next.push(old)
      }
      else {
        next.push(entry)
      }
    }

    for (const entry of entries) {
      if (!used.has(entry)) {
        entry.stop?.()
        entry.block?.destroy(true)
      }
    }

    placeEntries(entries, next, this.el, null, (entry, before): Block => {
      if (!entry.stop)
        attach(entry)
      const block = mountChild(entry.pending, this, this.el, before)
      entry.pending = undefined
      return block
    })

    entries = next
  }

  this.onInit(() => {
    let stop: WatchHandle | null = null

    if (isWatchSource(source)) {
      stop = watch(() => toValue(source), (src) => {
        // Per-item watchers are created inside the owner's scope so they are
        // paused and stopped together with it
        this.$scope.run(() => update(src))
      }, { immediate: true, deep: 1, scheduler: batched })
    }
    else {
      update(source)
    }

    this.$blocks.push({
      destroy(removeDom) {
        stop?.()
        for (const entry of entries) {
          entry.stop?.()
          entry.block?.destroy(removeDom)
        }
        entries = []
      },
    })
  })
}
