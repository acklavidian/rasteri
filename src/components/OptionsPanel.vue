<template>
  <div class="options-panel">
    <div>
      <div class="row-header">Settings:</div>
      <div class="combo-input">
        <label>Size X<input v-model="width"/></label>
        <hr />
        <div v-if="!isRatioLocked">
          <label>Size Y<input v-model="height"/></label>
        </div>
      </div>
      <div class="combo-input">
        <label
          >Ratio Lock<input v-model="isRatioLocked" type="checkbox"
        /></label>
      </div>
      <div class="combo-input">
        <label>Ortho: <input v-model="isOrtho" type="checkbox"/></label>
      </div>
    </div>
    <div>
      <div class="row-header">Zoom:</div>
      <div class="combo-input">
        <label> Zoom<input v-model="zoom"/></label>
      </div>
    </div>
    <div class="row-footer">
      @[:x {{ mouse.x.toPrecision(10) }}px, y: {{ mouse.y.toPrecision(10) }}px]
    </div>
  </div>
</template>
<script>
import { createAccessors } from '../store/utils'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('art')
const accessors = createAccessors('art')

export default {
  props: {
    cursorPosition: {
      default: () => ({ x: 0, y: 0 }),
      validator({ x, y }) {
        return !isNaN(x) && !isNaN(y)
      }
    }
  },

  computed: {
    ...mapState(['resolution', 'offset']),
    ...accessors(['zoom', 'isRatioLocked', 'isOrtho', 'mouse']),

    height: {
      get() {
        return this.resolution.y
      },

      set(height) {
        this.changeResolution({ x: this.width, y: height })
      }
    },

    width: {
      get() {
        return this.resolution.x
      },

      set(width) {
        this.changeResolution({ x: width, y: this.height })
      }
    }
  },

  methods: {
    ...mapActions({
      changeResolution: 'resolution'
    })
  }
}
</script>
<style lang="scss" scoped>
.row-header {
  width: 100%;
  background: rgba(65, 65, 65, 1);
  padding: 1rem 1rem;
  margin-bottom: 1rem;
}

.row-footer {
  position: absolute;
  width: 100vw;
  color: #555555;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgb(45, 45, 45);
}

.combo-input {
  background: rgba(89, 89, 89, 1);
  border-radius: 5px;
  border: 1px solid #434343;
  overflow-x: visible;
  box-shadow: 0, 0, 2, #434343;
  margin: 1rem;

  label {
    width: 100%;
    line-break: nowrap;
    white-space: nowrap;
    padding: 0.5rem;
    display: inline-block;
  }

  input {
    background: transparent;
    border: none;
    color: inherit;
    margin: 0;
    padding: 0;
    margin-left: 2rem;
    margin-right: 2rem;
    font-family: inherit;
    font-size: inherit;
    text-shadow: inherit;
    text-align: right;

    &:focus {
      outline: none;
    }
  }

  hr {
    margin: 0;
    padding: 0;
    border: 1px solid #555555;
    box-shadow: 1, 1, 20, #434343;
  }
}

.options-panel {
  margin: 0;
  padding: 0;
  margin-left: 0;
  border-radius: 5px;
  height: 100%;
  background: rgba(55, 55, 55, 1);
}
</style>
