<template>
  <div class="_settlement">
    <h3>
      全部商品<span>{{ bcount }}</span>
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
      <li>单价</li>
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
    <div>
      <el-checkbox-group
        v-model="checkedCities"
        @change="handleCheckedCitiesChange"
      >
        <el-checkbox
          v-for="(city, index) in cities"
          :label="city"
          :key="index"
          >{{ city }}</el-checkbox
        >

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
    </footer>
  </div>
</template>

<script>
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  data() {
    return {
      aa: "",
      checkList: ["选中且禁用", "复选框 A"],
      checkAll: false,
      checkedCities: ["上海", "北京"],
      cities: cityOptions,
      isIndeterminate: true,
    };
  },
  computed: {
    bcount() {
      return this.$store.state.count;
    },
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
  },
};
</script>

<style lang="less" scoped>
._settlement {
  .con1 {
    margin: 10px 0;
    padding: 0 10px;
    height: 50px;
    background-color: #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>