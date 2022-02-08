import * as Three from 'three'
import {
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
    orthographicCamera: new OrthographicCamera(- 0.5, 0.5, 0.5, - 0.5, - 10000, 10000),
    pixelShader: false,
    resolution: { x: 16, y: 16 },
    zoom: 10,
    isRatioLocked: true,
    isOrtho: false,
    offset: new Three.Vector2(0, 0),
    renderer: new WebGLRenderer(),
    scene: new Scene(),
    raycaster: new Raycaster()
    // break events out in to vuex module called "event"
  },

  mutations: {
    zoom(state, z = 0) {
      state.zoom = z
    },

    pixelShader(state, value) {
      state.pixelShader = Boolean(value)
    },

    resolution(state, { x, y }) {
      state.resolution.x = x
      state.resolution.y = state.isRatioLocked ? x : y
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
      state.isOrtho ? state.orthographicCamera : state.perspectiveCamera
  },

  actions: {
    resolution({ commit }, { x, y }) {
      commit('resolution', { x, y })
    },
    
    zoom({ commit }, z = 0) {
      commit('zoom', z)
    },

    offset({ commit }, { x, y }) {
      commit('offset', { x, y })
    },

    isRatioLocked({ state, commit }, value) {
      if (value) {
        commit('resolution', state.resolution)
      }
      commit('isRatioLocked', value)
    },

    isOrtho({ commit }, value) {
      commit('isOrtho', value)
    },

    pixelShader({ commit }, value) {
      commit('pixelShader', value)
    }
  }
}
