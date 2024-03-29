/* eslint-disable */
import * as THREE from 'three'
import store from '../store'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module'
import LightBuilder from './tools/LightBuilder'
import { Sprite, SpriteMaterial, TextureLoader } from 'three'

import { PixelShader } from 'three/examples/jsm/shaders/PixelShader'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

var geometry = new THREE.CircleGeometry()
var material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x999999 })
var cursor3D = new THREE.Mesh(geometry, material)
var grid = new THREE.GridHelper(100, 100, 0x00ff00)
var scene = store.state.art.scene
var camera = store.getters['art/camera']
var perspectiveCamera = store.state.art.perspectiveCamera
var orthographicCamera = store.state.art.orthographicCamera
var renderer = store.state.art.renderer
var controls = new MapControls(camera, renderer.domElement)

var point = new LightBuilder(1, 1, 1).subscribe()
var stats = new Stats()


stats.dom.style.position = 'fixed'
stats.dom.style.bottom = 0
stats.dom.style.top = 'initial'
document.body.appendChild(stats.dom)


point.position.set(0, 3, 0)
scene.add(point)
controls.mouseButtons.LEFT = null
controls.mouseButtons.RIGHT = THREE.MOUSE.PAN
// scene.add(cursor3D)
// scene.add(grid)

perspectiveCamera.position.y = 5
perspectiveCamera.lookAt(grid)
orthographicCamera.position.y = 5 
orthographicCamera.lookAt(grid)


grid.position.y = -0.01
renderer.setSize(window.innerWidth, window.innerHeight)
controls.enableRotate = true
document.body.prepend(renderer.domElement)
renderer.setPixelRatio(window.devicePixelRatio)

cursor3D.rotation.x = -1.5

var composer = new EffectComposer( renderer )
composer.addPass( new RenderPass( scene, camera ) )
var pixelPass = new ShaderPass( PixelShader )
pixelPass.uniforms[ "resolution" ].value = new THREE.Vector2( window.innerWidth, window.innerHeight )
pixelPass.uniforms[ "resolution" ].value.multiplyScalar( window.devicePixelRatio )
pixelPass.uniforms[ "pixelSize" ].value = 4
composer.addPass( pixelPass )

export function onWindowResize() {
  var width = window.innerWidth
  var height = window.innerHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  pixelPass.uniforms[ "resolution" ].value
    .set( window.innerWidth, window.innerHeight )
    .multiplyScalar( window.devicePixelRatio )

}

export function update() {
  const isPixelShader = store.state.art.pixelShader
  const size = store.state.art.resolution.x
  pixelPass.uniforms[ "pixelSize" ].value = size
  camera = store.getters['art/camera']
  controls.update()

  cursor3D.position.copy(store.getters['event/mouse3D']())

  // group.rotation.x += 0.01
  // group.rotation.y += 0.01





































  
  cursor3D.position.x = Math.round(cursor3D.position.x)
  cursor3D.position.y = Math.round(cursor3D.position.y)
  cursor3D.position.z = Math.round(cursor3D.position.z)
  window.requestAnimationFrame(() => (isPixelShader ? composer:renderer).render(scene, camera))
  stats.update()
}
/* eslint-enable */
