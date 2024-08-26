# cascade

I swear this is the last DOM library I make (for now)

Create simple, reusable and reactive UI components using render functions and add more complex functionality through method chaining. These methods can be mounted anywhere in the DOM, static applications, with added reactivity only where needed.

---

## Concept

Create UI components by calling a component function. All supported HTML elements have their own factory function. 

- Provide children when calling the component
- Chain function to extend the functionality

```ts
const button = button("Click me").on("click", () => console.log("I got clicked!!"))
```

Many function allow you to pass a ref or a getter function. These allow you to reactively update the UI. To familiarize yourself with these concepts, read the [Vue documentation on this topic](https://vuejs.org/api/reactivity-core.html).

## Components

There are two ways of creating components. The instanceless and reactive components.

- **Instanceless** components are basic UI. Think of it as scaffolding. For instance `<div class="wrapper"></div>` does not hold any state, it's there to provided a container with some styling, but that's where its journey ends
- **Reusable** the meat of your application. These components for instance provide interactivity and/or fetch data. Based on their state, we want to update the UI.

It is heavily discouraged to reuse instanceless components multiple times. Every single component has an instance.

```ts
const Container = div().className('container')

// In component A
Container.nest(h1('Hello'))
// In component B
Container.nest(h2('World'))
// Both components will have <h2>World</h2> as the `Container` component has just one instance.
```

To create a reusable component, you need to either use the `reusable` function. This will create a unique component instance each time it is used.

```ts
const Container = reusable('div', (ctx, props) => {
  // Create a component which will wrap the provided child nodes in 3 divs
  ctx.nest(
    h1(props.title)
    div(ctx.children).class("wrapper")
  )
})

// Later used in a component
const app = App(
  Container(
    span("Subtitle")
  ).prop('title', "Hello world")
)

app.mount('#app')
```

---

> [!NOTE]
> API docs are work in progress

## API 

Creating a component returns a component instance. This instance contains a few useful properties and a lot of methods.

### Instance
```ts
const ctx = div()

// Unique ID of the component
ctx.identifier
// Reference to the mounted DOM node
ctx.el
// Child component instances
ctx.componentChildren
// Stores child components which were passed during component initialization.
ctx.children
// Reference to the parent component, if there's one
ctx.parent
```

### Content

Type definition. Most functions allow the usage of the following type. Using ref or getter function makes the UI reactive. All the examples below assume you're writing code inside the `setup()` function.

```
type MaybeRefOrGetter<T> = T | Ref<T> | () => T
```

#### `.text()`

Sets the `textContent` of the Component's DOM node

```ts
ctx.text(value: MaybeRefOrGetter<Primitive>)
```
Example
```ts
ctx.text("Hello world")
// Will update text each time `name` ref changes
ctx.text(() => `Hello ${name.value}`)
```

#### `.html()`

Sets the `innerHTML` of the Component's DOM node

```ts
ctx.html(value: MaybeRefOrGetter<Primitive>)
```
Example
```ts
ctx.html("Hello <b>world</b>")
ctx.html(() => SVGIcon.value)
```

#### `.nest()`

Allows nesting of components and HTML elements.

```ts
// NOTE: it is planned to allow refs and getter functions, but that does not work yet.
type ComponentChildren = string | number | Component | Element | Fragment
ctx.nest(...value: ComponentChildren | ComponentChildren[])
```
Example
```ts
ctx.nest(
  h1("Hi"),
  "Hmm",
  document.createElement("input"),
  ctx.children
)
```
---

### Attributes

Reactively bind attributes to the underlying HTML element.

#### `.class()`

Bind static or reactive class / class object.

```ts
type ClassObject = Record<string, MaybeRefOrGetter<boolean>>
type ClassnameOrCLassObject = string | ClassObject

ctx.class(classNames?: ClassnameOrCLassObject, value?: MaybeRefOrGetter<boolean>)
```
Example
```ts
// Single ref class
const largeText = ref(false)
ctx.class("text-xl", largeText)

// Object, which can contain both static and refs/getter functions
ctx.class({
  'will-never-show': false,
  'could-show': () => maybeShow.value && shouldShow.value
})
```

#### `.style()`

Add static or reactive inline styles.

```ts
ctx.style(key: keyof CSSStyle | CSSStyle | MaybeRefOrGetter<CSSStyle>, value?: MaybeRefOrGetter<LimitedPrimitive>)
```
Example
```ts
// Single reactive property using getter function
ctx.style("display", () => show.value ? 'block' : 'none')
// Getter function returning a style object
ctx.style(() => ({
  display: show.value,
  width: width.value + 'px'
}))
// Static style object
ctx.style({
  position: 'relative',
  left: '10px'
})
```

#### `.attr()` & `.attrs()`

Bind static or reactive attributes.

```ts
ctx.attr(key: string, value?: MaybeRefOrGetter<Primitive>)
ctx.attrs(data: MaybeRefOrGetter<Record<string, Primitive>>)
```
Example
```ts
// Single attribute
const dynamicName = ref('element-name')
ctx.attr(name, dynamicName)

// Attribute object
ctx.attrs({
  disabled: true,
  inert: true,
})
```


---

### Conditional rendering

Used when we want to display / hide certain components based on a condition.

#### `.if()`

Conditionally add / remove elements from the DOM.

```ts
ctx.if(expression: MaybeRefOrGetter)
```
Example
```ts
// Inside .setup(() => {})
const display = ref(true)
ctx.nest(
  button("Toggle").click(() => display.value = !display.value)
  span("Now you see me").if(display)
)
```

#### `.show()`

Works just like `if` but leaves the component in the DOM, but appends `display: none` if false.

```ts
ctx.show(expression: MaybeRefOrGetter)
```
