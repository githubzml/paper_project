<template>
  <div class="_shop_car">
    <div class="ts">
      <i class="el-icon-circle-check c"></i><span>商品已成功加入购物车</span>
    </div>
    <div class="_content">
      <div class="_shop_car_left">
        <dl>
          <dt>
            <img :src="detailImgs[0]" alt="" />
          </dt>
          <dd class="ml10">
            <span>{{ detailObj.jianshu }}</span>
            <span class="fc">
              <span>单价：￥{{ detailObj.jiage }}</span>
              <span class="ml10">数量：{{ aObj.count }}</span>
            </span>
          </dd>
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
import { getDetail } from "@/api";
import { mapState } from "vuex";

export default {
  data() {
    return {
      detailObj: {},
      detailImgs: [],
    };
  },
  mounted() {
    getDetail({ id: this.aObj.id, content: "" })
      // getDetail({ id: 1, content: "" })
      .then((result) => {
        let temp = [];

        this.detailObj = result.data.result[0];

        for (const key in this.detailObj) {
          if (Object.hasOwnProperty.call(this.detailObj, key)) {
            const element = this.detailObj[key];
            if (key.includes("img")) {
              temp.push(element);
            }
          }
        }

        this.detailImgs = temp; //获取图片列表
      })
      .catch((err) => {});
  },
  computed: mapState(["aObj"]),
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
  .ts {
    height: 30px;
    display: flex;
    align-items: center;
    .c {
      color: #71b247;
      font-size: 30px;
    }
  }

  ._content {
    display: flex;
    justify-content: space-between;
    ._shop_car_left {
      dl {
        display: flex;
        margin-top: 10px;
        dt {
          width: 100px;
          height: 100px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        dd {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .fc {
            color: #ccc;
          }
        }
      }
    }
    ._shop_car_right {
      display: flex;
      align-self: end;
      div {
        padding: 10px;
        border: 1px solid #ccc;
        cursor: pointer;
        height: 20px;
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