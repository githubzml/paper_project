<template>
  <div class="_home">
    <header>
      <ul>
        <li>社区换欢迎您！</li>
        <li class="_head">
          {{ userMsg.nickName }} <img :src="userMsg.headImg" alt="" />
        </li>
        <li>退出登录</li>
      </ul>
      <ul @click="navClick">
        <li v-for="(item, index) in navList" :index="index" :data-id="item.id">
          {{ item.bc }}
        </li>
      </ul>
    </header>
    <!-- 搜索 -->
    <ul class="_search">
      <li>
        <i class="iconfont icon-gouwucheman"></i>
        <span>社区换</span>
      </li>
      <li>
        <el-input
          v-model="searchContent"
          placeholder="请输入内容"
          :round="false"
        ></el-input>
        <el-button plain :round="false" @click="searchClick">搜索</el-button>
      </li>
    </ul>

    <main>
      <div class="type-nav">
        <div class="container">
          <!-- 事件委派|事件委托 -->
          <div>
            <h2 class="all">全部商品分类</h2>
            <!-- 过渡动画 -->
            <transition name="sort">
              <!-- 三级联动 -->
              <div class="sort">
                <!-- 利用事件委派+编程式导航实现路由的跳转与传递参数 -->
                <div class="all-sort-list2"></div>
              </div>
            </transition>
          </div>
          <nav class="nav">
            <a href="###">服装城</a>
            <a href="###">美妆馆</a>
            <a href="###">尚品汇超市</a>
            <a href="###">全球购</a>
            <a href="###">闪购</a>
            <a href="###">团购</a>
            <a href="###">有趣</a>
            <a href="###">秒杀</a>
          </nav>
        </div>
      </div>

      <ListContainer />
    </main>
    <el-button type="info" @click="infoBtn">信息按钮</el-button>
    <!-- 弹框 -->
    <el-dialog title="添加商品类型" :visible.sync="dialogFormVisible">
      <el-form :model="commodityForm">
        <el-form-item label="商品类型" :label-width="formLabelWidth">
          <el-input
            v-model="commodityForm.typeName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userinfo, addType, findTypeDate } from "@/api";
import ListContainer from "./ListContainer";
export default {
  name: "Home",
  components: {
    ListContainer,
  },
  data() {
    return {
      // 用户信息
      userMsg: {
        nickName: null,
        headImg: null,
      },
      // 导航按钮
      navList: [
        {
          id: 0,
          bc: "我的订单",
        },
        {
          id: 1,
          bc: "我的购物车",
        },
        {
          id: 2,
          bc: "会员",
        },
        {
          id: 3,
          bc: "关注社区换",
        },
        {
          id: 4,
          bc: "合作招商",
        },
        {
          id: 5,
          bc: "商家后台",
        },
      ],
      // 商品类型添加弹框
      dialogFormVisible: false,
      commodityForm: {
        typeName: "",
      },
      formLabelWidth: "120px",
      token: "",
      searchContent: "",
    };
  },
  mounted() {
    // 如果token 不存在则跳转到登录页面
    this.token = sessionStorage.getItem("_tk");

    if (!this.token) {
      this.$router.push("/register");
      return;
    }

    // 每次查询几条数据
    let count = 3; //拿几条数据
    let offset = 0; //偏移量

    // 获取商品类型数据
    findTypeDate({ token: this.token, count, offset }).then((res) => {
      console.log("res", res.data);
    });
    // validLogin
    userinfo({ token: this.token }).then((res) => {
      let { code, msg, result } = res.data;
      if (code == 200) {
        this.userMsg.nickName = result[0].nickname;
        this.userMsg.headImg = result[0].url;
      } else {
        console.log("res", res.data);
      }
    });
  },
  methods: {
    // 导航点击
    navClick(event) {
      switch (event.target.getAttribute("data-id")) {
        // 我的订单
        case "0":
          break;
        // 我的购物车
        case "1":
          break;
        default:
          alert("没有绑定事件");
      }
      console.log("event", event.target.getAttribute("data-id"));
    },
    // 商品添加
    infoBtn() {
      // addType
      this.dialogFormVisible = true;
    },
    dialogSure() {
      console.log("this.commodityForm.typeName", this.commodityForm.typeName);

      if (!this.commodityForm.typeName) {
        alert("请填写商品类型");
        return;
      }
      // 将商品类型与用户id绑定在一起
      addType({
        token: this.token,
        typeName: this.commodityForm.typeName,
      }).then((res) => {
        let { code, msg, result } = res.data;
        if (code == 200) {
          this.dialogFormVisible = false;
          this.commodityForm.typeName = "";
        } else {
          console.log("失败");
        }
      });
    },
    // 搜索
    searchClick() {},
  },
};
</script>

<style scoped lang="less">
._home {
  // 导航
  header {
    display: flex;
    justify-content: space-between;
    background-color: #eaeaea;
    ul {
      height: 30px;
      display: flex;
      align-items: center;
      li {
        margin-right: 20px;
      }
      ._head {
        img {
          width: 30px;
          height: 30px;
        }
      }
      li:hover {
        color: darkgoldenrod;
      }
    }
  }
  // 搜索
  ._search {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    padding-left: 100px;
    li {
      display: flex;
      align-items: center;
      i {
        font-size: 80px;
        color: skyblue;
      }
    }
    li:nth-of-type(1) {
    }

    li:nth-of-type(2) {
      .el-input {
        width: 490px;
        height: 40px;
      }
      .el-button {
        height: 40px;
        width: 100px;
        border-radius: 0;
        border-left: none;
      }
      .el-input__inner {
        border-radius: 0;
      }
    }
  }

  main {
    .type-nav {
      border-bottom: 2px solid #e1251b;

      .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
          width: 210px;
          height: 45px;
          background-color: #e1251b;
          line-height: 45px;
          text-align: center;
          color: #fff;
          font-size: 14px;
          font-weight: bold;
        }

        .nav {
          a {
            height: 45px;
            margin: 0 22px;
            line-height: 45px;
            font-size: 16px;
            color: #333;
          }
        }

        .sort {
          position: absolute;
          left: 0;
          top: 45px;
          width: 210px;
          height: 461px;
          position: absolute;
          background: #fafafa;
          z-index: 999;

          .all-sort-list2 {
            .item {
              h3 {
                line-height: 30px;
                font-size: 14px;
                font-weight: 400;
                overflow: hidden;
                padding: 0 20px;
                margin: 0;

                a {
                  color: #333;
                }
              }

              .item-list {
                display: none;
                position: absolute;
                width: 734px;
                min-height: 460px;
                background: #f7f7f7;
                left: 210px;
                border: 1px solid #ddd;
                top: 0;
                z-index: 9999 !important;

                .subitem {
                  float: left;
                  width: 650px;
                  padding: 0 4px 0 8px;

                  dl {
                    border-top: 1px solid #eee;
                    padding: 6px 0;
                    overflow: hidden;
                    zoom: 1;

                    &.fore {
                      border-top: 0;
                    }

                    dt {
                      float: left;
                      width: 54px;
                      line-height: 22px;
                      text-align: right;
                      padding: 3px 6px 0 0;
                      font-weight: 700;
                    }

                    dd {
                      float: left;
                      width: 415px;
                      padding: 3px 0 0;
                      overflow: hidden;

                      em {
                        float: left;
                        height: 14px;
                        line-height: 14px;
                        padding: 0 8px;
                        margin-top: 5px;
                        border-left: 1px solid #ccc;
                      }
                    }
                  }
                }
              }
            }
            .cur {
              background: skyblue;
            }
          }
        }
        // 过渡动画的样式
        // 进入的开始状态
        .sort-enter {
          height: 0px;
          // transform: rotate3d(); // 过渡动画
        }
        // 进入的结束状态
        .sort-enter-to {
          height: 461px;
          // transform: rotate3d(); // 过渡动画
        }
        // 定义动画时间，速率
        .sort-enter-active {
          transition: all 0.5s linear;
        }
      }
    }
  }
}
</style>