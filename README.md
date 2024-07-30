# cascade

I swear this is the last DOM library I make (for now)

Create simple, reusable and reactive UI components using render functions and add more complex functionality through method chaining. These methods can be mounted anywhere in the DOM, static applications, with added reactivity only where needed.

```ts
interface Props {
  // Props can be simple values
  startingCount: number,
  // Or refs
  canIncrement: Ref<boolean>
}

// Define reusable component with props
const CounterComponent = reusable("button", (ctx, props: Props) => {
  const data = ref(props.startingCount)

  ctx.text(() => `Clicked ${data.value} times`)
  ctx.click(() => {
    if (props.canIncrement.value)
      data.value++
  })
})

///////////////

// Use component somewhere
const App = El.div().setup((ctx) => {
  const canIncrement = ref(true)

  // This is the same as adding the children inside the El.div(...children).
  // But being able to define this AFTER defining the component logic is much more ergonomic
  ctx.nest(
    El.h1('Counter'),
    CounterComponent().props({
      // Static prop
      startingCount: 5,
      // Dynamic prop (reactive)
      canIncrement,
    }),
    El.button('Toggle').click(() => canIncrement.value = !canIncrement.value),
  )
})

App.mount('#app')
```
