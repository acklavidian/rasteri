<template>
  <div class="tool-panel">
    <div @click="buildTriangle" class="tool">
      <blender-icon :row="'X'" :col="5" />
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import BlenderIcon from './BlenderIcon'
import TriangleBuilder from '../lib/tools/TriangleBuilder'

const { mapState } = createNamespacedHelpers('art')

export default {
  computed: {
    ...mapState(['scene'])
  },

  methods: {
    buildTriangle() {
      this.$nextTick(() => this.scene.add(new TriangleBuilder()))
    }
  },

  components: {
    BlenderIcon
  }
}
</script>
<style lang="scss" scoped>
.tool-panel {
  padding: 0.5%;
  margin: 0.5%;
  border-radius: 5px;
  min-height: 10%;
  background: rgba(89, 89, 89, 0.5);
  border-radius: 5px;
  border: 1px solid #434343;

  &:hover {
    background: rgba(89, 89, 89, 0.75);
  }

  .tool {
    padding: 5px;
    &:hover {
      background: rgba(89, 89, 89, 0.75);
      border-radius: 5px;
    }
  }
}
</style>