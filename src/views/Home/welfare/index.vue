<template>
  <div>
    <el-button type="info" @click="jz">我要捐赠</el-button>
    <div class="_content">
      <dl v-for="(item, index) in arr" :key="index">
        <dt>
          <img :src="item.pimg" alt="" />
        </dt>
        <dd class="_d _d1">{{ item.desc }}</dd>
        <dd class="_d _d2">
          <span>联系人：{{ item.people }}</span> |
          <span>电话：{{ item.lianxi }}</span>
        </dd>
        <dd class="_option">
          <span @click="edit(item.id)">编辑</span
          ><span @click="del(item.id)">删除</span>
        </dd>
      </dl>
    </div>

    <el-dialog title="捐赠信息" :visible.sync="dialogFormVisible">
      <el-form :model="jzObj">
        <el-form-item label="捐赠商品" :label-width="formLabelWidth2">
          <el-input v-model="jzObj.pname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="捐赠描述" :label-width="formLabelWidth2">
          <el-input v-model="jzObj.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="捐赠人" :label-width="formLabelWidth2">
          <el-input v-model="jzObj.people" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth2">
          <el-input v-model="jzObj.lianxi" autocomplete="off"></el-input>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSure">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑捐赠信息" :visible.sync="dialogFormVisible2">
      <el-form :model="editObj">
        <el-form-item label="捐赠商品" :label-width="formLabelWidth2">
          <el-input v-model="editObj.pname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="捐赠描述" :label-width="formLabelWidth2">
          <el-input v-model="editObj.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="捐赠人" :label-width="formLabelWidth2">
          <el-input v-model="editObj.people" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth2">
          <el-input v-model="editObj.lianxi" autocomplete="off"></el-input>
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
              <img alt="" ref="pic1" :src="editObj.pimg" />
            </div>
          </label>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="editSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGy, updateGy, putGy, delGy } from "@/api";
export default {
  // 一件返回
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth2: "120px",
      jzObj: {
        pname: "",
        desc: "",
        people: "",
        lianxi: "",
        pimg: "",

        // price: "",

        // pdimg: "",
      },
      arr: [],

      dialogFormVisible2: false,
      editObj: {
        pname: "",
        desc: "",
        people: "",
        lianxi: "",
        pimg: "",
      },
    };
  },
  mounted() {
    this.findData({});
  },
  methods: {
    findData(params) {
      getGy(params).then((res) => {
        let { result } = res.data;
        this.arr = result;
        console.log("result", result);
      });
    },
    // 捐赠
    jz() {
      this.dialogFormVisible = true;
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
          that.jzObj.pimg = base64;
        } else {
          that.$refs.pic2.setAttribute("src", base64);
          that.jzObj.pdimg = base64;
        }
      };

      if (file) {
        fileReader.readAsDataURL(file);
      }
    },
    dialogSure() {
      this.dialogFormVisible = false;
      putGy(this.jzObj).then((res) => {
        let { code } = res.data;
        if (code == 200) {
          this.findData({});
        }
      });
    },
    // 编辑
    edit(id) {
      this.dialogFormVisible2 = true;
      this.editObj = {};
      getGy({ id }).then((res) => {
        let { result } = res.data;
        this.editObj = Object.assign({}, result[0]);
      });
    },
    // 编辑确认
    editSure() {
      updateGy(this.editObj).then((res) => {
        let { code } = res.data;
        if (code == 200) {
          this.dialogFormVisible2 = false;
          this.findData({});
        }
      });
    },
    del(id) {
      delGy({ id }).then((res) => {
        let { code } = res.data;
        if (code == 200) {
          this.findData({});
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
._content {
  border-top: 1px dashed #ccc;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  dl {
    position: relative;
    width: 280px;
    // height: 350px;
    border: 1px solid #ccc;
    margin: 20px 5px 0 0;
    dt {
      img {
        width: 280px;
        height: 280px;
      }
    }
    dd {
      height: 30px;
      line-height: 30px;
    }
    ._d1 {
      padding-left: 10px;
    }
    ._d2 {
      border-top: 1px solid #ccc;
      display: flex;
      justify-content: space-around;
    }
    ._option {
      width: 100%;

      position: absolute;
      left: 0;
      bottom: 0;
      background-color: #ccc;
      display: none;
      span {
        display: inline-block;
        width: 49%;
        text-align: center;
        cursor: pointer;
      }
      span:hover {
        color: #409eff;
      }
      span:first-child {
        border-right: 1px solid #444;
      }
    }
  }
  dl:hover {
    border-color: #409eff;
    transform: scale(1.1);
    transition: all 0.5s linear;
    ._option {
      display: block;
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