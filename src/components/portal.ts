import { Component } from '../component'

export function portal() {
  return () => new Component(document.createElement('template'))
}
