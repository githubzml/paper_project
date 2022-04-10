<template>
  <div class="_settlement">
    <h3>
      全部商品
      <!-- <span>{{ bcount }}</span> -->
    </h3>

    <ul class="con1">
      <li>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
      </li>
      <li>商品</li>
      <li>单价(元)</li>
      <li>数量</li>
      <li>小计</li>
      <li>操作</li>

      <!-- 全选
      商品
      单价
      数量
      小计
      操作 -->
    </ul>
    <div class="con2">
      <el-checkbox-group
        v-model="checkedCities"
        @change="handleCheckedCitiesChange"
        class="_bbox"
      >
        <div class="_item" v-for="(item, index) in gm" :key="index">
          <el-checkbox :value="item.id" class="_item_box"> </el-checkbox>
          <div class="_item_c">
            <span>{{ item.jianshu }}</span>
            <span>{{ item.jiage }}</span>
            <span class="_o">
              <b @click="option(item.id, index, '-')" class="cp _o_o">-</b>
              {{ item.scount }}
              <b @click="option(item.id, index, '+')" class="cp _o_o">+</b>
            </span>
            <span>¥{{ item.jiage * item.scount }}</span>
            <span
              ><span>收藏</span>|<span @click="del(index)" class="cp"
                >删除</span
              ></span
            >
          </div>
        </div>

        <!-- <span>{{ index }}</span> -->
      </el-checkbox-group>
    </div>

    <footer>
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      >
      <div class="_left">
        <div class="zj">
          <span>总计:</span><span>￥{{ zj }}</span>
        </div>
        <div class="cp js" @click="jS">结算</div>
      </div>
    </footer>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <div class="zje">
        总金额为:<b>￥</b><b>{{ zj }}</b>
      </div>
      <el-form :model="forma">
        <el-form-item label="具体地址" :label-width="formLabelWidth">
          <el-input v-model="forma.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDetail, startPay } from "@/api";
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  data() {
    return {
      aa: "",
      checkList: ["选中且禁用", "复选框 A"],
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      gm: [],
      zj: 0.01,
      dialogFormVisible: false,
      forma: {
        name: "酒仙桥",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    let aa = this.cGWCArr;
    let tempArr = [];
    function cc(id) {
      return getDetail({ id, content: "" });
    }
    for (let index = 0; index < aa.length; index++) {
      const element = aa[index];
      tempArr.push(cc(element.id));
    }
    console.log(111, tempArr);
    Promise.all([...tempArr])
      .then((res) => {
        let pp = [];
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          pp.push(element.data.result[0]);
        }
        this.gm = pp;
      })
      .catch((e) => {
        console.log(333, e);
      });
    console.log(555, this.cGWCArr);
  },
  computed: {
    cGWCArr() {
      return this.$store.state.GWCArr;
    },
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log("value", value);
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.cities.length;
      // this.isIndeterminate =
      //   checkedCount > 0 && checkedCount < this.cities.length;
    },
    option(id, index, o) {
      if (o == "-") {
        this.gm[index].scount = --this.gm[index].scount;
      } else {
        this.gm[index].scount = ++this.gm[index].scount;
      }
    },
    del(index) {
      this.gm.splice(index, 1);
    },
    jS() {
      this.dialogFormVisible = true;
    },
    sure() {
      this.dialogFormVisible = false;
      startPay().then((res) => {
        if (res.data.code == 200) {
          location.href = res.data.paymentUrl;
        }
      });
      // let obj =
      // console.log(111,this.forma);
    },
  },
};
</script>

<style lang="less" scoped>
._settlement {
  position: relative;
  .con1 {
    margin: 10px 0;
    padding: 0 10px;
    height: 50px;
    background-color: #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li:last-child {
      margin-right: 10px;
    }
  }
  .con2 {
    ._bbox {
      display: flex;
      flex-direction: column;
      ._item {
        display: flex;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #ccc;
        margin-top: 10px;
        /deep/._item_box {
          width: calc(~" 100% / 6");
          padding-left: 20px;
        }
        /deep/._item_c {
          width: calc(~"100% - 100% / 6");
          display: flex;
          justify-content: space-around;
          > span {
            width: calc(~" 100% / 5");
            display: inline-block;
            font-size: 16px;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          ._o {
            font-weight: bold;
            ._o_o {
              display: inline-block;
              background-color: #f4f4f4;
              width: 30px;
            }
          }
          > span:last-child {
            span {
              margin: 0 10px;
            }
          }
        }
      }
    }
  }
  footer {
    position: fixed;
    left: 5%;
    bottom: 5%;
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    width: 90%;
    height: 40px;
    line-height: 40px;
    ._left {
      display: flex;
      justify-content: space-between;
      width: 30%;
      .zj {
        width: 100px;
        > span:first-child {
          font-size: 16px;
          color: #ccc;
        }
        > span:last-child {
          font-size: 20px;
          color: red;
        }
      }
      .js {
        width: 100px;
        text-align: center;
        color: white;
        background-color: red;
      }
    }
  }
  .cp {
    cursor: pointer;
  }
}
</style>

<style lang="less" >
.zje {
  width: 100%;
  line-height: 40px;
  text-align: center;
  background-color: #ccc;
  margin-bottom: 10px;

  b {
    color: red;
  }
  b:first-child {
    font-size: 16px;
  }
  b:last-child {
    font-size: 20px;
  }
}
</style>
