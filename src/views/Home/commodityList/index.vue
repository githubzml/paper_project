<template>
  <div>
    <main>
      <section class="left">
        <div class="left_top">
          <h1 class="_title fzb">类别</h1>

          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <el-checkbox-group v-model="checkList" @change="changeValue">
            <el-checkbox
              v-for="(item, index) in allList"
              :label="item.en_type"
              :key="index"
            ></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="left_bottom"></div>
      </section>
      <section class="right">
        <div class="right_top">
          <div>
            <span class="fzb">价格</span>
            <el-select
              v-model="priceValue"
              clearable
              placeholder="请选择"
              @change="jgSelect"
            >
              <el-option
                v-for="(item, index) in optionsPrice"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="fzb">区域</span>
            <el-select
              v-model="addressValue"
              clearable
              placeholder="请选择"
              @change="qySelect"
            >
              <el-option
                v-for="item in optionsAddress"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="right_bottom">
          <div class="_list_box" v-if="listArr.length">
            <dl
              v-for="(item, index) in listArr"
              :key="index"
              @click="dlClick(item)"
            >
              <dt>
                <img :src="item.img1" alt="" />
              </dt>
              <dd class="_jj">
                <span class="_js">{{ item.jianshu }}</span
                ><span class="_jg">￥{{ item.jiage }}</span>
              </dd>
              <dd>{{ item.region }}</dd>
            </dl>
          </div>
          <div class="no_data" v-else>暂无数据</div>
        </div>
      </section>
    </main>

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
let cc = (p1, type) => {
  let arr1 = p1.filter((item) => item[type]);
  let result = arr1.map((item) => {
    return {
      value: item[type],
      labe: item[type],
    };
  });
  return result;
};
import {
  addType,
  findTypeDate,
  startPay,
  typeAll,
  addProduct,
  updateNickName,
  updatePwd,
  getHomeList,
} from "@/api";
import moment from "moment";
export default {
  name: "amain",
  components: {},
  data() {
    return {
      // 商品类型添加弹框
      dialogFormVisible: false,
      commodityForm: {
        typeName: "",
      },
      formLabelWidth: "120px",
      token: "",
      searchContent: "",

      // 复选框
      // allList: [
      //   {
      //     id: 1,
      //     type: "家用电器",
      //     region: "1单元",
      //     price: 199,
      //     pimg: require("../../../assets/images/home_jpg/1电视/1.jpg"),
      //   },

      //   {
      //     id: 2,
      //     type: "电脑 / 办公",
      //     region: "2单元",
      //     price: 299,
      //   },

      //   {
      //     id: 3,
      //     type: "家居 / 家具 / 家装 / 厨具",
      //     region: "3单元",
      //     price: 399,
      //   },

      //   {
      //     id: 4,
      //     type: "男装 / 女装 / 童装 / 内衣",
      //     region: "4单元",
      //     price: 499,
      //   },

      //   {
      //     id: 5,
      //     type: "美妆 / 个护清洁 / 宠物",
      //     region: "5单元",
      //     price: 599,
      //   },

      //   {
      //     id: 6,
      //     type: "女鞋 / 箱包 / 钟表 / 珠宝",
      //     region: "6单元",
      //     price: 699,
      //   },

      //   {
      //     id: 7,
      //     type: "其他",
      //   },
      // ],
      allList: [],
      checkList: ["家用电器"],
      // 下拉框
      optionsPrice: [
        { label: "由低到高", value: "0" },
        { label: "默认", value: "1" },
        { label: "由高到底", value: "2" },
      ],
      priceValue: "1",

      optionsAddress: [{ value: "全部", label: "全部" }],

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

      listArr: [], //列表总数据
      otherListArr: [], //一个变量 记录列表总数据

      addressValue: "全部",

      isIndeterminate: true,
      checkAll: false,
      contentArr: [],
    };
  },
  mounted() {
    // 如果token 不存在则跳转到登录页面
    this.token = sessionStorage.getItem("_tk");

    if (!this.token) {
      this.$router.push("/register");
      return;
    }

    this.optionsAddress = cc(this.allList, "region");

    // 初始查询
    // this.searchClick();
    getHomeList().then((res) => {
      let { result } = res.data;
      let oarr = [];
      let aarr = [];
      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        oarr.push({
          en_type: element.en_type,
          type: element.stype,
        });
        aarr.push({
          value: element.region,
          label: element.region,
        });
      }

      this.allList = oarr; // 左侧类型
      this.listArr = result; // 右侧列表
      this.otherListArr = result; // 一个变量总数据

      this.optionsAddress = [{ value: "全部", label: "全部" }, ...aarr];

      console.log(111, result);
      console.log(222, oarr);
    });
  },
  methods: {
    // 区域筛选
    qySelect() {
      console.log(this.addressValue);
      if (!this.addressValue) {
        this.listArr = this.otherListArr;
        return;
      }
      if (this.addressValue == "全部") {
        this.listArr = this.otherListArr;
      } else {
        this.listArr = this.otherListArr.filter(
          (item) => item.region == this.addressValue
        );
      }
    },
    // 价格筛选
    jgSelect() {
      if (this.priceValue == 0) {
        //根据价格值 从低到高排序
        function sortId(a, b) {
          return a.jiage - b.jiage;
        }
        this.listArr.sort(sortId);
      } else if (this.priceValue == 1) {
        function sortId(a, b) {
          return a.id - b.id;
        }
        this.listArr.sort(sortId);
      } else {
        //根据价格值 从高到低排序
        function sortId(a, b) {
          return b.jiage - a.jiage;
        }
        this.listArr.sort(sortId);
      }
    },
    // 详情跳转
    dlClick(p1) {
      this.$router.push({ name: "detail", query: { id: p1.id } });
    },
    toDetail(paramsId) {
      this.$router.push({ name: "detail", query: { id: paramsId } });
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
        // console.log("res", res.data);
        // console.log("this.form2", this.form2);
        // 有可能请求体比较大 加上一个控制
      });
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

    handleCheckAllChange(val) {
      if (val) {
        let arr = [];
        this.allList.map((item) => {
          arr.push(item.type);
        });
        this.checkList = arr;
      } else {
        this.checkList = [];
      }
      this.isIndeterminate = false;
    },

    changeValue(value) {
      //左侧选择 这里
      
      // 商品排序 从高到低

      // 选择

      // 公告

      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.allList.length;
      // this.isIndeterminate =
      //   checkedCount > 0 && checkedCount < this.allList.length;

      // let tempArr = [];
      // value.forEach((aa) => {
      //   tempArr = tempArr.concat(
      //     this.allList.filter((item) => item.type == aa)
      //   );
      // });

      // this.contentArr = tempArr;

      console.log(this.checkList);
    },
  },
};
</script>

<style lang="less" scoped>
main {
  display: flex;
  .left {
    padding-left: 2%;
    width: 18%;
    border-right: 1px solid #ccc;
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
    .right_top {
      display: flex;
      border-bottom: 1px solid #ccc;
      > div {
        margin: 10px;
      }
    }
    .right_bottom {
      ._list_box {
        display: flex;
        flex-wrap: wrap;
        dl {
          width: 250px;
          height: 250px;
          border: 1px solid #ccc;
          margin: 20px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          dt {
            width: 200px;
            height: 200px;
            margin: 5px 0 0 25px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          dd {
            margin: 0 5px;
          }
          ._jj {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            ._js {
              display: inline-block;
              width: 180px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            ._jg {
              color: red;
            }
          }
        }
        dl:hover {
          border: 1px solid black;
          transform: scale(1.1);
          transition: all 0.2s linear;
        }
      }
      .no_data {
        height: 300px;
        line-height: 300px;
        font-weight: bold;
        font-size: 40px;
        text-align: center;
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
.fzb {
  margin-right: 10px;
}
</style>