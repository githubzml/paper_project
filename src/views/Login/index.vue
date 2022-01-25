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
            <h1>省钱易</h1>
            <el-form
              ref="form"
              :model="form"
              label-width="80px"
              :label-position="labelPosition"
            >
              <el-form-item label="邮箱" class="_item">
                <el-input
                  v-model="phoneNumber"
                  placeholder="请输入邮箱"
                ></el-input>

                <div class="error_msg">邮箱格式不正确</div>
              </el-form-item>

              <el-form-item label="昵称">
                <el-input
                  v-model="loginPassword"
                  placeholder="昵称1-10个字符"
                ></el-input>
              </el-form-item>

              <el-form-item label="密码">
                <el-input
                  v-model="loginPassword"
                  placeholder="密码1-16个字符"
                ></el-input>
              </el-form-item>

              <el-form-item label="验证码">
                <el-input
                  v-model="loginPassword"
                  placeholder="请输入六位验证码"
                  style="width: 150px"
                ></el-input>
                <el-button
                  @click="getCode"
                  :disabled="isDisabled"
                  type="info"
                  style="margin-left: 10px; width: 140px"
                  >{{ txt }}</el-button
                >
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit" style="width: 100%"
                  >注册</el-button
                >
              </el-form-item>

              <p class="tip">已有账号，立即登录</p>
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

import ValidForm from "@/utils";

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
      labelPosition: "left", //label位置
      txt: "发送邮箱验证码", //验证码按钮文字内容
      isDisabled: false, //是否禁用
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
    getCode() {
      this.isDisabled = true; // 禁止不间断点击
      let time = 5; //开启定时器
      this.txt = `${time}s后重新发送`;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.txt = `发送邮箱验证码`;
          time = 5;
          this.isDisabled = false;
        } else {
          time--;
          this.txt = `${time}s后重新发送`;
        }
      }, 1000);
    },
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
    height: calc(~"100% - 120px");
    .left {
      width: 100%;
      height: 400px;
      // background: url("~@/assets/images/login/社区.jpg") center center no-repeat;
      background-size: cover;
    }
    .right {
      position: absolute;
      right: 0;
      top: 20%;
      background: #53c9c9;
      border-radius: 10px;
      .login_form {
        width: 400px;
        opacity: 0.9;
        .login_form_box {
          padding: 20px 10px 0 10px;
          h1 {
            font-size: 22px;
            margin-bottom: 20px;
            text-align: center;
          }
          ._item {
            position: relative;
            .error_msg {
              position: absolute;
              top: 32px;
              left: 0;

              color: #e4393c;
            }
          }
        }
        .tip {
          text-align: right;
          padding-bottom: 10px;
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