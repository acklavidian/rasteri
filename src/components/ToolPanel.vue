<template>
  <div :class="['tool-panel', { disabled: false }]">
    <div @click="buildTriangle" class="tool">
      <blender-icon :row="'X'" :col="5" />
    </div>
    <div @click="buildPoint" class="tool">
      <blender-icon :row="'K'" :col="1" />
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import BlenderIcon from './BlenderIcon'
import TriangleBuilder from '../lib/tools/TriangleBuilder'
import PointBuilder from '../lib/tools/PointBuilder'
import { createAccessors } from '../store/utils'

const { mapState } = createNamespacedHelpers('art')
const accessors = {
  art: createAccessors('art'),
  brush: createAccessors('brush')
}

export default {
  computed: {
    ...mapState(['scene']),
    ...accessors.brush(['isLocked'])
    // ...accessors.art()
  },

  methods: {
    buildTriangle() {
      const triangle = new TriangleBuilder()
      triangle.subscribe()
      this.scene.add(triangle)
    },

    buildPoint() {
      const point = new PointBuilder()
      point.subscribe()
      this.scene.add(point)
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

  &.disabled {
    opacity: 0.5;
  }

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
