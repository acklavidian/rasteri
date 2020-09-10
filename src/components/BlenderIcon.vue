<template>
  <div class="blender-icon">
    <div class="icon" :style="{
        'background-position': `${xpos}px ${ypos}px`
      }"></div>
  </div>
</template>


<script>
const ROW_INDEX_KEY = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'AA',
  'BA',
  'CA',
  'DA'
]

export default {
  props: {
    name: String,
    col: {
      type: Number,
      default: 1,
      validator: i => i >= 0 && i <= 25
    },
    row: {
      type: [Number, String],
      default: 1,
      validator: i => (i >= 0 && i <= 29) || ROW_INDEX_KEY.indexOf(i) >= 0
    }
  },
  data() {
    return {
      icons: {
        plot: { row: 1, col: 3 },
        suzanne: { row: 2, col: 4 }
      }
    }
  },

  computed: {
    icon() {
      return this.icons[this.name]
    },

    xpos() {
      const col = this.icon?.col || this.col
      return -((col - 1) * 21) - 3
    },

    ypos() {
      const rowIndex = ROW_INDEX_KEY.indexOf(this.row) + 1
      const row = this.icon?.row || rowIndex
      return -((row - 1) * 21) - 8
    }
  }
}
</script>
<style lang="scss">
$sprite: url('../assets/blender-2-8-icons.png');

.blender-icon {
  .icon {
    background-image: $sprite;
    height: 20px;
    width: 20px;
    display: inline-block;
  }
}
</style>
