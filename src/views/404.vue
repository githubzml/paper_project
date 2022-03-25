<template>
  <div class="_a404">
    <div class="_404"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
._a404 {
  position: relative;
  width: 100%;
  height: 100%;

  ._404 {
    position: absolute;
    width: 40%;
    height: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: url("../assets/images/404.jpeg") no-repeat center;
    background-size: contain;
    border: 1px solid #ccc;
  }
  ._404::after {
    content: "页面找不到...";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    /* 如果不写单位 则是 最终行高是 与字体大小相乘 推荐这种写法 */
    line-height: 2;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 24px;

    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>