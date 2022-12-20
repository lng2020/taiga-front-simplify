<template>
  <div class="container">
    <el-header height="130px">
    <div style="float: left; width: 80%;">
      <div style="padding: 10px"><h1>{{project_name}}</h1></div>
      <el-card style="width: 30%">{{description}}</el-card>
    </div>
  </el-header>
  <el-divider></el-divider>
  <el-main>
    <div style="width: 65%; float: left">
      <el-timeline>
        <el-timeline-item placement="top" :timestamp="formatDate(item.created)" v-for="(item, index) in tableData" :key="index">
          <el-card>
            <p>{{formatTimelineItem(item)}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div style="width: 23%; float: left; margin: 0 30px">
      <div style="width: 100%; background-color: #e6e6e6; height: 30px; padding: 5px; margin: 5px;">
        <h4>Team</h4>
      </div>
      <div v-for="member in members" :key="member.id" class="block">
          <el-avatar shape="square" :src="avaterURL[member.id]"/>
      </div>
    </div>
  </el-main>

  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import request from "../utils/request"
import { ElMessage } from "element-plus";
import { stringifyExpression } from "@vue/compiler-core";

interface tableItem{
  data: Object,
  id: number,
  content_type: number,
  namespace: string,
  event_type: string,
  project: number,
  data_content_type: number,
  created: string
}
let tableData = reactive<tableItem[]>([]);

const avaterURL = [
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png", 
]

let project_name = ref("")
let description = ref("")
let members = reactive([])

const project_id = localStorage.getItem("project_id")
const token = localStorage.getItem("token")
request.get('/projects/'+project_id, {headers:{Authorization:`Bearer ${token}`}}).then((res) => {
    project_name.value = res.data.name
    description.value = res.data.description
    Object.assign(members, res.data.members)
    ElMessage.success('获取后台数据成功');
  }).catch((e) => {
    ElMessage.error('获取后台数据失败');
})
request.get('timeline/project/'+project_id, {headers:{Authorization:`Bearer ${token}`}}).then((res) => {
  Object.assign(tableData, res.data)
  ElMessage.success('获取后台数据成功');
}).catch((e) => {
  ElMessage.error('获取后台数据失败');
})

const parseEventType = (event_type:any) =>{
  event_type = event_type.split(".")
  return {
      section: event_type[0],
      obj: event_type[1],
      type: event_type[2]
  }
}

const formatTimelineItem = (event: tableItem) =>{
  let formatString = ""
  formatString += event.data.user.name
  formatString += " has "
  formatString += parseEventType(event.event_type)["type"]
  formatString += " "
  if (event.data[parseEventType(event.event_type)["obj"]]!=undefined){
    formatString += parseEventType(event.event_type)["obj"]
    formatString += event.data[parseEventType(event.event_type)["obj"]].id
    formatString += " "
    formatString += event.data[parseEventType(event.event_type)["obj"]].subject
  }
  return formatString
}

function formatDate(dateString: string) {
  let date = new Date(dateString)
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' +day + ' ' + year;
}

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
  margin: 5px 5px;
  display: inline;
  width: 40px;
}
</style>
