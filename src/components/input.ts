import { Component } from '../component'

type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'

export class Input extends Component {
  constructor(type: InputType = 'text') {
    super(document.createElement('input'))

    // @ts-expect-error We know that this will be an input element
    this.el.type = type
  }
}

export function input(type: InputType = 'text') {
  return new Input(type)
}
