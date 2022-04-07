<template>
  <div class="_main">
    <div class="_left">
      <OLeft></OLeft>
    </div>
    <div class="swiper-container swiper-main" ref="mySwiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, index) in resultArr"
          :key="index"
        >
          <router-link :to="{ path: 'detail', query: { id: item.id } }">
            <img :src="item.img1" />
          </router-link>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>

    <div class="_right">
      <ORight></ORight>
    </div>

    <section>
      <h1>全部</h1>
      <ul class="_title">
        <li
          v-for="(item, index) in allList"
          :key="index"
          @click="liClick(item, index)"
          :class="[oactiveIndex == index ? 'active' : '']"
        >
          {{ item.type }}
        </li>
      </ul>
      <div class="_list_box">
        <dl
          v-for="(item, index) in listArr"
          :key="index"
          @click="dlClick(item)"
        >
          <dt>
            <img :src="item.img1" alt="" />
          </dt>
          <dd class="_jj">
            <span class="_js">{{ item.jianshu }}</span
            ><span class="_jg">￥{{ item.jiage }}</span>
          </dd>
          <dd>{{ item.region }}</dd>
        </dl>
      </div>
    </section>
  </div>
</template>

<script>
//产生包含最小值和最大值的随机数
function RandomNum(Min, Max) {
  var num = Min + Math.round(Math.random() * (Max - Min));
  return num;
}

//产生不重复随机数（5—20   5个）
//定义数组存储随机数
// 取几个
function getJg(c, d, n) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr[i] = RandomNum(c, d); // 调用上面封装好的方法
    for (var j = 0; j < i; j++) {
      //如果重复则 i-- 重新产生一个
      if (arr[i] == arr[j]) {
        i--;
        break;
      }
    }
  }
  return arr;
}

import Swiper from "swiper";
import { getHomeList } from "@/api";
import ORight from "@/components/MainRight";
import OLeft from "@/components/MainLeft";
export default {
  name: "amain",
  components: { OLeft, ORight },
  data() {
    return {
      resultArr: [],
      allList: [
        { type: "全部", enType: "" },
        { type: "书籍", enType: "shu" },
        { type: "数码", enType: "shuma" },
        { type: "电器", enType: "dianqi" },
        { type: "箱/包", enType: "bao" },
        { type: "文具", enType: "wenju" },
        { type: "其他", enType: "qita" },
      ],
      tempListArr: [],
      listArr: [],
      oactiveIndex: 0,
    };
  },
  mounted() {
    getHomeList().then((res) => {
      let { result } = res.data;
      this.listArr = result;
      this.tempListArr = result;

      let aa = getJg(0, result.length, 3); //从0到几取3个

      let tempArr = [];
      for (let index = 0; index < result.length; index++) {
        for (let i = 0; i < aa.length; i++) {
          if (index == aa[i]) {
            tempArr.push(result[index]);
          }
        }
      }
      console.log("result", tempArr, result);

      this.resultArr = tempArr;

      this.$nextTick(() => {
        new Swiper(this.$refs.mySwiper, {
          autoplay: true,
          loop: true, // 循环模式选项
          clickable: true,
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
          },
        });
      });
    });
  },
  methods: {
    // 类型选择
    liClick(p1, index) {
      if (!p1.enType) {
        this.listArr = this.tempListArr;
      } else {
        this.listArr = this.tempListArr.filter(
          (item) => item.stype == p1.enType
        );
      }
      this.oactiveIndex = index;
    },
    // 详情跳转
    dlClick(p1) {
      this.$router.push({ name: "detail", query: { id: p1.id } });
    },
  },
};
</script>

<style lang="less" scoped>
._main {
  position: relative;
  ._left {
    position: absolute;
    width: calc(~"(100% - 600px)/2");
    height: 400px;
    top: 0;
    left: 0;
  }
  .swiper-main {
    width: 580px;
    height: 400px;
    margin: 0 auto;
    border: 1px solid #ccc;
    img {
      height: 100%;
      width: 100%;
    }
  }
  ._right {
    position: absolute;
    width: calc(~"(100% - 600px)/2");
    height: 400px;
    top: 0;
    right: 0;
  }
  section {
    h1 {
      font-size: 20px;
      padding: 10px 0;
      margin-left: 10px;
      border-bottom: 1px solid #ccc;
    }
    ._title {
      display: flex;
      justify-content: space-between;
      margin-left: 60%;
      width: 40%;
      padding: 10px 5px;
      li {
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #ccc;
        margin: 0 10px;
      }
      li:hover {
        background-color: #409eff;
      }
      .active {
        background-color: #409eff;
      }
      cursor: pointer;
    }
    ._list_box {
      display: flex;
      flex-wrap: wrap;
      dl {
        width: 250px;
        height: 250px;
        border: 1px solid #ccc;
        margin: 20px;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        dt {
          width: 200px;
          height: 200px;
          margin: 5px 0 0 25px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        dd {
          margin: 0 5px;
        }
        ._jj {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          ._js {
            display: inline-block;
            width: 180px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          ._jg {
            color: red;
          }
        }
      }
      dl:hover {
        border: 1px solid black;
        transform: scale(1.1);
        transition: all 0.2s linear;
      }
    }
  }
}
</style>