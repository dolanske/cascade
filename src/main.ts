import { ref } from '@vue/reactivity'
import { El } from './factory'

const InputText = El.form().setup(({ self }) => {
  const people = ref('Daniel')

  self.nest([
    El.label('John'),
    El.input('radio').value('John').model(people),
    El.label('Daniel'),
    El.input('radio').value('Daniel').model(people),
    El.label('Pavel'),
    El.input('radio').value('Pavel').model(people),
    El.hr(),
    () => JSON.stringify(people.value, null, 2),
  ])
})

InputText.mount('#app')
