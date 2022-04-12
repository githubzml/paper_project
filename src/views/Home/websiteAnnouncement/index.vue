<template>
  <div class="_websiteannouncement">
    <el-button type="info" @click="qg">求购信息发布</el-button>
    <el-button type="info" @click="productBtn">商品信息发布</el-button>

    <div class="_qg">
      <h2 class="b1">求购公告</h2>
    </div>
    <ul class="_qg_cont">
      <li v-for="(item, index) in qgArr" :key="index">
        <span>求购者：{{ item.nicheng }}</span>
        <span>描述：{{ item.desc }}</span>
        <span>发布时间：{{ new Date(item.createdAt).toLocaleString() }}</span>
        <b title="查看详情" @click="xqClick(item.id)">>>></b>
      </li>
    </ul>
    <div class="_sp">
      <h2 class="b1">商品公告</h2>
    </div>

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

    <el-dialog title="详细信息" :visible.sync="dialogFormVisible9">
      <el-form :model="form9">
        <el-form-item label="昵称" :label-width="formLabelWidth9">
          <el-input v-model="form9.nicheng" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth9">
          <el-input v-model="form9.lianxi" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="求购描述" :label-width="formLabelWidth9">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form9.desc"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="qgClick">确 定 发 布</el-button>
      </div>
    </el-dialog>

    <el-dialog title="求购者信息" :visible.sync="dialogFormVisible10">
      <p>昵称：{{ xqObj.nicheng }}</p>
      <p>描述：{{ xqObj.desc }}</p>
      <p>电话：{{ xqObj.lianxi }}</p>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible10 = false"
          >关 闭</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addType,
  typeAll,
  addProduct,
  findCommodity,
  queryQg,
  getQg,
} from "@/api";
export default {
  data() {
    return {
      token: "",
      // 商品类型添加弹框
      dialogFormVisible: false,
      commodityForm: {
        typeName: "",
      },
      dialogFormVisible2: false,

      formLabelWidth2: "120px",
      ccc: [],
      formLabelWidth: "120px",
      form2: {
        place: "",
        pname: "",
        typeId: "",
        price: "",
        desc: "",
        pimg: "",
        pdimg: "",
      },

      carr: [],

      dialogFormVisible9: false,
      formLabelWidth9: "120px",
      form9: {
        nicheng: "",
        lianxi: "",
        desc: "",
      },
      qgArr: [],
      dialogFormVisible10: false,
      xqObj: {},
    };
  },
  mounted() {
    // 如果token 不存在则跳转到登录页面
    this.token = sessionStorage.getItem("_tk");

    if (!this.token) {
      this.$router.push("/register");
      return;
    }
    this.queryData();
  },
  methods: {
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
    // 商品添加
    infoBtn() {
      // addType
      this.dialogFormVisible = true;
    },
    queryData() {
      queryQg().then((res) => {
        let { result } = res.data;
        this.qgArr = result;
        console.log("result", result);
      });
    },
    // 求购信息发布
    qg() {
      this.dialogFormVisible9 = true;
    },
    xqClick(oid) {
      this.dialogFormVisible10 = true;
      queryQg({ id: oid }).then((res) => {
        let { result } = res.data;
        // this.qgArr = result;
        this.xqObj = result[0];
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

    qgClick() {
      this.dialogFormVisible9 = false;
      getQg(this.form9).then((res) => {
        this.queryData();
      });
    },

    // 确认发布
    sureClick() {
      this.dialogFormVisible2 = false;
      let obj = Object.assign({}, { token: this.token }, this.form2);
      addProduct(obj).then((res) => {
        // console.log("res", res.data);
        // console.log("this.form2", this.form2);
        // 有可能请求体比较大 加上一个控制

        alert("商品发布成功");
        setTimeout(() => {
          this.findProduct();
        }, 1000);
      });
    },
    findProduct() {
      findCommodity({
        token: this.token,
      }).then((res) => {
        let { code, result } = res.data;
        if (code == 200) {
          // console.log(222, result);
          // 数据展示
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
._websiteannouncement {
  .b1 {
    margin: 10px 0;
    width: 150px;
    height: 30px;
    line-height: 30px;
    background-color: #ccc;
    text-align: center;
  }
  ._qg {
  }
  ._qg_cont {
    li {
      position: relative;
      display: flex;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
      span {
        display: inline-block;
        width: 230px;
        // background-color: #ddd;
        margin-right: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      b {
        position: absolute;
        right: 0;
        top: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>

<style lang="less">
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
</style>