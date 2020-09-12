import store from '../../store'
import { Object3D } from 'three'

export default class ToolBuilder extends Object3D {
  unsubscribe = store.subscribeAction(this.delegateAction.bind(this))
  isReady = false

  delegateAction(action, state) {
    if (!this.isReady) {
      this.ready(state, action)
      this.isReady = true
    } else if (action.type === 'art/clicked') this.onClick(state, action)
    else if (action.type === 'art/mouse') this.onMouseMove(state, action)
    else if (action.type === 'art/keydown') this.onKeyDown(state, action)
    else if (action.type === 'art/keyup') this.onKeyUp(state, action)
    this.update(state, action)
  }

  ready() {}
  update() {}
  onClick() {}
  onMouseMove() {}
  onKeyDown() {}
  onKeyUp() {}
}
