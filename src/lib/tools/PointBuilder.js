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
  sprite = new Sprite(ballMaterial)
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
  
  ready(state){
    console.log('ready', state.art.scene)
  }

  onMouseMove() {
    console.log('moving da mouse')
    if(this.isEditable) {
      // this.position.copy(store.)
    }
  }

  onMouseOver() {
    console.log('mousing over')
  }

  onClick(a) {
    console.log('clicked something', a)
  }

  onClicked() {
    this.isEditable = !this.isEditable
    console.log('onClicked Hit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  }

  setPoint(x, y, z) {
    const point = new Vector3(x, y, z)
    this.geometry = new Geometry()
    this.geometry.vertices.push(point)
  }

  get isComplete() {
    return this.geometry.vertices.length > 0
  }
}
