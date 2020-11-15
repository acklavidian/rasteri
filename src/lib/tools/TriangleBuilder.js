/* eslint-disable */
import {
  Geometry,
  BufferGeometry,
  Face3,
  Vector3,
  Vector2,
  LineBasicMaterial,
  MeshNormalMaterial,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Mesh,
  Line,
  Group,
  Points,
  Object3D,
  PointsMaterial,
  TextureLoader,
  Scene,
  CircleGeometry,
  VectorKeyframeTrack,
  LineLoop,
  Side,
  DoubleSide,
  Color
} from 'three'
import ToolBuilder from './ToolBuilder'
import PointBuilder from './PointBuilder'

/* eslint-enable */

const lineMaterial = new LineBasicMaterial({
  color: 0x0000ff
})

const meshMaterial = new MeshStandardMaterial({
  color: 0x00ff00
})

export default class TriangleBuilder extends ToolBuilder {
  #points = []
  helpers = new Group()
  line = null
  mesh = null

  constructor(){
    super()
    console.log('const:', this.cache)
    this.add(this.helpers)
  }

  update() {
    if (this.isComplete) {
      this.drawFace()
      this.drawLine()
    }
  }

  onClick() {
    if (!this.isComplete) {
      const mouse3D = this.store.getters['event/mouse3D']()
      this.addPoint(mouse3D)
    }
  }

  onClicked() {
    if (this.isComplete) {
      let isMesh = false
      const isHelper = this.intersects.some(({ object: i })=> {
        if (i.id === this.mesh.id) {
          isMesh = true
        }
        return this.helpers.getObjectById(i.id)
      })
      console.log('boop gone?', )
      if (isMesh && !isHelper) {
        this.helpers.visible = !this.helpers.visible
      }
    }
  }

  get isComplete() {
    return this.points.length >= 3
  }

  addPoint({ x, y, z }) {
    const point = new PointBuilder(x, y, z).subscribe()
    this.#points.push(point)
    this.helpers.add(point)
  }

  drawFace() {
    const color = new Color(0xffaa00)
    const normal = new Vector3(0, 0, 1)
    const face = new Face3(0, 1, 2, normal, color, 0)
    const geometry = this.geometry
    const mesh = new Mesh(geometry, meshMaterial)

    if (this.mesh === null) {
      this.mesh = mesh
      this.add(this.mesh)
    }

    geometry.faces.push(face)
    geometry.computeFaceNormals()
    geometry.computeVertexNormals()

    this.mesh.copy(mesh)
  }
  
  drawLine() {
    const line = new LineLoop(this.geometry, lineMaterial)

    if (this.line === null) {
      this.line = line
      this.helpers.add(this.line)
    }

    this.line.copy(line)
  }

  get points () {
    return this.#points.map(({ position }) => position )
  }

  get geometry () {
    // if (!(this.#cache.geometry instanceof Geometry)) {
    //   this.#cache.geometry = new Geometry().setFromPoints(this.points)
    // }
    // return this.#cache.geometry
    return new Geometry().setFromPoints(this.points)
  }
}
