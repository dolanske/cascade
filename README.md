# cascade

I swear this is the last DOM library I make (for now)

Create simple, reusable and reactive UI components using render functions and add more complex functionality through method chaining. These methods can be mounted anywhere in the DOM, static applications, with added reactivity only where needed.

```bash
npm i @dolanske/cascade
```

---

## Concept

Create UI components by calling a component function. All supported HTML elements have their own factory function.

- Provide children when calling the component
- Chain functions to extend the functionality

```ts
const clickMe = button('Click me').on('click', () => console.log('I got clicked!!'))
```

Many functions allow you to pass a ref or a getter function. These allow you to reactively update the UI. To familiarize yourself with these concepts, read the [Vue documentation on this topic](https://vuejs.org/api/reactivity-core.html).

## Components

There are two ways of creating components. The instanceless and reusable components.

- **Instanceless** components are basic UI. Think of it as scaffolding. For instance `<div class="wrapper"></div>` does not hold any state, it's there to provide a container with some styling, but that's where its journey ends
- **Reusable** the meat of your application. These components for instance provide interactivity and/or fetch data. Based on their state, we want to update the UI.

It is heavily discouraged to reuse instanceless components multiple times. Every single component has an instance and can only be rendered in one place at a time.

```ts
const Container = div().class('container')

// In component A
Container.nest(h1('Hello'))
// In component B
Container.nest(h2('World'))
// Both components will have <h2>World</h2> as the `Container` component has just one instance.
```

To create a reusable component, use the `reusable` function. This will create a unique component instance each time it is used.

```ts
const Container = reusable('div', (ctx, props) => {
  // Create a component which will wrap the provided child nodes in 3 divs
  ctx.nest(
    h1(props.title),
    div(ctx.children).class('wrapper')
  )
})

// Later used in a component
const app = App(
  Container(
    span('Subtitle')
  ).prop('title', 'Hello world')
)

app.mount('#app')
```

### Typed props and events

Both `reusable` and every component factory accept two type arguments: the props and a map of custom events the component emits.

```ts
interface Props { user: User }
interface Events { remove: { id: number } }

const Row = reusable<Props, Events>('li', (ctx, props) => {
  ctx.nest(
    span(() => props.user.name),
    // Payload is type checked against `Events['remove']`
    button('×').click(() => ctx.emit('remove', { id: props.user.id })),
  )
})

// Event name and payload are typed on the instance
Row().props({ user }).on('remove', (event, { id }) => remove(id))
```

---

## Rendering

Cascade has no virtual DOM. Every child you pass to a component becomes a *block*, a range of DOM nodes which knows how to update and destroy itself. Reactive children, `.for()` lists and fragments all share one keyed reconciler, so when a source changes only the affected blocks are touched.

### Children

Everything below can be passed as a child, either directly or nested inside arrays.

```ts
type ComponentChildrenItems =
  | string | number | bigint     // rendered as a text node
  | boolean | null | undefined   // render nothing, so `cond && span('hi')` works
  | Component | Fragment
  | Node                         // any DOM node
  | Ref<any>                     // ref / computed resolving to any of the above
  | (() => ComponentChildren)    // getter resolving to any of the above
  | ComponentChildrenItems[]
```

Refs, computeds and getters are re-rendered whenever a value they read changes. Text is updated in place, everything else is reconciled.

```ts
const name = ref('world')
const items = ref(['a', 'b'])

div(
  'Hello ',
  name,                                        // "world", updates when the ref changes
  computed(() => name.value.length),           // computed values
  () => name.value.length > 3 && b('long'),    // getters returning components
  () => items.value.map(item => li(item).key(item)),  // getters returning lists
)
```

Use `.key()` on components returned from a getter so they are moved instead of re-created when the list changes. For large or frequently changing lists prefer `.for()`, it tracks every item individually.

### Batching

Structural updates (lists and reactive children) are batched into a microtask, so mutating a list a hundred times in one tick results in a single DOM patch. Property bindings like `.text()` or `.class()` are applied synchronously.

```ts
import { flushSync, nextTick } from '@dolanske/cascade'

items.value.push('new')
await nextTick()   // DOM is patched
// or
flushSync()        // apply pending updates right now
```

---

> [!NOTE]
> API docs are work in progress

## API

Creating a component returns a component instance. This instance contains a few useful properties and a lot of methods. Every method returns the instance, so they can be chained.

### Instance

```ts
const ctx = div(span('hi'))

// Unique ID of the component
ctx.identifier
// Reference to the DOM node
ctx.el
// Children which will be rendered. Replaced by `.nest()`
ctx.componentChildren
// Children which were passed during component initialization. Use them in `.nest()` to create a slot
ctx.children
// Reference to the parent component, if there's one
ctx.parent
```

### Content

Type definition. Most functions allow the usage of the following type. Using a ref or getter function makes the UI reactive. All the examples below assume you're writing code inside the `setup()` function.

```ts
type MaybeRefOrGetter<T> = T | Ref<T> | (() => T)
```

#### `.text()`

Sets the `textContent` of the Component's DOM node. Applied when the component is initialized.

```ts
ctx.text(value: MaybeRefOrGetter<Primitive>)
```
Example
```ts
ctx.text('Hello world')
// Will update text each time `name` ref changes
ctx.text(() => `Hello ${name.value}`)
```

#### `.html()`

Sets the `innerHTML` of the Component's DOM node

```ts
ctx.html(value: MaybeRefOrGetter<string>)
```
Example
```ts
ctx.html('Hello <b>world</b>')
ctx.html(() => SVGIcon.value)
```

#### `.nest()`

Replaces the component's children. Accepts everything a component factory accepts (see [Children](#children)).

```ts
ctx.nest(...value: ComponentChildren | ComponentChildren[])
```
Example
```ts
ctx.nest(
  h1('Hi'),
  'Hmm',
  document.createElement('input'),
  () => loading.value ? Spinner() : Content(),
  ctx.children
)
```

#### `.for()`

Iterate over the provided array / object / number and render the value returned from the callback for each item. The list replaces the component's children, so don't combine `.for()` with `.nest()` or `.text()` on the same component.

```ts
type Source = any[] | number | object

// Array
ctx.for(source: MaybeRefOrGetter<T[]>, (item: T, index: number) => Child, options?: { key?: (item, index) => Key })
// Number
ctx.for(source: MaybeRefOrGetter<number>, (index: number) => Child)
// Object
ctx.for(source: MaybeRefOrGetter<T>, (value: T[keyof T], key: string, index: number) => Child, options?: { key?: (value, key, index) => Key })
```

Example
```ts
ctx.for(['One', 'Two', 'Three'], (item, index) => {
  return li(`${index + 1} ${item}`)
})
```

##### Keys

When the source changes the list is reconciled: items which were added are rendered, removed ones destroyed and the rest kept. Give each item a key so it can be recognised after it moved. A key can be provided in two ways:

```ts
// 1. On the rendered component. The callback runs for every item on each
//    update, results for known keys are discarded.
ctx.for(users, user => Row().props({ user }).key(user.id))

// 2. Through the `key` option. The callback only runs for new items, which is
//    the fastest option for very large lists.
ctx.for(users, user => Row().props({ user }), { key: user => user.id })
```

Rules for reuse, in order:

- Object sources use the property name as the key, number sources the index.
- Without a key, array items are matched by index and then by identity, so removing an item from the middle does not re-create the ones after it. Lists of objects without keys log a warning once.
- An item is only reused when it is the same value as before (`Object.is`). Replacing an object (`items.value = items.value.map(i => ({ ...i }))`) re-renders that item.
- If the callback declares the `index` parameter, its output depends on the position, so an item whose index changed is rendered again. Omit the parameter if you don't need it.

##### Granular updates

Every item runs inside its own tracked effect. Reactive values read directly in the callback re-render just that item, getters passed to methods update in place without touching the item at all:

```ts
const items = ref([{ id: 1, label: 'a' }])

// `item.label` is read in the callback: changing it re-creates this one <li>
ctx.for(items, item => li(item.label).key(item.id))
// `item.label` is read by a getter: changing it only updates the text
ctx.for(items, item => li(() => item.label).key(item.id))

items.value[0].label = 'b'   // only the first item is touched, nothing else runs
```

---

### Events

Register event listeners.

#### `.on()`

Bind an event listener to the underlying HTML node. Native events are typed by their name, custom events by the payload declared on the component (see [Typed props and events](#typed-props-and-events)). The listener is removed when the component is destroyed.

```ts
interface EventConfig {
  options?: AddEventListenerOptions
  modifiers?: EventModifier[]
}

ctx.on(type: string, listener: (event, payload) => void, config?: EventConfig)
```

```ts
ctx.on('click', (e) => {
  e.stopPropagation()
  clicked.value = true
})
```

By using `.on` you can also listen for sub-component emits. The `.emit` method is a shorthand for creating and dispatching a bubbling custom event from the component HTML node.

```ts
// Child component
ctx.emit('someData', { name: 'test' })

// Somewhere up in the component chain. Annotate the payload when the parent
// does not declare the event itself
ctx.on('someData', (event, data: { name: string }) => {
  // data = { name : 'test' }
})
```

#### Modifiers

Modifiers run before the listener and can cancel it. They run synchronously unless one of them returns a promise, so `event.preventDefault()` inside the listener still works.

```ts
import { Modifier } from '@dolanske/cascade'

ctx.click(submit, { modifiers: [Modifier.prevent, Modifier.once] })

Modifier.if(expression)       // only run when the ref / getter / boolean is truthy
Modifier.throttle(ms)         // ignore events fired within `ms` of the last run
Modifier.delay(ms)            // wait before running
Modifier.once                 // run once
Modifier.self                 // only when the event target is the element itself
Modifier.stop                 // stopPropagation()
Modifier.stopImmediate        // stopImmediatePropagation()
Modifier.prevent              // preventDefault()
Modifier.cancel               // never run
```

#### Event shorthands

A few event definition shorthands are available to make development faster

```ts
ctx.click(listener: ListenerFn, config?: EventConfig)
ctx.submit(listener: ListenerFn, config?: EventConfig)
ctx.focus(listener: ListenerFn, config?: EventConfig)
ctx.blur(listener: ListenerFn, config?: EventConfig)
ctx.change(listener: ListenerFn, config?: EventConfig)
ctx.input(listener: ListenerFn, config?: EventConfig)
```

#### Keyboard events

Detect keyboard presses on the component.

```ts
ctx.keydown(listener: ListenerFn, config?: EventConfig)
ctx.keyup(listener: ListenerFn, config?: EventConfig)
ctx.keypress(listener: ListenerFn, config?: EventConfig)
```

You can also listen for a specific key combination using the `exact` suffix.
The options object also receives a new property called `detect` which can be set to `every` or `some`. The default is `every` and it controls whether the function detects keys in the exact order, or any of the provided keys.

```ts
ctx.keydownExact(requiredKeyOrKeys: string | string[], listener: ListenerFn, config?: EventConfig & KeyInputOptions)
ctx.keyupExact(requiredKeyOrKeys: string | string[], listener: ListenerFn, config?: EventConfig & KeyInputOptions)
ctx.keypressExact(requiredKeyOrKeys: string | string[], listener: ListenerFn, config?: EventConfig & KeyInputOptions)
```
Example
```ts
ctx.keypressExact(['Shift', 'A'], () => {
  // Fired when SHIFT and A are pressed in succession
})

ctx.keypressExact(['A', 'B', 'C'], () => {
  // Fired whenever A, B or C are pressed
}, { detect: 'some' })
```

#### `.model()`

Two way binding to control an element's value with a ref. You can use `model()` on `input`, `select`, `textarea` and `details`.

You can also add a model to a Component, but please note it will only pass it as an additional, untyped prop called `modelValue`. So this usage is heavily discouraged. You can simply pass the ref as a prop and it will already be two way bound, as they are passed `as is` meaning the ref you give to a component is the exact same one from the parent. There's no inbetween.

```ts
// A function which transforms the value of the element before it's assigned to the provided ref
type ModelTransform<In = any, Out = any> = (value: In) => Out

interface ModelOptions {
  lazy?: boolean          // listen to `change` instead of `input`
  debounce?: number       // wait for `ms` after the last input before updating the ref
  transforms?: ModelTransform[]
  eventOptions?: AddEventListenerOptions
}

ctx.model(value: Ref<Primitive | Primitive[]>, options?: ModelOptions)
```

The implementation follows the [basic usage](https://vuejs.org/guide/essentials/forms#basic-usage) of Vue's `v-model` implementation.

Additionally, you can control whether the `<details>` element is open using `model` by providing it a `Ref<boolean>`.

Built in transforms:

```ts
import { Transform } from '@dolanske/cascade'

Transform.trim
Transform.number              // Number(value)
Transform.integer             // parseInt(value, 10)
Transform.uppercase
Transform.lowercase
Transform.capitalize
Transform.capitalizeAll
Transform.truncate(length)
Transform.clamp(min, max)     // use after `number`
Transform.replace(pattern, replacement)
Transform.fallback(value)     // used when the value is empty, null or NaN

ctx.model(age, { transforms: [Transform.number, Transform.clamp(0, 120)] })
```

---

### Attributes

Reactively bind attributes to the underlying HTML element.

#### `.class()`

Bind static or reactive classes. Strings may contain multiple classes.

```ts
type ClassObject = Record<string, MaybeRefOrGetter<boolean>>
type ClassValue = string | ClassObject | ClassValue[] | null | undefined | false

ctx.class(classNames: ClassValue | MaybeRefOrGetter<ClassValue>, value?: MaybeRefOrGetter<boolean>)
```
Example
```ts
// Static classes
ctx.class('btn btn-primary')

// Single reactive class
const largeText = ref(false)
ctx.class('text-xl', largeText)

// Object, which can contain both static and refs/getter functions
ctx.class({
  'will-never-show': false,
  'could-show': () => maybeShow.value && shouldShow.value
})

// Getter returning any class value. Classes which disappear are removed
ctx.class(() => [theme.value, { active: isActive.value }])
```

#### `.style()`

Add static or reactive inline styles. Both `camelCase` and `kebab-case` properties work, `null` removes a property.

```ts
ctx.style(key: keyof CSSStyle | MaybeRefOrGetter<CSSStyle>, value?: MaybeRefOrGetter<string | number | null>)
```
Example
```ts
// Single reactive property using getter function
ctx.style('display', () => show.value ? 'block' : 'none')
// Getter function returning a style object
ctx.style(() => ({
  backgroundColor: color.value,
  width: `${width.value}px`
}))
// Static style object, values can be refs
ctx.style({
  position: 'relative',
  left: offset
})
```

#### `.attr()` & `.attrs()`

Bind static or reactive attributes. `true` sets an empty attribute, `false` removes it. Attributes missing from an updated `.attrs()` object are removed.

```ts
ctx.attr(key: string, value?: MaybeRefOrGetter<Primitive>)
ctx.attrs(data: MaybeRefOrGetter<Record<string, Primitive>>)
```
Example
```ts
// Single attribute
const dynamicName = ref('element-name')
ctx.attr('name', dynamicName)

// Attribute object
ctx.attrs({
  disabled: true,
  inert: true,
})
```

#### Attribute shorthands

```ts
ctx.id(value: MaybeRefOrGetter<Primitive>) // id attribute
ctx.disabled(value?: MaybeRefOrGetter<boolean>) // disabled attribute, defaults to true
```

---

### Conditional rendering

Used when we want to display / hide certain components based on a condition.

#### `.if()`

Conditionally add / remove elements from the DOM. Works anywhere, including inside `.for()` lists. While the condition is falsy the element is detached and the component's watchers are paused. The instance is kept, so toggling back is cheap and everything catches up on the latest values.

```ts
ctx.if(condition: MaybeRefOrGetter)
```
Example
```ts
// Inside .setup(() => {})
const display = ref(true)
ctx.nest(
  button('Toggle').click(() => display.value = !display.value),
  span('Now you see me').if(display)
)
```

For an `if / else` use a getter child instead:

```ts
ctx.nest(() => loggedIn.value ? Dashboard() : LoginForm())
```

#### `.show()`

Works just like `if` but leaves the component in the DOM, but appends `display: none` if false.

```ts
ctx.show(condition: MaybeRefOrGetter)
```

---

### Lifecycle

Hooks which can execute code at different stages of component's life cycle. All hooks return the instance and can be chained.

#### `.onInit()`

Executes provided callback function when the component is initialized, before being inserted into the DOM. Reactive bindings are created at this point.

```ts
ctx.onInit(callback: () => void)
```

#### `.onMount()`

Fires the provided callback when the Component is mounted to the DOM. A function returned from the callback runs on destroy.

```ts
ctx.onMount(callback: () => void | (() => void))
```
Example
```ts
ctx.onMount(() => {
  const interval = setInterval(tick, 1000)
  return () => clearInterval(interval)
})
```

#### `.onBeforeDestroy()`

Fires right before the component is removed from the DOM, while its element is still attached.

```ts
ctx.onBeforeDestroy(callback: () => void)
```

#### `.onDestroy()`

Fires the provided callback when the Component is removed from the DOM and all of its watchers have been stopped.

```ts
ctx.onDestroy(callback: () => void)
```

#### `.onVisibilityChange()`

Fires whenever `.if()` or `.show()` toggles the component.

```ts
ctx.onVisibilityChange(callback: (visible: boolean) => void)
```

---

### Utilities

```ts
// Mounts the Component to the DOM. Accepts a selector or an element, defaults to `body`
ctx.mount(target?: string | Element)
// Destroys the component instance and removes it from the DOM. A destroyed
// component can be rendered again, its setup and bindings are re-created.
ctx.destroy()
// Identifies the component in lists, see `.for()`
ctx.key(value: string | number | symbol)
// Returns the component instance associated with a DOM element
getInstance(element)
// Wait for pending list updates / apply them immediately
await nextTick()
flushSync()
```

---

## Components

Cascade divides all of its components into two groups

- **normal**
- **void** (can't have children)

There are a few custom components which extend the base functionality

### Image

```ts
const image = img(src?: MaybeRefOrGetter<string>)
image.alt(alt: MaybeRefOrGetter<string>)
image.src(src: MaybeRefOrGetter<string>)
image.loading(value: MaybeRefOrGetter<'lazy' | 'eager'>)
```

### Input & Textarea

```ts
// The first argument is the input type
const text = input('text')
// Extra attributes
text.type(inputType: string)
text.value(value: MaybeRefOrGetter<Primitive>)
text.placeholder(value: MaybeRefOrGetter<string | undefined>)
text.name(value: MaybeRefOrGetter<string | undefined>)
text.required(value?: MaybeRefOrGetter<boolean>)
text.checked(value?: MaybeRefOrGetter<boolean>)
text.min(value: MaybeRefOrGetter<Primitive>)
text.max(value: MaybeRefOrGetter<Primitive>)
text.step(value: MaybeRefOrGetter<Primitive>)
text.autofocus(value?: MaybeRefOrGetter<boolean>)
```

```ts
// No arguments provided during initialization. Otherwise shares all the extra props as `input`.
const area = textarea()
```

### Option

Used within the `select` component.

```ts
option(label?: MaybeRefOrGetter<Primitive>, value?: MaybeRefOrGetter<Primitive>)
  .value(inputValue: MaybeRefOrGetter<Primitive>)
  .selected(value?: MaybeRefOrGetter<boolean>)
```

Example

```ts
const selected = ref()
const picker = select(
  option('John', 24).selected(),
  option('Andrew', 81),
  option('Honza', 111)
).model(selected)
// ref's value will be 24 as an option was preselected
```

### Fragment

Renders its children without a wrapping element.

```ts
fragment(span('a'), span('b'))
```

---

## Development

```bash
npm run dev     # playground in `src/test.ts`
npm test        # unit tests (vitest + happy-dom)
npm run build
```

`BENCH=1 npx vitest run tests/perf.test.ts` renders a few thousand rows of nested components and prints timings for common list operations.

---

## Changes in the rendering rewrite

The renderer was rewritten around blocks and a keyed reconciler. Most code keeps working, the following is different.

**New**

- Refs, computeds and getters are accepted as children everywhere (`span(name)`, `div(() => cond.value && Panel())`). Booleans, `null` and `undefined` render nothing.
- `.key()` on components and the `key` option of `.for()`.
- `.for()` reconciles lists instead of re-rendering them, tracks every item in its own effect and batches updates. `nextTick()` and `flushSync()` are exported.
- Typed emits: `reusable<Props, Events>` / `Component<Props, Events>` type `.emit()` and `.on()`.
- Lifecycle: `onBeforeDestroy()`, `onVisibilityChange()`, `onMount()` cleanup functions. Hooks return the instance.
- `.if()` works inside `.for()` items and on root components, and pauses the hidden subtree.
- `.class()` accepts arrays, multi-class strings and getters returning any class value. `.style()` accepts `camelCase` properties. `.attrs()` removes attributes which disappeared.
- `.model()` `debounce` option. `Transform.integer`, `clamp`, `replace`, `fallback`. `Modifier.self`.
- `.mount()` accepts an element. Destroyed components can be rendered again.
- `input().checked()`, `.min()`, `.max()`, `.step()`, `.autofocus()`, `img().loading()`, `option().selected(ref)`. `img()` no longer requires a source.
- `dialog` and `varElement` element factories (`var` is a reserved word, so the `<var>` factory is exported as `varElement`).

**Changed**

- Text children are rendered as text nodes. Previously a single string child was assigned to `innerHTML`.
- `.text()`, `.html()`, `.id()` and friends apply when the component is initialized (on render), not when they are chained.
- `.for()` clears the component's other children. Structural updates are asynchronous, `await nextTick()` before reading the DOM.
- Methods live on the prototype instead of being copied onto every instance.
- `componentChildren` and `children` are always arrays.
- `identifier` is a short counter based id. `createId()` is still exported for user code.
- Event listener `options` are `AddEventListenerOptions`. Modifiers run synchronously when they don't return promises.
- Custom event options passed to `.emit()` are merged with `bubbles: true` instead of replacing it.
- Only one `.if()` per component. `.if()` is not supported on fragments, use a getter child.

**Removed**

- `Component.clone()`. Use `reusable()` to create multiple instances, or destroy and mount the same instance again when only one copy is ever on screen (routers): `view.destroy(); view.props(next).mount(target)` re-runs `setup` with fresh state.
- Internal `$rerunSetup()`, `$closeScopes()`, `$scopes`. Every component has a single effect scope, `$scope`.

**Fixed**

- Lists leaked every watcher of previous renders and re-rendered the entire list synchronously on any nested change. `reverse()` on a 50 item list took seconds.
- The root component's `setup` ran twice.
- `.if()` did nothing inside `.for()` lists.
- `.style('key', ref)` and refs inside style objects never applied their initial value. `camelCase` properties were ignored.
- `.class('a b')` threw. `.select().model()` never updated the element from the ref.
- `keypress()` listened to `keyup`. `keydownExact('Enter')` ignored the key after any other key was pressed.
- `Transform.lowercase` uppercased, `Transform.capitalizeAll` did nothing.
- `getInstance()` never found an instance. `content` and `shadow` were exported as `undefined`.
- Checkbox models with array values toggled instead of following the checked state.
- Async modifiers made every listener asynchronous, breaking `preventDefault()`.
