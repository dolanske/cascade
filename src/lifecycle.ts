// Iterate over a component and all of its desendands and stop all of their

import { Component } from './component'
import { isArray } from './util'

// reactive watchers. Then remove the root element. Deactivate component
export function destroy(component: Component<any>) {
  function stop(comp: Component<any>) {
    if (!(comp instanceof Component))
      return

    comp.$runOnDestroy()

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

  component.$runOnDestroy()
  component.$closeScopes()

  // Remove root
  component.el.remove()
}
