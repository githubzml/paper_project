<template>
  <div class="_Gantt">
    <ul>
      <li
        v-for="(uidItem, index) in uid_target_arr"
        :key="index"
        @click="changeUid(uidItem.id)"
      >
        {{ uidItem.name }}
      </li>
    </ul>
    <div ref="gantt" class="ganttBox"></div>
  </div>
</template>

<script>
import { gantt } from "dhtmlx-gantt";
export default {
  data() {
    return {
      uid_target_arr: [
        {
          id: "2f2e65e4f4154dcbae7774473f602bec",
          name: "19#楼基础模板施工",
        },
        {
          id: "db613e2e97ea4a4a8adf97ed15c4bc54",
          name: "施工准备",
        },
        {
          id: "c0c635f3e4c64823985268679138da3e",
          name: "石湖峪项目2020年度",
        },
      ],
      uid_target: "",
      tasks: {},
    };
  },
  mounted() {
    // 默认展示第一个gantt图
    this.uid_target = this.uid_target_arr[0];
    this.tasks = JSON.parse(
      this.load(process.env.VIEW_FILE_API + "ganttapi/data/" + this.uid_target)
    );
    // 初始化
    gantt.init(this.$refs.gantt);
    gantt.parse(this.tasks);
    // 甘特图增删改查
    var loaddataurl =
      process.env.VIEW_FILE_API + "ganttapi/data/" + this.uid_target;
    gantt.load(loaddataurl);
    var dp = new gantt.dataProcessor(process.env.VIEW_FILE_API + "ganttapi/");
    dp.init(gantt);
    dp.setTransactionMode({
      mode: "REST",
      payload: {
        uid_target: this.uid_target,
      },
    });
  },
  methods: {
    // 获取gantt数据
    load(name) {
      let xhr = new XMLHttpRequest(),
        okStatus = document.location.protocol === "file:" ? 0 : 200;
      xhr.open("GET", name, false);
      xhr.overrideMimeType("text/html;charset=utf-8"); //默认为utf-8
      xhr.send(null);
      return xhr.status === okStatus ? xhr.responseText : null;
    },
    // 点击顶部甘特图切换按钮
    changeUid(id) {
      this.uid_target = id;
      this.$nextTick(() => {
        this.tasks = JSON.parse(
          this.load(process.env.VIEW_FILE_API + "ganttapi/data/" + id)
        );
        gantt.init(this.$refs.gantt);
        gantt.parse(this.tasks);
        gantt.render();
      });
    },
  },
};
</script>

<style>
/* @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css"; */
._Gantt {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #ebebeb;
  display: flex;
  flex-direction: column;
}
ul {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
}
li {
  padding: 4px 10px;
  background: #3166f6;
  color: #fff;
  margin-right: 10px;
  border-radius: 4px;
  cursor: pointer;
}
.ganttBox {
  flex: 1;
}
</style>