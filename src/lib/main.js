/* eslint-disable */
import * as THREE from 'three'
import store from '../store'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module'

var geometry = new THREE.CircleGeometry()
var material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x999999 })
var cursor3D = new THREE.Mesh(geometry, material)
var grid = new THREE.GridHelper(100, 100, 0x00ff00)
var scene = store.state.art.scene
var camera = store.getters['art/camera']
var renderer = store.state.art.renderer
var controls = new MapControls(camera, renderer.domElement)
var light = new THREE.PointLight(0xffffff, 1, 10)
var sphere = new THREE.SphereBufferGeometry(0.5, 16, 8)
var stats = new Stats()

stats.dom.style.position = 'fixed'
stats.dom.style.bottom = 0
stats.dom.style.top = 'initial'
console.log(stats.dom)
document.body.appendChild(stats.dom)

light.position.set(0, 3, 0)
light.add(
  new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffaa00 }))
)
scene.add(light)
controls.mouseButtons.LEFT = null
controls.mouseButtons.RIGHT = THREE.MOUSE.PAN
// scene.add(cursor3D)
scene.add(grid)
camera.position.y = 5
camera.lookAt(grid)
renderer.setSize(window.innerWidth, window.innerHeight)
controls.enableRotate = true
document.body.prepend(renderer.domElement)
renderer.setPixelRatio(window.devicePixelRatio)

cursor3D.rotation.x = -1.5

export function onWindowResize() {
  var width = window.innerWidth
  var height = window.innerHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

export function update() {
  camera = store.getters['art/camera']
  controls.update()

  cursor3D.position.copy(store.getters['art/mouse3D']())

  // group.rotation.x += 0.01
  // group.rotation.y += 0.01
  cursor3D.position.x = Math.round(cursor3D.position.x)
  cursor3D.position.y = Math.round(cursor3D.position.y)
  cursor3D.position.z = Math.round(cursor3D.position.z)
  window.requestAnimationFrame(() => renderer.render(scene, camera))
  stats.update()
}
/* eslint-enable */
