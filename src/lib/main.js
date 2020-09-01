
/* eslint-disable */
import * as THREE from 'three'
import store from '../store'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { shape } from './PolygonGeometry'

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
var renderer = new THREE.WebGLRenderer()
var geometry = new THREE.BoxGeometry()
var material = new THREE.MeshNormalMaterial()
var cube = new THREE.Mesh( geometry, material )
var controls = new MapControls(camera, renderer.domElement)
var grid = new THREE.GridHelper()

store.subscribeAction(update)
scene.add( cube )
scene.add( grid )
scene.add(shape)
camera.position.y = 5
camera.lookAt(grid)
renderer.setSize(window.innerWidth, window.innerHeight)
controls.enableRotate = false
document.body.prepend(renderer.domElement)
window.addEventListener('resize', onWindowResize)

function onWindowResize() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}


export function update() {
    var targetZ = 0
    var mouse = store.state.art.mouse
    var vector = new THREE.Vector3( 
        ( mouse.x / window.innerWidth ) * 2 - 1,
        -( mouse.y / window.innerHeight ) * 2 + 1,
        10.5
        
    ).unproject(camera)
    vector.sub(camera.position).normalize()
    var distance = (targetZ - camera.position.y) / vector.y
    controls.update()
    shape.rotation.x += 0.01
    shape.rotation.y += 0.01
    cube.position
        .copy(camera.position)
        .add(vector.multiplyScalar(distance))
    cube.position.x = Math.round(cube.position.x)
    cube.position.y = Math.round(cube.position.y)
    cube.position.z = Math.round(cube.position.z)
    renderer.render(scene, camera)
}
/* eslint-enable */
