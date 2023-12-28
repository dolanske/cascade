import { ref } from '@vue/reactivity'
import { El } from './factory'

const InputWrapper = El.div().setup(({ self }) => {
  const text = ref('')

  self.nest([
    El.label('My Input'),
    El.input('text').model(text),
    El.input(),
    El.hr(),
    () => text.value,
  ])
})

InputWrapper.mount('#app')
