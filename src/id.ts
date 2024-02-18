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

export function createId(limited: boolean = false) {
  let newId = ''
  while (newId.length === 0 || registry.has(newId))
    newId = generate(limited)

  return newId
}
