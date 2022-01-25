//表单验证
class ValidForm {
  constructor() {
    //邮箱正则表达式
    this.emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  }
  // 验证邮箱
  isEmail(value) {
    return this.emailReg.test(value);
  }
}

export default ValidForm;