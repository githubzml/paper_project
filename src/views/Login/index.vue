<template>
  <div class="_login">
    <header @click="goHome">
      <h2>社区二手交易网</h2>
      <h3>一个帮你省钱的网站</h3>
    </header>

    <main>
      <div class="left"></div>
      <div class="right">
        <div class="login_form">
          <div class="login_form_box">
            <h1>账号密码登录</h1>

            <el-form ref="form" :model="form" label-width="80px">
              <el-input
                v-model="phoneNumber"
                placeholder="请输入手机号码"
              ></el-input>
              <el-input
                v-model="loginPassword"
                placeholder="请输入登录密码"
              ></el-input>

              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <ul>
        <li v-for="(item, index) in links" :key="index">{{ item }}</li>
      </ul>
      <p>{{ copy }}</p>
    </footer>
  </div>
</template>

<script>
// 第一种方式
// import axios from "axios";
// 第二种方式 接口统一管理
import { testData, register, login } from "@/api";

export default {
  name: "Login",
  data() {
    return {
      model: {},
      phoneNumber: "",
      loginPassword: "",
      links: [
        "关于我们 ",
        " 联系我们 ",
        " 人才招聘 ",
        " 商家入驻 ",
        " 广告服务 ",
        " 手机京东 ",
        " 友情链接 ",
        " 销售联盟 ",
        " 京东社区 ",
        " 京东公益 ",
      ],
      copy: "Copyright © 2004-2022  SQ.com 版权所有",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  mounted() {
    testData().then((res) => {
      console.log("res", res);
    });
    // axios.get("/api/testData").then((res) => {
    //   console.log("res", res);
    // });
    // register({ id: 10, name: "Kk" }).then((res) => {
    //   console.log("res", res);
    // });

    // login({ username: "mark", password: "a123456" }).then((res) => {
    //   console.log("res", res);
    // });
  },
  methods: {
    goHome() {
      this.$router.push("/home");
    },
    onSubmit() {},
  },
};
</script>

<style lang="less" scoped>
._login {
  height: 100%;
  display: flex;
  flex-direction: column;
  header {
    height: 60px;
    margin-left: 20px;
    width: 160px;
    cursor: pointer;

    h2 {
      font-size: 22px;
    }
    h3 {
      padding-top: 10px;
      padding-left: 5px;
    }
  }
  header:hover {
    color: aqua;
  }

  main {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: calc(~"100% - 140px");
    .left {
      width: 100%;
      height: 400px;
      background: url("../../assets/images/login/社区.jpg") center center
        no-repeat;
      background-size: cover;
    }
    .right {
      position: absolute;
      right: 0;
      top: 0;
      .login_form {
        width: 440px;
        height: 400px;
        background-color: #fff;
        opacity: 0.9;
        .login_form_box {
          // margin: 73px 40px 67px;
          h1 {
            font-size: 22px;
            margin-bottom: 20px;
            text-align: center;
          }
        }
      }
    }
  }
  footer {
    height: 60px;
    ul {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li:hover {
        color: aqua;
        cursor: pointer;
      }
    }
    p {
      text-align: center;
    }
  }
}
</style>