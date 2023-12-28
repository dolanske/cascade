import { ref } from '@vue/reactivity'
import { El } from './factory'

const InputWrapper = El.fragment().setup(({ self }) => {
  const text = ref('')

  self.nest([
    El.label('Name'),
    // .attribute("for", "name"),
    El.input('text').model(text),
    // .attributes({
    //   placeholder: "Please enter your name",
    //   name: "name",
    //   id: "name"
    // }),
    El.hr(),
    () => text.value,
  ])
})

InputWrapper.mount('#app')
