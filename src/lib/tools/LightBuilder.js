import {
  Geometry,
  Group,
  Sprite,
  SpriteMaterial,
  TextureLoader,
  Vector3
} from 'three'
import PointBuilder from './PointBuilder'
import SUN_PNG from '../../assets/sun.png'

var sunTexture = new TextureLoader().load(SUN_PNG)
var sunMaterial = new SpriteMaterial({ map: sunTexture })

export default class LightBuilder extends PointBuilder {
  geometry = new Geometry()
  helpers = new Group()
  sprite = new Sprite(sunMaterial)
  isEditable = false

  constructor(){
    super()
    console.log('green', SUN_PNG)
  }

  onClicked(){
    this.isEditable = !this.isEditable
  }

  onMouseMove(store) {
    if(this.isEditable) {
      console.log('mouse3', store)
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
}