<template>
  <div class="_detail">
    <div class="_detail_top">
      <div class="_detail_top_left">
        <img :src="arr[0].bigImg" alt="" />
      </div>
      <div class="_detail_top_center">
        <i
          class="el-icon-arrow-up"
          style="font-size: 50px; font-weight: blod"
        ></i>
        <img :src="arr[0].img1" alt="" />
        <img :src="arr[0].img2" alt="" />
        <img :src="arr[0].img3" alt="" />
        <img :src="arr[0].img4" alt="" />
        <i
          class="el-icon-arrow-down"
          style="font-size: 50px; font-weight: blod"
        ></i>
      </div>
      <ul class="_detail_top_right">
        <li>{{ arr[0].title }}</li>
        <li>
          <span class="_xj">￥{{ arr[0].xianjia }}</span
          ><span class="_yj">￥{{ arr[0].yuanjia }}</span>
        </li>
        <li>
          <span>地址：</span><span>{{ arr[0].yuanjia }}</span>
        </li>

        <li>
          <span>标签：</span><span>{{ arr[0].biaoqian }}</span>
        </li>

        <li>
          <span>日期：</span><span>{{ arr[0].riqi }}</span>
        </li>

        <li>立即购买</li>
      </ul>
    </div>
    <div class="_detail_bottom">
      <p class="qiehuan">
        <span @click="dc('d')" :class="[active ? 'active' : '']">详情</span>
        <span @click="dc('c')" :class="[!active ? 'active' : '']">评论</span>
      </p>
      <div v-show="active">{{ arr[0].xiangqing }}</div>
      <div v-show="!active">{{ arr[0].pinglun }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商品清单

      // list
      brr: [
        {
          shopName: "",
          dizhi: "",
          yuanjia: "",
          xianjia: "",
        },
      ],

      //   公告

      // 详情数据
      arr: [
        {
          img1: require("../../../assets/images/detail_jpg/1.jpg"),
          img2: require("../../../assets/images/detail_jpg/2.jpg"),
          img3: require("../../../assets/images/detail_jpg/3.jpg"),
          img4: require("../../../assets/images/detail_jpg/4.jpg"),
          bigImg: require("../../../assets/images/detail_jpg/big.jpg"),
          title: "茶花 漱口杯 刷牙杯子",
          xianjia: "5.00",
          yuanjia: "12.00",
          dizhi: "1单元",
          biaoqian: "不议价，不还价",
          riqi: "2022-3-21",
          xiangqing: "这是一些详情",
          pinglun: "这厮一些评论",
        },
      ],

      crr: [{ shoujiaren: "", shoujihao: "", shoujiandizhi: "" }],
      active: true,
    };
  },
  mounted() {
    console.log(111, this.$route.params);
  },
  methods: {
    dc(params) {
      params == "d" ? (this.active = true) : (this.active = false);
    },
  },
};
</script>

<style scoped lang="less">
._detail {
  width: calc(~"100% - 300px");
  height: 300px;
  margin: 0 auto;
  ._detail_top {
    height: 350px;
    display: flex;
    ._detail_top_left {
      margin-right: 10px;
    }

    ._detail_top_center {
      display: flex;
      flex-direction: column;
      img {
        margin-bottom: 10px;
      }
    }

    ._detail_top_right {
      h3 {
        font-weight: bold;
        font-size: 22px;
      }
      > p {
        ._xj {
          color: red;
          font-size: 18px;
        }
        ._yj {
          text-decoration: line-through;
          font-size: 14px;
        }
      }
    }
  }
  ._detail_bottom {
    .qiehuan {
      height: 30px;
      line-height: 30px;
      text-align: center;
      span {
        margin: 0 10px;
        padding-bottom: 5px;
        cursor: pointer;
      }
      .active {
        color: rgb(83, 184, 159);
        border-bottom: 1px solid rgb(83, 184, 159);
      }
    }
  }
}
</style>