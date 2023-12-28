import { VoidComponent } from '../component'

type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'

export class Input extends VoidComponent {
  constructor(type: InputType = 'text') {
    // @ts-expect-error Due to the implementation, most void tags will not
    // accept any children. But to save the amount of code you need to write, we
    // can allow the most important attribute on `input` to be passed into its
    // constructor.
    super('input')
    // @ts-expect-error We know that this will be an input element
    this.el.type = type
  }
}

export function input(type: InputType = 'text') {
  return new Input(type)
}
