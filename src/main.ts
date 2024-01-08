import { ref } from '@vue/reactivity'
import { El } from './factory'

const text = ref('')

const App = El.fragment([
  El.input('text').model(text),
  El.div('Hello').style('background', text),
])

App.mount('#app')
