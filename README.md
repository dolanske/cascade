# cascade

I swear this is the last DOM library I make (for now)

Create simple, reusable and reactive UI components using render functions and add more complex functionality through method chaining. These methods can be mounted anywhere in the DOM, static applications, with added reactivity only where needed.

## Example

```ts
import { div, h1, reusable } from "@dolanske/cascade"

// Define a reusable button component
interface Props {
  startingCount: number,
}

const Counter = reusable("button", (ctx, props: Props) => {
  // Reactive variable (see vue's reactivity)
  const count = ref(props.startingCount)
  // Reactively set the text content of the component
  ctx.text(() => `Clicked ${count.value} times`)
  // Attach event listener for a click
  ctx.click(() => count.value++)
})

///////////////

// Instance-less components (stupid components, such as just nesting random HTML
// elements) do not need to be defined via `reusable` function, but once you add
// reactive state please remember, they will be used as a single instance

const App = div()
  .setup((ctx) => {
    // Nest elements inside
    ctx.nest(
      h1('Counter'),
      // Reusable components 
      Counter().props({ startingCount: 5 }),
    )
  })

// App entry does not need to be reusable, hence we can define it as dumb
// component and use once. 
App.mount('#app')
```
---

## API

Each component instance exposes plethora

## Custom components

Cascade has a few custom components.