<template>
  <div class="_main">
    <div class="swiper-container swiper-main" ref="mySwiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, index) in resultArr"
          :key="index"
        >
          <img :src="item.img" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>

    <section>
      <h1>全部</h1>

      <ul class="_title">
        <li v-for="(item, index) in allList" :key="index">{{ item.type }}</li>
      </ul>
      <div class="_list_box">
        <dl v-for="(item, index) in listArr" :key="index">
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
import Swiper from "swiper";
import { getHomeImg, getHomeList } from "@/api";
import moment from "moment";
export default {
  name: "amain",
  components: {},
  data() {
    return {
      resultArr: [],
      allList: [
        { type: "全部" },
        { type: "书籍" },
        { type: "数码" },
        { type: "电器" },
        { type: "箱/包" },
        { type: "文具" },
        { type: "其他" },
      ],
      listArr: [],
    };
  },
  mounted() {
    getHomeImg().then((res) => {
      let { result } = res.data;
      this.resultArr = result;

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

    getHomeList().then((res) => {
      let { result } = res.data;
      this.listArr = result;

      console.log(result);
    });
  },
  methods: {},
};
</script>

<style lang="less" scoped>
._main {
  .swiper-main {
    width: 600px;
    height: 400px;
    margin: 0 auto;
    .img {
      height: 400px;
    }
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
      background: #ccc;
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