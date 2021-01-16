import {
  Color,
  Geometry,
  Group,
  Sprite,
  SpriteMaterial,
  TextureLoader,
  Vector2,
  Vector3
} from 'three'

import ToolBuilder from './ToolBuilder'
import BALL_PNG from '../../assets/ball.png'
import store from '../../store'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'

const ballTexture = new TextureLoader().load(BALL_PNG)
const ballMaterial = new SpriteMaterial({ map: ballTexture })


export default class PointBuilder extends ToolBuilder {
  geometry = new Geometry()
  helpers = new Group()
  #sprite = new Sprite(ballMaterial)
  color = new Color()
  isEditable = true
  label = new CSS2DObject()

  constructor(x, y, z) {
    super()

    if (x && y && z) {
      this.setPoint(x, y, z)
    } else if (!store.state.brush.isLocked) {
      store.dispatch('brush/isLocked', true)
    }

    this.helpers.add(this.label)
    this.helpers.add(this.sprite)
    this.add(this.helpers)
  }

  update() {
    // if (this.isComplete) {
    //   store.dispatch('brush/isLocked', false)
    // }

    if (this.isEditable) {
      this.color = store.state.brush.color
    }
  }

  onClicked() {
    this.isEditable = !this.isEditable
  }

  onMouseMove() {
    if (this.isEditable) {
      const { x, z } = store.getters['event/mouse3D']()
      const y = this.position.y
      this.position.copy({ x, y, z })
    }
  }

  setPoint(x, y, z) {
    const point = new Vector3(x, y, z)
    this.geometry = new Geometry()
    this.geometry.vertices.push(point)
  }

  // set point (value) {
  //   const { x, y, z } = value
  //   this.setPoint(x, y, z)
  // }

  get point() {
    const [first] = this.geometry.vertices
    console.log(this.geometry.vertices)
    return first
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

  moveX(value) {
    const { x, y, z } = this.position
    const position = new Vector3(x + value, y, z)
    this.position.copy(position)
  }

  moveY(value) {
    const { x, y, z } = this.position
    const position = new Vector3(x, y + value, z)
    this.position.copy(position)
  }

  moveZ(value) {
    const { y, z, x } = this.point
    this.setPoint(x, y, z + value)
  }

  onKeyDown(action) {
    const key = action.payload.key
    if (this.isMouseOver) {
      switch (key) {
      case 'U':
      case 'u': {
        this.moveY(1)
        break
      }
      case 'D':
      case 'd':
        this.moveY(-1)
        break
      }
    }
  }
}
