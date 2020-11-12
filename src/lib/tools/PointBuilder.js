import {
  Geometry,
  Group,
  Sprite,
  SpriteMaterial,
  TextureLoader,
  Vector3
} from 'three'
import ToolBuilder from './ToolBuilder'
import BALL_PNG from '../../assets/ball.png'
import store from '../../store'

const ballTexture = new TextureLoader().load(BALL_PNG)
const ballMaterial = new SpriteMaterial({ map: ballTexture })

export default class PointBuilder extends ToolBuilder {
  geometry = new Geometry()
  helpers = new Group()
  #sprite = new Sprite(ballMaterial)
  isEditable = true

  constructor(x, y, z) {
    super()

    if (x && y && z) {
      this.setPoint(x, y, z)
    } else if (!store.state.brush.isLocked) {
      store.dispatch('brush/isLocked', true)
    }

    this.helpers.add(this.sprite)
    this.add(this.helpers)
  }
  
  update() {
    if (this.isComplete) {
      store.dispatch('brush/isLocked', false)
    }
  }

  onClicked() {
    this.isEditable = !this.isEditable
  }

  onMouseMove() {
    if (this.isEditable) {
      this.position.copy(store.getters['event/mouse3D']())
    }
  }

  setPoint(x, y, z) {
    const point = new Vector3(x, y, z)
    this.geometry = new Geometry()
    this.geometry.vertices.push(point)
  }

  get isComplete() {
    return this.geometry.vertices.length > 0
  }

  set sprite(value) {
    this.#sprite.copy(value)
  }

  get sprite() {
    return this.#sprite
  }
}
