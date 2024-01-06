import { ref } from '@vue/reactivity'
import { El } from './factory'

const items = ref(['Jan', 'Daniel', 'Petr', 'Iida', 'Andrew'])
const newPerson = ref('')

El.fragment([
  El.label('Create Child'),
  El.form(El.input('text').model(newPerson))
    .on('submit', (e) => {
      e.preventDefault()
      items.value.push(newPerson.value)
      newPerson.value = ''
    }),
  El.ul(
    El.li().for(items, (item, { value }) => {
      item.nest(El.strong(value))
    }),
  ),
]).mount('#app')
