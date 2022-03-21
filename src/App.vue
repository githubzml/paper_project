<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
// #409EFF 主题颜色

html,
body {
  width: 100%;
  height: 100%;
}
#app {
  position: relative;
  display: inline-block;
  width: calc(~"100% - 20px");
  height: calc(~"100% - 20px");
  margin-left: 10px;
  margin-top: 10px;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background-color: antiquewhite;
    background: url("../src/assets/images/login/community.jpg") no-repeat center /
      100% 100%;

    // 注册 登录 忘记密码框
    .sss {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto;

      width: 400px;
      background: #53c9c9;
      border-radius: 10px;
    }
  }
}
</style>
