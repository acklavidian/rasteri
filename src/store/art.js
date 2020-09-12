import * as Three from 'three'
import {
  Vector3,
  PerspectiveCamera,
  OrthographicCamera,
  WebGLRenderer,
  Scene,
  Raycaster
} from 'three'

export default {
  namespaced: true,

  state: {
    perspectiveCamera: new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    ),
    orthographicCamera: new OrthographicCamera(0, 1, 0, 1),
    resolution: { x: 16, y: 16 },
    mouse: new Three.Vector2(0, 0),
    zoom: 10,
    isRatioLocked: true,
    isOrtho: false,
    offset: new Three.Vector2(0, 0),
    renderer: new WebGLRenderer(),
    scene: new Scene(),
    raycaster: new Raycaster(),
    clicked: {
      intersects: [],
      position3D: new Vector3()
    },

    keydown: {
      code: null,
      location: null,
      key: null,
      which: null
    },

    keyup: {
      code: null,
      location: null,
      key: null,
      which: null
    }
  },

  mutations: {
    resolution(state, { x, y }) {
      state.resolution.x = x
      state.resolution.y = state.isRatioLocked ? x : y
    },

    mouse(state, { x, y }) {
      state.mouse = new Three.Vector2(x, y)
    },

    clicked(state, { intersects = [], position3D = {} }) {
      const { x, y, z } = position3D
      state.clicked.position3D = new Vector3(x, y, z)
      state.clicked.intersects = [...intersects]
    },

    keyup(state, { code, location, key, which }) {
      state.keyup = { code, location, key, which }
    },

    keydown(state, { code, location, key, which }) {
      state.keydown = { code, location, key, which }
    },

    zoom(state, z = 0) {
      state.zoom = z
    },

    offset(state, { x, y }) {
      state.offset.x = Number(x)
      state.offset.y = Number(y)
    },

    isRatioLocked(state, value) {
      state.isRatioLocked = Boolean(value)
    },

    isOrtho(state, value) {
      state.isOrtho = Boolean(value)
    }
  },

  getters: {
    camera: state =>
      state.isOrtho ? state.orthographicCamera : state.perspectiveCamera,

    mouse3D: ({ mouse }, { camera }) => (targetZ = 0) => {
      var vector = new Vector3(
        (mouse.x / window.innerWidth) * 2 - 1,
        -(mouse.y / window.innerHeight) * 2 + 1,
        10.5
      )
        .unproject(camera)
        .sub(camera.position)
        .normalize()

      var distance = (targetZ - camera.position.y) / vector.y

      return new Vector3()
        .copy(camera.position)
        .add(vector.multiplyScalar(distance))
    }
  },

  actions: {
    resolution({ commit }, { x, y }) {
      commit('resolution', { x, y })
    },

    mouse({ commit }, { x, y }) {
      commit('mouse', { x, y })
    },

    clicked({ state, commit, getters }) {
      const position3D = getters['mouse3D']()
      const camera = getters['camera']
      const raycaster = state.raycaster
      const scene = state.scene
      const mouse = state.mouse
      raycaster.setFromCamera(mouse.normalize(), camera)
      const intersects = raycaster.intersectObjects(scene.children, true)

      commit('clicked', {
        intersects,
        position3D
      })
    },

    zoom({ commit }, z = 0) {
      commit('zoom', z)
    },

    offset({ commit }, { x, y }) {
      commit('offset', { x, y })
    },

    keydown({ commit }, { code, key, which, location }) {
      commit('keydown', { code, key, which, location })
    },

    keyup({ commit }, { code, key, which, location }) {
      commit('keyup', { code, key, which, location })
    },

    isRatioLocked({ state, commit }, value) {
      if (value) {
        commit('resolution', state.resolution)
      }
      commit('isRatioLocked', value)
    },

    isOrtho({ commit }, value) {
      commit('isOrtho', value)
    }
  }
}
