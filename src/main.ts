import { ref } from '@vue/reactivity'
import { El } from './factory'

// Define reusable component with props
const CounterComponent = El.button().setup(({ self, props }) => {
  const data = ref(props.startingCount as number)

  self.text(() => `Clicked ${data.value} times`)
  self.click(() => {
    if (props.canIncrement.value)
      data.value++
  })
})

///////////////

// Use component somewhere
const App = El.div().setup(({ self }) => {
  const canIncrement = ref(true)

  self.nest([
    El.h1('Counter'),
    CounterComponent.props({
      startingCount: 5,
      canIncrement,
    }),
    El.button('Toggle').click(() => canIncrement.value = !canIncrement.value),
  ])
})

App.mount('#app')
