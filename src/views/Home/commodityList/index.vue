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
import { findTypeDate, updateNickName, updatePwd, getHomeList } from "@/api";
import moment from "moment";
export default {
  name: "amain",
  components: {},
  data() {
    return {
      formLabelWidth: "120px",
      token: "",
      searchContent: "",

      allList: [],
      checkList: [],
      // 下拉框
      optionsPrice: [
        { label: "由低到高", value: "0" },
        { label: "默认", value: "1" },
        { label: "由高到底", value: "2" },
      ],
      priceValue: "1",

      optionsAddress: [{ value: "全部", label: "全部" }],

      value: "",

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
        this.otherListArr.map((item) => {
          arr.push(item.en_type);
        });
        this.checkList = arr;

        this.listArr = this.otherListArr;
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

      let checkedCount = value.length;

      if (checkedCount) {
        let karr = [];
        this.otherListArr.forEach((element1) => {
          value.forEach((element2) => {
            if (element1.en_type == element2) {
              karr.push(element1);
            }
          });
        });
        this.listArr = karr;
        this.checkAll = this.otherListArr.length == checkedCount; //是否全选
      } else {
        this.listArr = this.otherListArr;
      }

      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.otherListArr.length;
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

.fzb {
  margin-right: 10px;
}
</style>