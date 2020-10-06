import { Color } from 'three'
const SELECT_MODE = 'SELECT_MODE'
const EDIT_MODE = 'EDIT_MODE'
const MOVE_MODE = 'MOVE_MODE'

export const BrushMode = { SELECT_MODE, EDIT_MODE, MOVE_MODE }
export default {
  namespaced: true,
  state: {
    color: new Color(0x000000),
    depth: 0,
    mode: null,
    isLocked: false
  },

  mutations: {
    color(state, color = 0x000000) {
      state.color = new Color(color)
    },

    depth(state, depth = 0) {
      state.depth = depth
    },

    mode(state, mode = BrushMode.SELECT) {
      if (BrushMode.includes(mode)) {
        state.mode = mode
      }
    },

    isLocked(state, isLocked = false) {
      state.isLocked = isLocked
    },

    targets(state, targets = []) {
      state.targets = [...targets]
    }
  },

  getters: {
    isLocked(state) {
      return state.isLocked
    },
    
    activeTarget({ targets }) {
      const [last] = targets.reverse()
      return last
    }
  },

  actions: {
    color({ commit }, color) {
      commit('color', ...(color instanceof Array ? color : [color]))
    },

    depth({ commit }, depth) {
      commit('depth', depth)
    },

    mode({ commit }, mode) {
      commit('mode', mode)
    },

    isLocked({ commit }, isLocked) {
      commit('isLocked', isLocked)
    },

    targets({ commit }, targets = []) {
      commit('targets', ...(targets instanceof Array ? targets : [targets]))
    }
  }
}
