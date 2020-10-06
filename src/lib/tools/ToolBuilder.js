import store from '../../store'
import { EventDispatcher, Object3D, Vector2 } from 'three'

export default class ToolBuilder extends Object3D {
  #nextQueue = []
  isReady = false
  action = null

  constructor(...args) {
    super(...args)
    this.subscription = store.subscribeAction(this.delegateAction.bind(this))
  }

  delegateAction(action, state) {
    const isAction = this.isAction.bind(this)
    const GLOBAL = true
    this.action = action

    const options = {
      preventUpdate: false
    }

    //need to call delegate action on update
    this.#nextQueue = this.#nextQueue.filter(queued => {
      const { data, callback } = queued
      const isQueuedAction = action.type === queued.action.type

      if (isQueuedAction) {
        // why isn't onNext callback firing
        console.log('queue callback:')
        callback(data).bind(this)
      }

      return !isQueuedAction
    })

    if (!this.isReady) {
      this.ready(state, action)
      this.isReady = true
    }

    // local handlers
    if (isAction('clicked')) {
      this.onClicked(state, action, options)
    } else if (isAction('move')) {
      this.onMouseOver(state, action, options)
    }

    //Global handelers
    if (isAction('clicked', GLOBAL)) {
      this.onClick(state, action, options)
    } else if (isAction('move', GLOBAL)) {
      this.onMouseMove(state, action, options)
    } else if (isAction('keydown', GLOBAL)) {
      this.onKeyDown(state, action, options)
    } else if (isAction('keyup', GLOBAL)) {
      this.onKeyUp(state, action, options)
    }

    this.update(state, action, options)
  }

  isAction(eventAction, isGlobal = false) {
    const isAction = 'event/' + eventAction === this.action.type
    const isThis = this.intersections.some(i => {
      return this.getObjectById(i.object.id)
    })

    return isAction && (isThis || isGlobal)
  }

  get isMouseOver() {
    return this.intersections.some(i => this.getObjectById(i.object.id))
  }

  onNext(action, callback, data) {
    const isUnique = this.#nextQueue.every(queued => {
      const isUnique = {
        callback: queued.callback.toString() !== callback.toString(),
        action: queued.action.type !== action.type
      }

      const r = isUnique.callback || isUnique.action
      console.log('is uniq: ', isUnique, action.type, queued.action.type)
      return r
    }, this)

    console.log('on next dup: ', isUnique, this.#nextQueue.length)

    if (isUnique) {
      console.log('inserting to next queue')
      this.#nextQueue.push({
        action,
        callback,
        data
      })
    }
  }

  get intersections() {
    const camera = store.getters['art/camera']
    const raycaster = store.state.art.raycaster
    const mouse = store.state.event.mouse

    const vector = new Vector2(
      (mouse.x / window.innerWidth) * 2 - 1,
      -(mouse.y / window.innerHeight) * 2 + 1
    )

    raycaster.setFromCamera(vector, camera)
    return raycaster.intersectObjects(this.children, true)
  }

  ready() {}
  update() {}
  onClick() {}
  onClicked() {}
  onMouseMove() {}
  onMouseOver() {}
  onKeyDown() {}
  onKeyUp() {}
}
