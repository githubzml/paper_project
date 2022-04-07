<template>
  <div class="_detail">
    <div class="_detail_top">
      <div class="_detail_top_left">
        <zoom :imgUrl="detailImgs[0]"></zoom>
        <ImageList :imgUrls="detailImgs"></ImageList>
      </div>
      <ul class="_detail_top_right">
        <li class="_title">{{ detailObj.jianshu }}</li>
        <li class="_price">
          <span class="_xj">￥{{ detailObj.jiage }}</span
          ><span class="_yj ml10">￥{{ arr[0].yuanjia }}</span>
        </li>
        <li>
          <span class="_t">地址</span
          ><span class="ml10">{{ detailObj.region }}</span>
        </li>

        <li>
          <span class="_t">标签</span
          ><span class="ml10">{{ arr[0].biaoqian }}</span>
        </li>

        <li>
          <span class="_t">日期</span
          ><span class="ml10">{{ arr[0].riqi }}</span>
        </li>

        <li class="_gm">
          <p>
            <span @click="gwc('de')">-</span><span>{{ count }}</span
            ><span @click="gwc('in')">+</span>
          </p>
          <span class="_jrgwc" @click="toGwc">加入购物车</span>
        </li>
      </ul>
    </div>
    <div class="_detail_bottom">
      <p class="qiehuan">
        <span @click="dc('d')" :class="[active ? 'active' : '']">详情</span>
        <span @click="dc('c')" :class="[!active ? 'active' : '']">评论</span>
      </p>
      <div v-show="active">{{ detailObj.desc }}</div>
      <div v-show="!active">
        <p>{{ arr[0].pinglun }}</p>
        <div class="gd" @click="gD = true" v-if="!gD">
          <i class="el-icon-arrow-down">更多</i>
        </div>
        <p v-if="gD">更多啊</p>
        <div class="gd" @click="gD = false" v-if="gD">
          <i class="el-icon-arrow-up">收起</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import zoom from "@/components/Zoom/Zoom.vue";
import ImageList from "@/components/ImageList/ImageList.vue";
import { getDetail, updateDetailCount } from "../../../api";
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
          imgs: [
            require("../../../assets/images/detail_jpg/1.jpg"),
            require("../../../assets/images/detail_jpg/2.jpg"),
            require("../../../assets/images/detail_jpg/3.jpg"),
            require("../../../assets/images/detail_jpg/4.jpg"),
            require("../../../assets/images/detail_jpg/big.jpg"),
          ],
          //   img1: require("../../../assets/images/detail_jpg/1.jpg"),
          //   img2: require("../../../assets/images/detail_jpg/2.jpg"),
          //   img3: require("../../../assets/images/detail_jpg/3.jpg"),
          //   img4: require("../../../assets/images/detail_jpg/4.jpg"),
          //   bigImg: require("../../../assets/images/detail_jpg/big.jpg"),
          title: "茶花 漱口杯 刷牙杯子",
          xianjia: "5.00",
          yuanjia: "12.00",
          dizhi: "1单元",
          biaoqian: "不议价，不还价",
          riqi: "2022-3-21",
          xiangqing:
            "3月21日国际田联诚信委员会通报俄罗斯女子竞走选手拉什马诺娃因为服用禁药被禁赛两年她在2012年伦敦奥运会20公里竞走比赛中打破世界纪录并获得的金牌被取消获得银牌的另外一位俄罗斯名将卡尼斯金娜在2015年的样品重检中被查出阳性也被取消了奖牌这样中国选手递补伦敦奥运女子竞走金银铜牌原本铜牌得主切阳什姐此前已经递补到银牌此次再进一步递补为金牌刘虹和吕秀芝递补为银牌和铜牌",

          pinglun:
            "3月21日国际田联诚信委员会通报俄罗斯女子竞走选手拉什马诺娃因为服用禁药被禁赛两年她在2012年伦敦奥运会20公里竞走比赛中打破世界纪录并获得的金牌被取消获得银牌的另外一位俄罗斯名将卡尼斯金娜在2015年的样品重检中被查出阳性也被取消了奖牌这样中国选手递补伦敦奥运女子竞走金银铜牌原本铜牌得主切阳什姐此前已经递补到银牌此次再进一步递补为金牌刘虹和吕秀芝递补为银牌和铜牌3月21日国际田联诚信委员会通报俄罗斯女子竞走选手拉什马诺娃因为服用禁药被禁赛两年她在2012年伦敦奥运会20公里竞走比赛中打破世界纪录并获得的金牌被取消获得银牌的另外一位俄罗斯名将卡尼斯金娜在2015年的样品重检中被查出阳性也被取消了奖牌这样中国选手递补伦敦奥运女子竞走金银铜牌原本铜牌得主切阳什姐此前已经递补到银牌此次再进一步递补为金牌刘虹和吕秀芝递补为银牌和铜牌",
        },
      ],

      crr: [{ shoujiaren: "", shoujihao: "", shoujiandizhi: "" }],
      active: true,
      count: 1,
      gD: false,

      detailObj: {},
      detailImgs: [],
    };
  },
  components: {
    zoom,
    ImageList,
  },
  mounted() {
    // 带条件查询
    getDetail({ id: this.$route.query.id, content: "" })
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
  methods: {
    //   详情/评论
    dc(params) {
      params == "d" ? (this.active = true) : (this.active = false);
    },
    // 加加 减减
    gwc(params) {
      if (params == "de") {
        if (this.count == 1) {
          this.count = 1;
        } else {
          this.count--;
        }
      } else {
        if (this.count == 3) {
          this.count = 3;
        } else {
          this.count++;
        }
      }
    },
    // 跳转购物车页面
    toGwc() {
      // 记录商品 件数
      this.$store.dispatch("lll", {
        id: this.$route.params.id,
        count: this.count,
      });

      let arr = [...this.bGWCArr];

      if (!arr.length) {
        arr.push({ id: this.$route.params.id, count: this.count });
      } else {
        let anew = true; //是否是新类型
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          if (element.id && element.id == this.$route.params.id) {
            element = Object.assign(
              {},
              { id: this.$route.params.id, count: this.count }
            );
            anew = false;
          }
        }

        if (anew) {
          arr.push({ id: this.$route.params.id, count: this.count });
        }
      }

      this.$store.dispatch("allArr", arr);

      // console.log(222, arr);

      // console.log(111, this.bGWCArr);

      // 更新接口
      updateDetailCount({ id: this.$route.params.id, count: this.count }).then(
        (res) => {
          console.log(333, res.data);
        }
      );

      // 如果当前ID 匹配到了 则数据覆盖 否则 将继续添加
      // this.$router.push("/shopping");
    },
  },
  computed: {
    acount() {
      return this.$store.state.aObj;
    },
    bGWCArr() {
      return this.$store.state.GWCArr;
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
    height: 400px;
    display: flex;
    ._detail_top_left {
      margin-right: 10px;
    }

    ._detail_top_right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20px;
      li {
        > ._t {
          background-color: #409eff;
          border-radius: 10px;
          padding: 5px;
        }
        ._jrgwc {
          display: inline-block;
          background-color: rgb(95, 84, 64);
          border-radius: 10px;
          margin-left: 10px;
          padding: 0 10px;
          line-height: 50px;
          cursor: pointer;
        }
      }
      ._title {
        font-weight: bold;
        font-size: 18px;
      }

      > ._price {
        ._xj {
          color: red;
          font-size: 18px;
        }
        ._yj {
          text-decoration: line-through;
          font-size: 14px;
        }
      }

      ._gm {
        display: flex;
        height: 50px;
        user-select: none;
        p {
          span {
            display: inline-block;
            width: 20px;
            height: 100%;
            line-height: 50px;
            text-align: center;
            border: 1px solid #ccc;
            cursor: pointer;
          }
          span:nth-of-type(2) {
            padding: 0 10px;
          }
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
    .gd {
      text-align: center;
      margin: 20px 0;
      cursor: pointer;
    }
  }
}
</style>