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
  LineLoop
} from 'three'
import ToolBuilder from './ToolBuilder'
import store from '../../store'
/* eslint-enable */

export default class TriangleBuilder extends ToolBuilder {
  #coordinates = []
  helpers = new Group()
  edges = new Group()
  isEditable = false
  selected = null
  line = null
  face = null

  constructor() {
    super()

    this.add(this.helpers)
    this.add(this.edges)
  }

  update() {
    const [one, two, three] = this.helpers.children.map(i => {
      if (this.selected === i) {
        i.material.color.set(0x00ffff)
      } else {
        i.material.color.set(0x00ff00)
      }
      return i.position
    })

    if (this.isComplete) {
      this.computeEdges([one, two, three])
      this.computeFace([one, two, three])
    }
  }

  onClick() {
    const mouse3D = store.getters['art/mouse3D']()
    const [{ object: closest } = {}] = this.intersections
    // debugger // eslint-disable-line

    if (this.isComplete) {
      if (closest !== this.selected) {
        this.selected = closest
        closest?.material.color.set(0x0000ff)
      } else {
        this.selected = null
        closest?.material.color.set(0x00ffff)
      }
    } else {
      this.addCoordinate(mouse3D)
    }
  }

  get isComplete() {
    return this.#coordinates.length > 2
  }

  computeFace([one, two, three]) {
    const material = new MeshStandardMaterial({ color: 0x0ff000 })
    const geometry = new Geometry().setFromPoints([one, two, three])

    if (this.face?.geometry) {
      this.face.geometry.dispose()
      this.remove(this.face)
    }

    geometry.faces.push(new Face3(0, 1, 2))
    this.face = new Mesh(geometry, material)
    geometry.computeFaceNormals()
    this.add(this.face)
  }

  computeEdges([one, two, three]) {
    const material = new LineBasicMaterial({ color: 0x0ff0ff, linewidth: 30 })
    const geometry = new Geometry().setFromPoints([one, two, three])

    if (this.line?.geometry) {
      this.line.geometry.dispose()
      this.remove(this.line)
    }

    this.line = new LineLoop(geometry, material)
    this.add(this.line)
  }

  addCoordinate({ x, y, z }) {
    const geometry = new CircleGeometry(0.5, 20)
    const material = new MeshBasicMaterial({ color: 0x00fffff })
    const marker = new Mesh(geometry, material)

    marker.position.copy(new Vector3(x, 0, z))
    marker.lookAt(new Vector3(x, 1, z))
    this.helpers.add(marker)
    this.#coordinates.push(marker)
  }

  onMouseMove() {
    if (this.selected) {
      const { y } = this.selected.position
      const { x, z } = store.getters['art/mouse3D']()
      const position = new Vector3(Math.round(x), Math.round(y), Math.round(z))
      this.selected.position.copy(position)
    }
  }

  get intersections() {
    const camera = store.getters['art/camera']
    const raycaster = store.state.art.raycaster
    const mouse = store.state.art.mouse

    const vector = new Vector2(
      (mouse.x / window.innerWidth) * 2 - 1,
      -(mouse.y / window.innerHeight) * 2 + 1
    )

    raycaster.setFromCamera(vector, camera)
    const intersections = raycaster.intersectObjects(
      this.helpers.children,
      true
    )
    return intersections
  }

  onKeyDown(state) {
    const { key } = state.art.keydown
    const [{ object = null } = {}] = this.intersections

    console.log('keydown', state.art.keydown)
    if (key === 'u' && object) {
      object.position.y += 1
    }

    if (key === 'd' && object) {
      object.position.y -= 1
    }
  }
}
