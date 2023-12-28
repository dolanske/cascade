# cascade

Create simple, reusable and reactive UI components using render functions and add more complex functionality through method chaining. These methods can be mounted anywhere in the DOM, static applications, with added reactivity only where needed.

I am so sorry guys, after creating my own jQuery and Alpine.js, I think it is time I just make my own version of jsx.

```ts
// Using Vue's reactivity API
const count = ref(0)

const Counter = El.fragment([
  El.button('Increment').click(() => count.value++),
  El.span(() => count.value)
])

// Any component can be mounted anywhere in the dom.
Counter.mount('#app')
```

## TODO

This project started during Christmas, without much thinking through. So far it's been fun and smooth sailing. If this syntax is viable is something future me needs to worry about.

- [] Props
  - [] Add passing static data into components
  - [] make props accept refs for reactivity and watch for them
  - [] Correctly type props (using the builder TS pattern)
- [] else() / elseif() (just complete if() implementation)
- [] for()
- [] show()
- [] attr()
- [] style()
- [] destroying and re-mounting components
  Maybe wrapping every nested method into a function, which saves the whole function and re-runs it on re-mount could work?
