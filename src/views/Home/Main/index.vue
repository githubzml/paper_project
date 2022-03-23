<template>
  <div></div>
</template>

<script>
import { getHomeImg } from "@/api";
import moment from "moment";
export default {
  name: "amain",
  components: {},
  data() {
    return {};
  },
  mounted() {
    getHomeImg().then((res) => {
      console.log(res.data);
    });
  },
  methods: {},
};
</script>

<style lang="less" scoped>
main {
  display: flex;
  .left {
    padding-left: 2%;
    width: 18%;
    border: 1px solid red;
    .left_top {
      ._title {
        margin: 10px 0;
      }
      .el-checkbox-group {
        display: flex;
        flex-direction: column;
        .el-checkbox {
          line-height: 30px;
        }
      }
    }
  }
  .right {
    width: 80%;
    border: 1px solid blue;
    .right_top {
      display: flex;
      > div {
        margin: 10px;
      }
    }
  }
}
._product {
  display: flex;
  margin-bottom: 22px;
  > span {
    width: 108px;
    font-size: 18px;
    text-align: right;
    padding-right: 12px;
  }
  ._product_img {
    position: relative;
    width: 140px;
    height: 140px;
    text-align: center;
    line-height: 140px;
    border: 1px solid #ddd;
    color: #999;
    .file_box {
      display: none;
    }
    .img_pic {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>