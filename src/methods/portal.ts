import { Component } from "../component";

export function portal(
  this: Component, 
  portalTarget: string | (() => string),
) {
  this.onInit(() => {
    portalTarget
  })
}