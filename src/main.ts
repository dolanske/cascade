import { ref } from '@vue/reactivity'
import { El } from './factory'

const visible = ref(false)

const App = El.fragment([
  El.button('Increment').click(() => visible.value = !visible.value),
  El.span('Hello').class(() => ({ pink: visible.value })),
])

App.mount('#app')
