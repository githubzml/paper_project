<template>
  <div class="_home">
    <header>
      <ul>
        <li>省钱易欢迎您！</li>
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
    <div>home</div>
    <el-button type="info" @click="infoBtn">信息按钮</el-button>

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
import { userinfo, addType } from "@/api";
export default {
  name: "Home",
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
    };
  },
  mounted() {
    // 如果token 不存在则跳转到登录页面
    this.token = sessionStorage.getItem("_tk");

    if (!this.token) {
      this.$router.push("/register");
      return;
    }
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
      addType({ token: this.token }).then((res) => {

        
        console.log("res", res.data);
      });
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style scoped lang="less">
._home {
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
}
</style>