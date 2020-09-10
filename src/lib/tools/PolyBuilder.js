import {
  Geometry,
  BufferGeometry,
  Face3,
  Vector3,
  LineBasicMaterial,
  MeshNormalMaterial,
  MeshBasicMaterial,
  Mesh,
  Line,
  Group
} from 'three'
import store from '../../store'
/* todo-refactor -
 * - 2 root groups. A helper group and a result group.
 * - helper will have 2 groups: points and lines.
 * On create it gets points until 3 is reached.
 * Uses points to create triangle.
 * Points need to be clickable/selectable to set depth.
 *
 * consider undo/redo structure...
 *
 */
const points = []
const group = new Group()

var lineMaterial = new LineBasicMaterial({
  color: 0xff0000
})

var lineGeometry = new BufferGeometry()
const meshGeometry = new Geometry()
const meshMaterial = new MeshBasicMaterial({
  color: 0x00_cc_00
})
const mesh = new Mesh(meshGeometry, meshMaterial)

points.push(new Vector3(-10, 0, 0))
points.push(new Vector3(0, 0, 10))
points.push(new Vector3(10, 0, 0))

lineGeometry.setFromPoints(points)

var line = new Line(lineGeometry, lineMaterial)
group.add(mesh)
group.add(line)

function addPoint({ x, y, z }) {
  points.push(new Vector3(Math.round(x), 0, Math.round(z)))
  line.geometry.setFromPoints(points)
  const count = { faces: mesh.geometry.faces.length, points: points.length }

  if (count.faces < count.points / 3) {
    points.push(new Vector3(Math.round(x), 0, Math.round(z)))
    const v = count.points
    mesh.geometry.faces.push(new Face3(v - 3, v - 2, v - 1))
    mesh.geometry.vertices = points
    mesh.geometry.verticesNeedUpdate = true
    mesh.geometry.elementsNeedUpdate = true
    mesh.geometry.morphTargetsNeedUpdate = true
    mesh.geometry.uvsNeedUpdate = true
    mesh.geometry.normalsNeedUpdate = true
    mesh.geometry.colorsNeedUpdate = true
    mesh.geometry.tangentsNeedUpdate = true
    mesh.geometry.computeFaceNormals()
    mesh.geometry.computeVertexNormals()
  }
  console.log('p:', count.points, 'f:', count.faces, '/', count.points / 3)
}

window.addEventListener('mouseup', e => {
  const mouse3D = store.getters['art/mouse3D']()
  addPoint(mouse3D)
})

export default group
