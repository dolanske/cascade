# cascade

I swear this is the last DOM library I make (for now)

Create simple, reusable and reactive UI components using render functions and add more complex functionality through method chaining. These methods can be mounted anywhere in the DOM, static applications, with added reactivity only where needed.

## Components

There are two ways of creating components. The instanceless and reactive components.

- **Instanceless** components are basic UI. Think of it as scaffolding. For instance `<div class="wrapper"></div>` does not hold any state, it's there to provided a container with some styling, but that's where its journey ends
- **Reusable** the meat of your application. These components for instance provide interactivity and/or fetch data. Based on their state, we want to update the UI.

It is heavily discouraged to reuse instanceless components multiple times. Every single component has an instance.

```ts
const Container = div().className("container")

// In component A
Container.nest(h1("Hello"))
// In component B
Container.nest(h2("World"))
// Both components will have <h2>World</h2> as the `Container` component has just one instance.
```

To create a reusable component, you need to either use the `reusable` function. This will create a unique component instance each time it is used.

```ts
const Container = reusable('div', (ctx, props) => {
  // Create a component which will wrap the provided child nodes in 3 divs
  ctx.nest(div(div(props.children)))
})

// Later used in a component
App(
  Container().prop('children', h1("Hello world"))
).mount("#app")
```
---

> [!NOTE]  
> API docs are work in progress

## API

Each component instance exposes a plethora of useful methods. These are largely inspired from Vue and how it works, so you will notice a lot of overlap.

...

## Components

...