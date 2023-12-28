import { ref } from '@vue/reactivity'
import { El } from './factory'

const InputText = El.form().setup(({ self, props }) => {
  const { id, placeholder, label } = props

  const text = ref('')

  self.nest([
    El.label(label).attr('for', id),
    El.input('text').model(text).attrs({
      name: id,
      placeholder,
      id,
    }),
    () => text.value,
  ])
})

InputText
  .prop('label', 'Nickname')
  .prop('placeholder', 'Please enter your name')
  .prop('id', 'name')
  .mount('#app')
