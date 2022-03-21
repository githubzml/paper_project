<template>
  <!-- 登录 -->
  <div class="bg _login">
    <div class="sss login_form_box">
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

        <el-form-item>
          <el-button type="primary" @click="onLogin" style="width: 100%"
            >登录</el-button
          >
        </el-form-item>

        <p class="tip a_login">
          <span @click="registerBtn">没有账号，立即注册</span
          ><span @click="forgetPassword">忘记密码?</span>
        </p>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api";
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
  methods: {
    // 校验邮箱
    blur_handle_email() {
      if (!ValidForm.isEmail(this.form.email)) {
        this.emailTipShow = true;
      } else {
        this.emailTipShow = false;
      }
    },
    // 校验密码
    blur_handle_password() {
      if (!ValidForm.isPassword(this.form.password)) {
        this.passwordTipShow = true;
      } else {
        this.passwordTipShow = false;
      }
    },
    //登录
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
            this.$router.push("/home/amain");
          } else {
            alert(msg);
          }
        }
      );
    },

    registerBtn() {
      this.$router.push("/register");
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
  position: relative;
  opacity: 0.9;
  .login_form_box {
    height: 280px;
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
</style>