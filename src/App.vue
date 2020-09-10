<template>
  <div id="app">
    <options-panel class="top-right" />
    <tool-panel class="top-left" />a
  </div>
</template>

<script>
import OptionsPanel from './components/OptionsPanel.vue'
import ToolPanel from './components/ToolPanel.vue'

export default {
  components: {
    OptionsPanel,
    ToolPanel
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
html,
body,
#app {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 12px;
  text-shadow: 1px 1px 1px #202020;
  color: #ffffff;
  margin: 0;
  padding: 0;
  border: none;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #252525;
}
</style>
<style lang="scss" scoped>
.three-canvas {
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  top: 0%;
  left: 0%;
}

.top-left {
  position: absolute;
  left: 0;
  top: 0;
}

.top-right {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
