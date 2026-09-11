const registry = new Set<string>()

const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('')
const charsLimited = 'abcdefghiklmnopqrstuvwxyz'.split('')

function generate(limited: boolean) {
  const items = limited ? charsLimited : chars

  let str = ''
  for (let i = 0; i < 5; i++)
    str += items[Math.floor(Math.random() * items.length)]
  return str
}

/**
 * Creates a random identifier which is guaranteed not to collide with any
 * other id handed out by this function.
 *
 * @param limited Only use lowercase letters, so the id is a valid identifier
 */
export function createId(limited: boolean = false) {
  let newId = ''
  let attempts = 0

  while (newId.length === 0 || registry.has(newId)) {
    newId = generate(limited)

    // Once the 5 character space starts getting crowded, fall back to
    // appending a counter instead of spinning on random collisions.
    if (++attempts > 5)
      newId += registry.size.toString(36)
  }

  registry.add(newId)
  return newId
}
