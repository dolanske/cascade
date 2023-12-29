import { ref } from '@vue/reactivity'
import { El } from './factory'

const InputText = El.form().setup(({ self }) => {
  const people = ref(['John'])

  self.nest([
    El.label('John'),
    El.input('checkbox').value('John').model(people),
    El.label('Daniel'),
    El.input('checkbox').value('Daniel').model(people),
    El.label('Pavel'),
    El.input('checkbox').value('Pavel').model(people),
    El.hr(),
    () => JSON.stringify(people.value, null, 2),
  ])
})

InputText.mount('#app')
