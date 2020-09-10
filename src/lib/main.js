/* eslint-disable */
import * as THREE from 'three'
import store from '../store'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js'


var geometry = new THREE.CircleGeometry()
var material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x999999 })
var cursor3D = new THREE.Mesh( geometry, material )
var grid = new THREE.GridHelper(10, store.state.art.resolution.x, 0x00ff00)
var scene = store.state.art.scene
var camera = store.getters['art/camera']
var renderer = store.state.art.renderer
var controls = new MapControls(camera, renderer.domElement)


store.subscribeAction(update)
// scene.add(cursor3D)

// scene.add(grid)
camera.position.y = 5
camera.lookAt(grid)
renderer.setSize(window.innerWidth, window.innerHeight)
controls.enableRotate = true
document.body.prepend(renderer.domElement)

cursor3D.rotation.x = -1.5


export function onWindowResize() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}


export function update() {
    camera = store.getters['art/camera']
    cursor3D.position.copy(store.getters['art/mouse3D']())

    // group.rotation.x += 0.01
    // group.rotation.y += 0.01
    cursor3D.position.x = Math.round(cursor3D.position.x)
    cursor3D.position.y = Math.round(cursor3D.position.y)
    cursor3D.position.z = Math.round(cursor3D.position.z)

    controls.update()
    renderer.render(scene, camera)
}
update()
/* eslint-enable */
