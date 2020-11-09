import store from '../../store'
import { EventDispatcher, Object3D, Vector2, Raycaster } from 'three'


export default class ToolBuilder extends Object3D {
  #nextQueue = []
  #cache = {
    intersects: null
  }
  isReady = false
  action = null
  
  /*/
   * uncomment to have all tools subscribe automatically
   * subscription = this.subscribe.bind(this)
  /*/
  subscribe () {
    this.subscription = store.subscribeAction(this.#update.bind(this))
    return this
  }

  #update = (action, state) => {
    this.action = action
    this.#clearCache()

    const options = {
      isPreventUpdate: false,
    }


    this.#processNextQueue()
    this.#delegateAction(action, state, options)

    if (!this.isReady) {
      this.isReady = true
      options.isPreventUpdate = true
      return this.ready(state, action, options)
    }

    if (!options.isPreventUpdate) {
      this.update(state, action, options)
    }
  }

  #delegateAction = (action, state, options) => {
    const isAction = this.isAction.bind(this)
    const GLOBAL = true

    // local handlers
    if (isAction('clicked')) {
      this.onClicked(state, action, options)
    } else if (isAction('mouse')) {
      this.onMouseOver(state, action, options)
    }

    //Global handelers
    if (isAction('clicked', GLOBAL)) {
      this.onClick(state, action, options)
    } else if (isAction('mouse', GLOBAL)) {
      this.onMouseMove(state, action, options)
    } else if (isAction('keydown', GLOBAL)) {
      this.onKeyDown(state, action, options)
    } else if (isAction('keyup', GLOBAL)) {
      this.onKeyUp(state, action, options)
    }
  }

  #processNextQueue = action => {
    this.#nextQueue = this.#nextQueue.filter(queued => {
      const { data, callback } = queued
      const isQueuedAction = action.type === queued.action

      if (isQueuedAction) {
        callback(data)
      }
      return !isQueuedAction
    })
  }

  #clearCache = () => {
    Object.keys(this.#cache).forEach(i => this.#cache[i] = null)
  } 

  isAction(eventAction, isGlobal = false) {
    const isAction = 'event/' + eventAction === this.action.type
    const isThis = this.intersects.some(i => {
      return this.getObjectById(i.object.id)
    })

    return isAction && (isThis || isGlobal)
  }
  
  onNext(action, callback, data) {
    const isAllUnique = this.#nextQueue.every(queued => {
      const isUnique = {
        callback: queued.callback.toString() !== callback.toString(),
        action: queued.action !== action
      }

      const r = isUnique.callback || isUnique.action
      return r
    }, this)

    if (isAllUnique) {
      console.log('inserting in to next queue')
      this.#nextQueue.push({
        action,
        callback,
        data
      })
    } else {
      console.log('blocking duplicate onNext action registration [ ', action, ' ] ' )
    }
  }

  get isMouseOver () {
    return this.intersects.length > 0
  }
  
  get intersects() {
    if (this.#cache.intersects === null) {
      this.#cache.intersects = store.state.event.intersects.filter(({ object }) => {
        return this.getObjectById(object.id)
      })
    } 

    return this.#cache.intersects
  }

  get cursorRay() {
    const camera = store.getters['art/camera']
    const raycaster = new Raycaster()
    const mouse = store.state.event.mouse

    const vector = new Vector2(
      (mouse.x / window.innerWidth) * 2 - 1,
      -(mouse.y / window.innerHeight) * 2 + 1
    )

    raycaster.setFromCamera(vector, camera)
    return raycaster
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
