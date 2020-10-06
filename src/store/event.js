import * as Three from 'three'
import { Vector3 } from 'three'

export default {
  namespaced: true,
  state: {
    resolution: { x: 16, y: 16 },
    mouse: new Three.Vector2(0, 0),
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
    }
  },

  getters: {
    mouse3D: ({ mouse }, getters, rootState, { 'art/camera': camera }) => (
      targetZ = 0
    ) => {
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

    keydown({ commit }, { code, key, which, location }) {
      commit('keydown', { code, key, which, location })
    },

    keyup({ commit }, { code, key, which, location }) {
      commit('keyup', { code, key, which, location })
    },

    clicked({ state, rootState, commit, getters, rootGetters }) {
      const position3D = getters['mouse3D']()
      const camera = rootGetters['art/camera']
      const raycaster = rootState.art.raycaster
      const scene = rootState.art.scene
      const mouse = state.mouse
      raycaster.setFromCamera(mouse.normalize(), camera)
      const intersects = raycaster.intersectObjects(scene.children, true)

      commit('clicked', {
        intersects,
        position3D
      })
    }
  }
}