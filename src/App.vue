<template>
  <div id="app">
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  #app {
    width: calc(~"100% - 40px");
    height: calc(~"100% - 40px");
    padding: 20px;
    .wrapper {
      position: relative;
      height: 100%;
      padding: 0 100px;
    }
  }
}
</style>
