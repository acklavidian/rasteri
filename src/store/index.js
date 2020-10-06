import Vue from 'vue'
import Vuex from 'vuex'
import art from './art'
import brush from './brush'
import event from './event'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    art,
    brush,
    event
  }
})
