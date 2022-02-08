import './registerServiceWorker'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import * as Rasteri from './lib'
import debounce from 'lodash.debounce'

const dispatch = store.dispatch

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

window.addEventListener('mousemove', e =>
  dispatch('event/mouse', { x: e.clientX, y: e.clientY })
)
window.addEventListener('resize', Rasteri.onWindowResize)
window.addEventListener('keydown', event => dispatch('event/keydown', event))
window.addEventListener('keyup', event => dispatch('event/keyup', event))
window.addEventListener('click', () => dispatch('event/clicked'))
window.addEventListener(
  'wheel',
  event => {
    const zoom = store.state.art.zoom
    dispatch('art/zoom', event.deltaY < 0 ? zoom + 10 : zoom - 10)
  },
  false
)
store.subscribeAction(debounce(Rasteri.update, 1000 / 30, { maxWait: 1 }))
setInterval(Rasteri.update, 1000)
