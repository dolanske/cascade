/**
 * A tiny microtask based job queue.
 *
 * Reactive property bindings (`.text()`, `.attr()`, ...) are applied
 * synchronously because they are cheap and only ever touch a single DOM node.
 * Structural updates (`.for()` and reactive children) are expensive, so they
 * are batched: mutating a list a hundred times in the same tick results in a
 * single diff instead of a hundred.
 *
 * Use `nextTick()` to await the flushed DOM.
 */

import type { WatchScheduler } from '@vue/reactivity'

export type Job = () => void

const queue = new Set<Job>()
const resolvedPromise: Promise<void> = Promise.resolve()
let currentFlushPromise: Promise<void> | null = null
let isFlushing = false

// Guards against a job which endlessly re-queues itself
const RECURSION_LIMIT = 10_000

function flushJobs() {
  isFlushing = true
  let iterations = 0

  try {
    // Jobs queued while flushing are appended to the same Set, the iterator
    // picks them up, so a single pass is enough.
    for (const job of queue) {
      queue.delete(job)

      if (++iterations > RECURSION_LIMIT) {
        console.warn('[cascade] Infinite update loop detected. A reactive effect keeps triggering itself.')
        break
      }

      try {
        job()
      }
      catch (error) {
        console.error('[cascade] Error while flushing a render job', error)
      }
    }
  }
  finally {
    queue.clear()
    isFlushing = false
    currentFlushPromise = null
  }
}

export function queueJob(job: Job) {
  queue.add(job)

  if (isFlushing || currentFlushPromise)
    return

  currentFlushPromise = resolvedPromise.then(flushJobs)
}

/**
 * Structural updates (lists, reactive children) are batched into a microtask.
 * Await `nextTick()` to read the DOM after it has been patched.
 *
 * ```ts
 * items.value.push('new')
 * await nextTick()
 * // DOM is up to date
 * ```
 */
export function nextTick<T = void>(callback?: () => T): Promise<T | void> {
  const promise = currentFlushPromise ?? resolvedPromise
  return callback ? promise.then(callback) : promise
}

/**
 * Immediately applies every pending structural update instead of waiting for
 * the microtask. Mostly useful in tests or when measuring the DOM right after
 * a mutation.
 */
export function flushSync() {
  if (queue.size > 0)
    flushJobs()
}

/**
 * Watch scheduler used by every structural (and therefore expensive) effect.
 * The initial run stays synchronous so mounting is never deferred.
 */
export const batched: WatchScheduler = (job, isFirstRun) => {
  if (isFirstRun)
    job()
  else
    queueJob(job)
}
