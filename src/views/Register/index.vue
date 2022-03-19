<template>
  <div class="_login">
    <header @click="goHome">
      <h2>社区二手交易网</h2>
      <h3>一个帮你省钱的网站</h3>
    </header>

    <main>
      <div class="left"></div>
      <div class="right">
        <!-- 注册 -->
        <div class="_form" v-if="registerStates">
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
                  v-model="form.email"
                  placeholder="请输入邮箱"
                  @blur="blur_handle_email"
                ></el-input>

                <div class="error_msg" v-show="emailTipShow">
                  邮箱格式不正确
                </div>
              </el-form-item>

              <el-form-item label="昵称" class="_item">
                <el-input
                  v-model="form.nickname"
                  placeholder="昵称1-10个字符"
                  @blur="blur_handle_nickname"
                ></el-input>

                <div class="error_msg" v-show="nicknameTipShow">
                  1-10个字符 字母数字下划线汉字组合
                </div>
              </el-form-item>

              <el-form-item label="密码" class="_item">
                <el-input
                  v-model="form.password"
                  placeholder="密码1-16个字符"
                  show-password
                  @blur="blur_handle_password"
                ></el-input>

                <div class="error_msg" v-show="passwordTipShow">
                  6-16字符，数字字母下滑线组合且首字符为字母
                </div>
              </el-form-item>

              <el-form-item label="验证码" class="_item">
                <el-input
                  v-model="form.code"
                  placeholder="请输入六位验证码"
                  style="width: 150px"
                  @blur="blur_handle_code"
                ></el-input>
                <el-button
                  @click="getCode"
                  :disabled="isDisabled"
                  type="info"
                  style="margin-left: 10px; width: 140px"
                  >{{ txt }}</el-button
                >
                <div class="error_msg" v-show="codeTipShow">
                  验证码为6位数字
                </div>
              </el-form-item>

              <el-form-item>
                <el-button
                  type="primary"
                  @click="onRegister"
                  style="width: 100%"
                  >注册</el-button
                >
              </el-form-item>
              <p class="tip" @click="registerStates = false">
                已有账号，立即登录
              </p>
            </el-form>
          </div>
        </div>
        <!-- 登录 -->
        <div class="_form" v-else>
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
                  v-model="form.email"
                  placeholder="请输入邮箱"
                  @blur="blur_handle_email"
                ></el-input>

                <div class="error_msg" v-show="emailTipShow">
                  邮箱格式不正确
                </div>
              </el-form-item>

              <el-form-item label="密码" class="_item">
                <el-input
                  v-model="form.password"
                  placeholder="密码1-16个字符"
                  show-password
                  @blur="blur_handle_password"
                ></el-input>

                <div class="error_msg" v-show="passwordTipShow">
                  6-16字符，数字字母下滑线组合且首字符为字母
                </div>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onLogin" style="width: 100%"
                  >登录</el-button
                >
              </el-form-item>

              <p class="tip a_login">
                <span @click="registerStates = true">没有账号，立即注册</span
                ><span @click="forgetPassword">忘记密码?</span>
              </p>
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
import { login, testData, register, code } from "@/api";

import ValidForm from "@/utils";

export default {
  name: "Register",
  data() {
    return {
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
        email: "",
        nickname: "",
        password: "",
        code: "",
      },
      labelPosition: "left", //label位置
      txt: "发送邮箱验证码", //验证码按钮文字内容
      isDisabled: false, //是否禁用

      emailTipShow: false,
      nicknameTipShow: false,
      passwordTipShow: false,
      codeTipShow: false,

      registerStates: true,
    };
  },
  mounted() {
    // testData().then((res) => {
    //   console.log("res", res);
    // });
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

    getCode() {
      // 验证邮箱格式
      if (!ValidForm.isEmail(this.form.email)) {
        alert("邮箱格式不正确");
        return;
      }

      // 获取邮箱验证码请求
      code({ email: this.form.email }).then((res) => {
        console.log("res", res.data);
      });

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
    blur_handle_email() {
      if (!ValidForm.isEmail(this.form.email)) {
        this.emailTipShow = true;
      } else {
        this.emailTipShow = false;
      }
    },
    // ? 不能
    blur_handle_nickname() {
      if (!ValidForm.isNickName(this.form.nickname)) {
        this.nicknameTipShow = true;
      } else {
        this.nicknameTipShow = false;
      }
    },
    blur_handle_password() {
      if (!ValidForm.isPassword(this.form.password)) {
        this.passwordTipShow = true;
      } else {
        this.passwordTipShow = false;
      }
    },
    blur_handle_code() {
      if (!ValidForm.isCode(this.form.code)) {
        this.codeTipShow = true;
      } else {
        this.codeTipShow = false;
      }
    },
    onRegister() {
      let isEmpty = false;
      //判断是否有空 检查表单是否填写完整
      for (let key in this.form) {
        if (!this.form[key]) {
          isEmpty = true;
          // return false; //后面将不再执行
          break;
        }
      }
      if (isEmpty) {
        alert("请完善表单信息");
        return;
      }
      //判断是否有错误录入
      if (
        this.emailTipShow ||
        this.nicknameTipShow ||
        this.passwordTipShow ||
        this.codeTipShow
      ) {
        alert("请正确填写表单信息");
        return;
      }
      register(this.form).then((res) => {
        let { code, msg } = res.data;
        if (code == 1) {
          this.registerStates = false;
          for (let key in this.form) {
            this.form[key] = "";
          }
        } else {
          alert(msg);
        }
      });
    },

    onLogin() {
      if (!this.form.email || !this.form.password) {
        alert("请完善表单信息");
        return;
      }

      if (this.emailTipShow || this.passwordTipShow) {
        alert("请正确填写表单信息");
        return;
      }

      login({ email: this.form.email, password: this.form.password }).then(
        (res) => {
          let { code, msg, token } = res.data;
          if (code == 1) {
            console.log("token", token);

            sessionStorage.setItem("_tk", token);
            this.$router.push({ name: "Home" });
          } else {
            alert(msg);
          }
        }
      );
    },
    // 忘记密码
    forgetPassword() {
      this.$router.push("/forgetPassword");
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
      ._form {
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
          cursor: pointer;
        }
        .a_login {
          display: flex;
          justify-content: space-between;
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