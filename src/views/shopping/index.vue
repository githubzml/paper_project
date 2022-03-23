<template>
  <div class="_shop_car">
    <div class="ts">
      <i class="el-icon-circle-check"></i><span>商品已成功加入购物车</span>
    </div>
    <div class="_content">
      <div class="_shop_car_left">
        <dl>
          <dt></dt>
          <dd>商品简介</dd>
        </dl>
      </div>
      <div class="_shop_car_right">
        <div @click="$router.go(-1)">查看商品详情</div>
        <div @click="goCar">
          <span>去购物车结算</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  mounted() {
    console.log(mapState);
  },
  computed: mapState(["count"]),
  methods: {
    goCar() {
      this.$router.push("/home/gocar");
    },
  },
};
</script>

<style scoped lang="less">
._shop_car {
  background-color: #eee;
  border: 1px solid #ccc;
  padding: 10px;
  ._content {
    display: flex;
    justify-content: space-between;
    ._shop_car_right {
      display: flex;
      div {
        padding: 10px;
        border: 1px solid #ccc;
        cursor: pointer;
      }
      div:nth-of-type(1) {
        margin-right: 10px;
        color: #409eff;
      }
      div:nth-of-type(1):hover {
        border: 1px solid #409eff;
      }

      div:nth-of-type(2) {
        background-color: #409eff;
        color: #ccc;
      }
      div:nth-of-type(2):hover {
        background-color: #047ef8;
      }
    }
  }
}
</style>