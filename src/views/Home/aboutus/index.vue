<template>
  <div class="_aboutus">
    <header>
      <p>致力打造一个良好的社区二手平台</p>
      <p>让用户收益，让商品使用率最大化</p>
    </header>
    <section>关于我们...</section>
    <footer>电话：010-7654323</footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
._aboutus {
  height: calc(~"100vh - 132px");

  display: flex;
  flex-direction: column;
  header {
    font-size: 40px;
    text-align: center;
  }
  section {
    padding: 20px 0;
    flex: 1;
  }
  footer {
    height: 40px;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
}
</style>