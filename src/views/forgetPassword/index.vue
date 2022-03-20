<template>
  <div class="bg _forget">
    <div class="sss login_form_box">
      <h1>找回密码</h1>
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

          <div class="error_msg" v-show="emailTipShow">邮箱格式不正确</div>
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
            placeholder="请输入验证码"
            style="width: 140px"
            @blur="blur_handle_code"
          ></el-input>
          <el-button
            @click="getCode"
            :disabled="isDisabled"
            type="info"
            style="margin-left: 10px; width: 130px"
            >{{ txt }}</el-button
          >
          <div class="error_msg" v-show="codeTipShow">验证码为6位数字</div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onFind" style="width: 100%"
            >立即找回</el-button
          >
        </el-form-item>

        <p class="tip">
          <span @click="login">已有帐号，立即登录</span>
        </p>
      </el-form>
    </div>
  </div>
</template>

<script>
import { code, findPassword } from "@/api";
import ValidForm from "@/utils";
export default {
  data() {
    return {
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
  mounted() {},
  methods: {
    //   验证邮箱
    blur_handle_email() {
      if (!ValidForm.isEmail(this.form.email)) {
        this.emailTipShow = true;
      } else {
        this.emailTipShow = false;
      }
    },
    // 验证密码
    blur_handle_password() {
      if (!ValidForm.isPassword(this.form.password)) {
        this.passwordTipShow = true;
      } else {
        this.passwordTipShow = false;
      }
    },
    // 获取验证码
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
    // 验证验证码
    blur_handle_code() {
      if (!ValidForm.isCode(this.form.code)) {
        this.codeTipShow = true;
      } else {
        this.codeTipShow = false;
      }
    },
    // 立即找回
    onFind() {
      let { code, email, password } = this.form;
      let obj = { code, email, password };
      findPassword(obj).then((res) => {
        let { code, msg } = res.data;
        if (code == 200) {
          alert(msg);
          this.$router.push("/login");
        }
      });
    },
    //   已有帐号，立即登录
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped lang="less">
._forget {
  position: relative;
  opacity: 0.9;
  .login_form_box {
    height: 320px;
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

  .el-form-item__content {
    display: flex;
  }
}
</style>