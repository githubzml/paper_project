<template>
  <div class="_home">
    <header>
      <!-- 省钱易 好逛好玩 -->
      <ul>
        <li>省钱易，好逛又好玩</li>
        <li class="_head">
          {{ userMsg.nickName }}
          <p>
            <img :src="userMsg.headImg" alt="" ref="pic0" />
            <label class="_headimg"
              ><input type="file" @change="updateHeadImg" ref="s0"
            /></label>
          </p>
          <span class="_setting"
            >设置
            <ol class="_ol">
              <li @click="updateNickname">修改昵称</li>
              <li @click="updatePassword">修改密码</li>
            </ol>
          </span>
          <span @click="logOut">退出登录</span>
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
        <span>首页</span>
        <span>商品清单</span>
        <span>网站公告</span>
        <span>关于我们</span>
        <span>爱心公益</span>
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

    <main>
      <section class="left">
        <div class="left_top">
          <h1 class="_title fzb">类别</h1>
          <el-checkbox-group v-model="checkList">
            <el-checkbox
              v-for="(item, index) in labelList"
              :label="item.type"
            ></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="left_bottom"></div>
      </section>
      <section class="right">
        <div class="right_top">
          <div>
            <span class="fzb">价格</span>
            <el-select v-model="value" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="fzb">区域</span>
            <el-select v-model="value" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="right_bottom"></div>
      </section>
    </main>

    <section>
      <div>
        <dl v-for="(item, index) in listArr" :key="index">
          <dt><img :src="item.pimg" alt="" /></dt>
          <dd>{{ item.pname }}</dd>
          <dd>{{ item.desc }}</dd>
          <dd>{{ item.region }}</dd>
          <dd>{{ item.price }}</dd>
        </dl>
      </div>
    </section>
    <el-button type="info" @click="infoBtn">发布按钮</el-button>
    <!-- 弹框 -->
    <el-dialog title="发布商品类型" :visible.sync="dialogFormVisible">
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

    <el-button type="info" @click="clickPay">支付</el-button>

    <el-button type="info" @click="productBtn">商品发布</el-button>

    <el-dialog title="发布商品" :visible.sync="dialogFormVisible2">
      <el-form :model="form2">
        <el-form-item label="商品地址" :label-width="formLabelWidth2">
          <el-input v-model="form2.place" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="formLabelWidth2">
          <el-input v-model="form2.pname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="商品类型" :label-width="formLabelWidth2">
          <el-select v-model="form2.typeId" placeholder="请选择商品类型">
            <el-option
              v-for="(item, index) in ccc"
              :label="item.typeName"
              :value="item.typeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth2">
          <el-input v-model="form2.price" autocomplete="off"></el-input>
        </el-form-item>

        <div class="_product">
          <span>商品图片</span>
          <label class="_product_img">
            <span>上传图片</span>
            <input
              type="file"
              class="file_box"
              @change="previewFile(1)"
              ref="s1"
            />
            <div class="img_pic">
              <img alt="" ref="pic1" />
            </div>
          </label>
        </div>

        <div class="_product _product_detail">
          <span>商品详情图片</span>
          <label class="_product_img">
            <span>上传图片</span>

            <input
              type="file"
              class="file_box"
              @change="previewFile(2)"
              ref="s2"
            />
            <div class="img_pic">
              <img alt="" ref="pic2" />
            </div>
          </label>
        </div>

        <el-form-item label="商品描述" :label-width="formLabelWidth2">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form2.desc"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureClick">确 定 发 布</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改昵称" :visible.sync="dialogFormVisible3">
      <el-form :model="form3">
        <el-form-item label="新昵称" :label-width="formLabelWidth">
          <el-input v-model="form3.newName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="aSure">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible4">
      <el-form :model="form4">
        <el-form-item label="旧密码" :label-width="formLabelWidth">
          <el-input v-model="form4.oldPassword" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="form4.newPassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bSure">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  userinfo,
  addType,
  findTypeDate,
  startPay,
  typeAll,
  addProduct,
  uploadUserImg,
  updateNickName,
  updatePwd,
  findCommodity,
} from "@/api";
import ListContainer from "./ListContainer";
import moment from "moment";
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
      // 商品类型添加弹框
      dialogFormVisible: false,
      commodityForm: {
        typeName: "",
      },
      formLabelWidth: "120px",
      token: "",
      searchContent: "",

      // 复选框
      labelList: [
        { id: 0, type: "全部" },
        {
          id: 1,
          type: "数码",
        },

        {
          id: 2,
          type: "书籍",
        },

        {
          id: 3,
          type: "生活用品",
        },

        {
          id: 4,
          type: "服饰",
        },

        {
          id: 5,
          type: "美妆",
        },

        {
          id: 6,
          type: "出行",
        },

        {
          id: 7,
          type: "其他",
        },
      ],
      checkList: ["全部"],
      // 下拉框
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form2: {
        place: "",
        pname: "",
        typeId: "",
        price: "",
        desc: "",
        pimg: "",
        pdimg: "",
      },
      formLabelWidth2: "120px",
      ccc: [],
      dialogFormVisible3: false,
      form3: {
        newName: "",
      },

      dialogFormVisible4: false,

      form4: {
        oldPassword: "",
        newPassword: "",
      },

      listArr: [],
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
    this.searchClick();

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
    },
    // 商品添加
    infoBtn() {
      // addType
      this.dialogFormVisible = true;
    },
    dialogSure() {
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
    searchClick() {
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
    // 支付
    clickPay() {
      startPay().then((res) => {
        if (res.data.code == 200) {
          location.href = res.data.paymentUrl;
        }
      });
    },
    // 商品发布
    productBtn() {
      this.dialogFormVisible2 = true;
      // 获取商品类型
      typeAll({ token: this.token }).then((res) => {
        let { code, msg, result } = res.data;
        if (code == 200) {
          this.ccc = result;
          console.log("this.ccc ", this.ccc);
        } else {
          alert(msg);
        }
      });
    },
    // 图片上传
    previewFile(p) {
      let file = null;
      let that = this;

      if (p == 1) {
        file = this.$refs.s1.files[0];
      } else {
        file = this.$refs.s2.files[0];
      }

      // 获取图片base64
      let fileReader = new FileReader();

      // 监听是否读取完毕
      fileReader.onload = function () {
        let base64 = this.result;
        if (p == 1) {
          that.$refs.pic1.setAttribute("src", base64);
          that.form2.pimg = base64;
        } else {
          that.$refs.pic2.setAttribute("src", base64);
          that.form2.pdimg = base64;
        }
      };

      if (file) {
        fileReader.readAsDataURL(file);
      }
    },
    // 确认发布
    sureClick() {
      this.dialogFormVisible2 = false;
      let obj = Object.assign({}, { token: this.token }, this.form2);
      addProduct(obj).then((res) => {
        console.log("res", res.data);
        console.log("this.form2", this.form2);
        // 有可能请求体比较大 加上一个控制
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

    aSure() {
      this.dialogFormVisible3 = false;
      let obj = Object.assign(
        {},
        { token: this.token, nickname: this.form3.newName }
      );

      updateNickName(obj).then((res) => {
        if (res.data.code == 200) {
          this.userMsg.nickName = this.form3.newName;
        } else {
          alert(res.data.msg);
        }
      });
    },

    bSure() {
      this.dialogFormVisible4 = false;
      let obj = Object.assign(
        {},
        { token: this.token },
        {
          oldPassword: this.form4.oldPassword,
          newPassword: this.form4.newPassword,
        }
      );

      updatePwd(obj).then((res) => {
        if (res.data.code == 200) {
          this.$router.push("/register");
        } else {
          alert(res.data.msg);
        }
      });
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
            width: 200px;
            height: 200px;
            border: 1px solid skyblue;
            display: none;
          }
        }
        ._setting:hover {
          ._ol {
            display: block;
          }
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
    margin: 20px 0;
    padding-left: 30px;
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
  ._product_detail {
  }
}
</style>