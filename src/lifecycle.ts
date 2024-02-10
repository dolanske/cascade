// Iterate over a component and all of its desendands and stop all of their

import { Component } from './component'
import { isArray } from './util'

// reactive watchers. Then remove the root element. Deactivate component
export function destroy(component: Component) {
  function stop(comp: Component) {
    if (!(comp instanceof Component))
      return

    for (const cb of comp.onDestroyCbs)
      cb()

    const { children } = comp

    if (children instanceof Component) {
      stop(children)
    }
    else if (isArray(children)) {
      for (const child of children) {
        if (child instanceof Component)
          stop(child)
      }
    }
  }

  stop(component)
  component.el.remove()
  component.__stopWatchers()
}
