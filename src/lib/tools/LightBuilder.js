import {
  Geometry,
  Group,
  PointLight,
  Sprite,
  SpriteMaterial,
  TextureLoader,
  Vector3
} from 'three'
import SUN_PNG from '../../assets/sun.png'
import PointBuilder from './PointBuilder'

var sunTexture = new TextureLoader().load(SUN_PNG)
var sunMaterial = new SpriteMaterial({ map: sunTexture })

export default class LightBuilder extends PointBuilder {
  geometry = new Geometry()
  helpers = new Group()
  isEditable = false

  constructor(){
    super()
    this.light = new PointLight(0xffffff, 1.5, 20)
    this.add(this.light)
    this.sprite = new Sprite(sunMaterial)
  }

  onKeyDown({ payload: { key } }) {
    if (key === 'r') {
      this.isEditable = true
    }
  }

  onKeyUp({ payload: { key }}) {
    if (key === 'r') {
      this.isEditable = false
    }
  }

  onMouseMove() {
    if(this.isEditable) {
      const targetZ = this.position.y || 1
      this.position.copy(this.store.getters['event/mouse3D'](targetZ))
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