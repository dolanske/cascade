import { ref } from '@vue/reactivity'
import { El } from './factory'

const text = ref('Hello')

const App = El.div([
  El.input('text').model(text),
  El.span('More than 5').if(() => text.value.length > 5).text('More than 5'),
  // El.span('Exactly 5').elseIf(() => text.value.length === 5),
  // El.span('Less than 5').else(),
])

App.mount('#app')
