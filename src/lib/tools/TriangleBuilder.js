/* eslint-disable */
import {
  Geometry,
  Face3,
  Vector3,
  LineBasicMaterial,
  MeshStandardMaterial,
  Mesh,
  Group,
  LineLoop,
} from 'three'
import ToolBuilder from './ToolBuilder'
import PointBuilder from './PointBuilder'

const lineMaterial = new LineBasicMaterial({
  color: 0x0000ff
})

const meshMaterial = new MeshStandardMaterial({
  vertexColors: true
})

export default class TriangleBuilder extends ToolBuilder {
  #points = []
  helpers = new Group()
  line = null
  mesh = null
  
  constructor(){
    super()
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
    const normal = new Vector3(0, 0, 1)
    const face = new Face3(0, 1, 2, normal, this.colors)
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
    return this.#points.map(({ position }) => position)
  }

  get geometry () {
    return new Geometry().setFromPoints(this.points)
  }

  get colors () {
    return this.#points.map(({ color }) => color)
  }
}
