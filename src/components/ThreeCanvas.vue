<template>
  <canvas class="threeCanvas"></canvas>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
/* eslint-disable */
import {
  Scene,
  WebGLRenderer,
  GridHelper,
  OrthographicCamera as Camera,
  // PerspectiveCamera as Camera,
  LineBasicMaterial,
  Vector3,
  Line,
  BufferGeometry,
  Color,
  Raycaster,
  Vector2,
  Plane,
  PlaneGeometry,
  PlaneHelper,
  CircleGeometry,
  SphereGeometry,
  ShapeGeometry,
  CubeGeometry,
  Shape,
  Mesh,
  MeshBasicMaterial
} from 'three'
/* eslint-enable */
import { getOffset } from '../threeUtils'
const { mapState, mapActions } = createNamespacedHelpers('art')

export default {
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
      points: [],
      heartShape: null,
      raycaster: new Raycaster(),
      geometry: null,
      circle: null,
      plane: null,
      middle: null,
      frustum: 1 / 2
    }
  },

  updated() {
    this.renderer.setSize(this.resolution.x, this.resolution.y)
    this.points.pop()
    this.points.push()
    this.geometry.setFromPoints(this.points)
    const g = new Vector3(
      this.mouse.x / this.zoom,
      0.0,
      this.mouse.y / this.zoom
    )
    this.circle.position = g
    this.$el.style.filter = 'blur(0)'
    this.$el.style.transform = `scale(${this.zoom}) translateZ(0)`
    this.$el.style.imageRendering = 'pixelated'

    this.renderer.render(this.scene, this.camera)
  },

  created() {
    window.addEventListener('mousemove', this.mousemove)
  },

  destroyed() {
    window.removeEventListener('mousemove', this.mousemove)
  },

  mounted() {
    this.renderer = new WebGLRenderer({ canvas: this.$el, antialias: false })
    this.renderer.canvas = this.$el
    this.renderer.setSize(this.resolution.x, this.resolution.y)
    this.$el.style.imageRendering = 'pixelated'

    this.camera = new Camera(
      -this.frustum,
      this.frustum,
      this.frustum,
      -this.frustum,
      0.0,
      3
    )
    this.$el = document.createElement('DIV')
    this.camera.zoom = 10
    this.camera.position.set(0, -1, 0)
    this.camera.lookAt(0, 0, 0)
    let meshMaterial = new MeshBasicMaterial({ color: 0xffff00 })
    let meshMaterial2 = new MeshBasicMaterial({ color: 0x00ff00 })
    const cursorSize = 1 / this.resolution.x
    this.circle = new Mesh(
      new CubeGeometry(cursorSize, cursorSize, cursorSize),
      meshMaterial
    )
    this.scene = new Scene()
    this.scene.add(this.circle)

    let material = new LineBasicMaterial({ color: 0x0000ff })

    this.points.push(new Vector3(-10, 0, 0))
    this.points.push(new Vector3(0, 10, 0))
    this.points.push(new Vector3(10, 0, 0))
    this.scene.background = new Color(0x151515)
    this.geometry = new BufferGeometry().setFromPoints(this.points)
    this.line = new Line(this.geometry, material)
    this.scene.add(this.line)
    this.middle = new Mesh(new SphereGeometry(0.01), meshMaterial2)
    this.scene.add(this.middle)
    // this.plane = new PlaneHelper(
    //   new Plane(new Vector3(0, 0, 0), 1),
    //   1,
    //   0xffff00
    // )
    // this.grid = new GridHelper(
    //   1,
    //   this.resolution.x / 10,
    //   new Color(0xff0000),
    //   new Color(0xcdcdcd)
    // )
    // this.scene.add(this.grid)
    // this.scene.add(this.plane)
    this.renderer.render(this.scene, this.camera)
  },

  methods: {
    ...mapActions({
      setMouse: 'mouse'
    }),

    mousemove(event) {
      const offset = getOffset(this.$el)
      const a = {
        x: offset.x,
        y: offset.y
      }

      const g = {
        x: (event.clientX - a.x) / this.resolution.x - 0.5,
        y: (event.clientY - a.y) / -this.resolution.y + 0.5
      }
      this.setMouse(g)
    }
  },
  watch: {
    mouse() {
      this.$forceUpdate()
    }
  },
  computed: {
    ...mapState(['resolution', 'mouse', 'zoom'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
