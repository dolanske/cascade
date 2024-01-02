import { ref } from '@vue/reactivity'
import { El } from './factory'

const open = ref(true)

const Details = El.details().setup(({ self }) => {
  self.model(open)
  self.nest([
    El.summary('Click to open'),
    El.p('Lorem ispum dolor sit amet amongus cumulus.'),
  ])
})

const Button = El
  .button('Toggle from outside')
  .click(() => open.value = !open.value)

const App = El.fragment([
  Details,
  Button,
])

App.mount('#app')
