import { ref } from '@vue/reactivity'
import { El } from './factory'

// Define reusable component with props
const CounterComponent = El.button().setup(({ self, props }) => {
  const data = ref(props.startingCount as number)

  self.text(() => `Clicked ${data.value} times`)
  self.click(() => data.value++)
})

///////////////

// Use component somewhere
const App = El.div([
  El.h1('Counter'),
  CounterComponent.prop('startingCount', 5),
])

App.mount('#app')
