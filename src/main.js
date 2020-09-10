import './registerServiceWorker'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import * as Rasteri from './lib'
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

window.addEventListener('mousemove', e =>
  store.dispatch('art/mouse', { x: e.clientX, y: e.clientY })
)
window.addEventListener('resize', Rasteri.onWindowResize)
window.addEventListener('keyup', Rasteri.update)
window.addEventListener('click', () => store.dispatch('art/clicked'))
window.addEventListener(
  'wheel',
  () => {
    const zoom = store.state.art.zoom
    store.dispatch('art/zoom', event.deltaY < 0 ? zoom + 10 : zoom - 10)
  },
  true
)
