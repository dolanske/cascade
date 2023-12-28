# cascade

I swear this is the last framework I make (for now)

Create simple, reusable and reactive UI components using render functions and add more complex functionality through method chaining. These methods can be mounted anywhere in the DOM, static applications, with added reactivity only where needed.

I am so sorry guys, after creating my own jQuery and Alpine.js, I think it is time I just make my own version of jsx.

```ts
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

  // This is the same as adding the children inside the El.div(...children).
  // But being able to define this AFTER defining the component logic is much more ergonomic
  self.nest([
    El.h1('Counter'),
    CounterComponent.props({
      // Static prop
      startingCount: 5,
      // Dynamic prop (reactive)
      canIncrement,
    }),
    El.button('Toggle').click(() => canIncrement.value = !canIncrement.value),
  ])
})

App.mount('#app')
```

## TODO

This project started during Christmas, without much thinking through. So far it's been fun and smooth sailing. If this syntax is viable is something future me needs to worry about.

- [] Props
  - [x] Add passing static data into components
  - [] Correctly type props (using the builder TS pattern)
- [] else() / elseif() (just complete if() implementation)
- [] for()
- [] show()
- [] model()
  - [] input
    - [] checkbox
    - [] radio
    - [x] other
  - [] select
  - [] details
- [x] attr()
- [] style()
- [x] Split elements into void and normal components
- [] destroying and re-mounting components
  Maybe wrapping every nested method into a function, which saves the whole function and re-runs it on re-mount could work?
