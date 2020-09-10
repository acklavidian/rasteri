<template>
  <div class="two-canvas"></div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as Rastiri from '../lib'
import { createAccessors } from '../store/utils'

const { mapState } = createNamespacedHelpers('art')
const accessor = createAccessors('art')

export default {
  data() {
    return {}
  },

  created() {
    window.addEventListener('scroll', this.scroll)
    window.addEventListener('mousemove', this.mousemove)
    Rastiri.before(this)
  },

  destroyed() {
    window.removeEventListener('mousemove', this.mousemove)
    window.removeEventListener('scroll', this.scroll)
  },

  methods: {
    scroll(event) {
      console.log('event: ', event)
    },

    mousemove(event) {
      const g = {
        x: event.clientX / this.resolution.x - 0.5,
        y: event.clientY / -this.resolution.y + 0.5
      }
      this.mouse = g
    }
  },

  watch: {
    zoom() {
      this.$forceUpdate()
    }

    // mouse() {
    //   this.$forceUpdate()
    // }
  },

  computed: {
    ...mapState(['resolution']),
    ...accessor('mouse')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
