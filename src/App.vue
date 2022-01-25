<template>
  <div id="app">
    <router-view />
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
  }
}
</style>
