<template>
  <div class="_home">
    <header>
      <!-- 省钱易 好逛好玩 -->
      <ul>
        <li>省钱易，好逛又好玩</li>
        <li class="_head">
          <span class="ml10">用户名：{{ userMsg.nickName }}</span>
          <p class="ml10 cp" title="修改用户头像">
            <img :src="userMsg.headImg" alt="" ref="pic0" />
            <label class="_headimg cp"
              ><input type="file" @change="updateHeadImg" ref="s0"
            /></label>
          </p>
          <span class="ml10 cp _setting"
            >设置
            <ol class="_ol">
              <li @click="updateNickname">修改昵称</li>
              <li @click="updatePassword">修改密码</li>
            </ol>
          </span>
          <span class="ml10 cp" @click="logOut">退出登录</span>
        </li>
      </ul>
    </header>
    <!-- 搜索 -->
    <ul class="_search">
      <li>
        <i class="iconfont icon-gouwucheman"></i>
        <span>省钱易</span>
      </li>
      <li class="_nav fzb">
        <span @click="clickHome">首页</span>
        <span @click="clickCommodityList">商品清单</span>
        <span @click="clickAnnouncement">网站公告</span>
        <span @click="clickUs">关于我们</span>
        <span @click="clickWelfare">爱心公益</span>
      </li>
      <li>
        <el-input
          v-model="searchContent"
          placeholder="请输入内容"
          style="width: 300px"
          :round="false"
        ></el-input>
        <el-button plain :round="false" @click="searchClick">搜索</el-button>
      </li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
import { userinfo, findTypeDate, uploadUserImg, findCommodity } from "@/api";
import moment from "moment";
export default {
  name: "Home",
  components: {},
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
          bc: "关注省钱易",
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

    // 初始查询
    // this.searchClick();

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

    findCommodity({ token: this.token }).then((res) => {
      let { code, result } = res.data;
      if (code == 200) {
        this.listArr = result;
      } else {
      }
    });
  },
  methods: {
    // 搜索
    searchClick() {
      this.$router.push("/home/search");
      return;

      // 每次查询几条数据
      let count = 10; //拿几条数据
      let offset = 0; //偏移量

      // 获取商品类型数据
      findTypeDate({
        token: this.token,
        count,
        offset,
        typeName: this.searchContent,
      }).then((res) => {
        let { code, result } = res.data;
        if (code == 200) {
          let arr = [];
          result.forEach((element) => {
            element.created_at = moment(element.created_at).format(
              "YYYY-MM-DD,HH:mm:ss"
            );
            element.updated_at = moment(element.updated_at).format(
              "YYYY-MM-DD,HH:mm:ss"
            );
            arr.push(element);
          });
        } else {
        }
      });
    },
    // 更换头像
    updateHeadImg() {
      let file = null;
      let that = this;

      file = this.$refs.s0.files[0];

      // 获取图片base64
      let fileReader = new FileReader();

      // 监听是否读取完毕
      fileReader.onload = function () {
        let base64 = this.result;
        that.$refs.pic0.setAttribute("src", base64);

        let obj = Object.assign({}, { token: that.token, base64 });

        uploadUserImg(obj).then((res) => {
          if (res.data.code == 200) {
            alert(res.data.msg);
          } else {
            alert(res.data.msg);
          }
        });
      };

      if (file) {
        fileReader.readAsDataURL(file);
      }
    },
    updateNickname() {
      this.dialogFormVisible3 = true;
    },
    updatePassword() {
      this.dialogFormVisible4 = true;
    },
    // 退出登录
    logOut() {
      sessionStorage.removeItem("_tk");
      this.$router.push("/login");
    },
    clickHome() {
      this.$router.push("/home/amain");
    },
    // 商品清单
    clickCommodityList() {
      this.$router.push("/home/commodityList");
    },
    // 网站公告
    clickAnnouncement() {
      this.$router.push("/home/websiteannouncement");
    },
    clickUs() {
      this.$router.push("/home/aboutus");
    },
    clickWelfare() {
      this.$router.push("/home/welfare");
    },
  },
};
</script>

<style scoped lang="less">
._home {
  // 控制部分字体大小
  .fzb {
    font-size: 20px;
    font-weight: bold;
  }
  // 导航
  header {
    display: flex;
    ul {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eaeaea;
      > li {
        margin-right: 20px;
      }
      ._head {
        display: flex;
        align-items: center;
        p {
          position: relative;
          width: 30px;
          height: 30px;
          img {
            width: 30px;
            height: 30px;
          }
          ._headimg {
            position: absolute;
            left: 0;
            top: 0;
            height: 30px;
            width: 30px;
            input {
              display: none;
            }
          }
        }
        ._setting {
          position: relative;
          ._ol {
            position: absolute;
            width: 100px;
            border: 1px solid skyblue;
            display: none;
            z-index: 1;
            background-color: #409eff;
            left: -35px;
            top: 18px;
            li {
              height: 30px;
              line-height: 30px;
              text-align: center;
            }
            li:hover {
              color: darkgoldenrod;
            }
          }
        }
        ._setting:hover {
          ._ol {
            display: block;
          }
        }
        .ml10 {
          margin-left: 10px;
        }
        .cp {
          cursor: pointer;
        }
      }
      li:hover {
        // color: darkgoldenrod;
      }
    }
  }
  // 搜索
  ._search {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding-left: 30px;
    li {
      display: flex;
      align-items: center;
      i {
        font-size: 40px;
        color: skyblue;
      }
    }
    li:nth-of-type(1) {
    }

    ._nav {
      span {
        padding: 0 20px;
        cursor: pointer;
      }
    }

    li:nth-of-type(3) {
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
}
</style>