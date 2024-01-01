import { ref } from '@vue/reactivity'
import { El } from './factory'

const Form = El.form().setup(({ self }) => {
  const options = ['Jan', 'Daniel', 'Petr']
  const people = ref()

  self.nest([
    El.select([
      // Default, disabled option
      El.option('', 'Please select a name').disabled(),
      // Array of options
      ...options.map(option => El.option(option)),
    ]).model(people),
    // El.span(() => people.value),
  ])
})

Form.mount('#app')
