import * as Three from 'three'

export default {
  namespaced: true,

  state: {
    resolution: { x: 16, y: 16 },
    mouse: new Three.Vector2(0, 0),
    zoom: 10,
    isRatioLocked: true,
    offset: new Three.Vector2(0, 0)
  },

  mutations: {
    resolution(state, { x, y }) {
      state.resolution.x = x
      state.resolution.y = state.isRatioLocked ? x : y
    },

    mouse(state, { x, y }) {
      state.mouse = new Three.Vector2(x, y)
    },

    zoom(state, z = 0) {
      state.zoom = z
    },

    offset(state, { x, y }) {
      state.offset.x = Number(x)
      state.offset.y = Number(y)
    },

    isRatioLocked(state, value) {
      state.resolution.y = state.resolution.x
      state.isRatioLocked = Boolean(value)
    }
  },

  actions: {
    resolution({ commit }, { x, y }) {
      commit('resolution', { x, y })
    },

    mouse({ commit }, { x, y }) {
      commit('mouse', { x, y })
    },

    zoom({ commit }, z = 0) {
      commit('zoom', z)
    },

    offset({ commit }, { x, y }) {
      commit('offset', { x, y })
    },

    isRatioLocked({ commit }, value) {
      commit('isRatioLocked', value)
    }
  }
}
