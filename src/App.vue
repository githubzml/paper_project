<template>
  <div id="app">
    <router-view />
    <i class="el-icon-top _top" id="myBtn" @click="toTop"></i>
  </div>
</template>

<script>
function scrollFunction() {
  console.log(121);
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}
export default {
  mounted() {
    document.addEventListener("scroll", scrollFunction);
  },
  methods: {
    toTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
  beforeDestroy() {
    document.removeEventListener("scroll", scrollFunction);
  },
};
</script>

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
  ._top {
    position: fixed;
    right: 0;
    bottom: 5%;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 24px;
    border: 1px solid #409eff;
    border-radius: 5px;
    display: none;
  }
  ._top:hover {
    color: #409eff;
    cursor: pointer;
  }
}
</style>
