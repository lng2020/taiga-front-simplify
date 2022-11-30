<template>
  <el-header height="15%">
    <div style="float: left; width: 80%;">
      <div style="padding: 0px 10px;"><h1>{{project_name}}</h1></div>
      <el-card style="width: 30%; padding: 5px">{{discription}}</el-card>
    </div>
  </el-header>
  <el-main>
    <div style="width: 65%; float: left">
      <el-timeline>
        <el-timeline-item timestamp="2022/11/12" placement="top">
          <el-card>
            <h4>更新项目</h4>
            <p>lng2020 committed 2022/11/8 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2022/11/6" placement="top">
          <el-card>
            <h4>更新项目</h4>
            <p>lng2020 committed 2022/11/5 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2022/11/2" placement="top">
          <el-card>
            <h4>创建项目</h4>
            <p>Tom committed 2022/11/2 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-main>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

const tableData = reactive([
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
]);
const project_name = ref("my first project")
const discription = ref("this is discription of my first project")

</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}

.boxTitle {
  width: 100%;
  height: 120px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: rgb(45, 140, 240);
}

.box {
  width: 180px;
  height: 280px;
  float: left;
}

.boxSubtitle {
  width: 100%;
  height: 160px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: rgb(45, 140, 240);
}

.boxValue {
  width: 100%;
  height: 120px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: rgb(45, 140, 240);
}

.block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
</style>
