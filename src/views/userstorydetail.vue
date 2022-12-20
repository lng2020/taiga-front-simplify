<template>
  <div class="container">
    <el-container width="100%">
      <el-aside width="900px">
        <div>
          <h2>{{ us.subject }}</h2>
          <p style="float: right">created by {{ us.owner }}</p>
        </div>
        <el-divider></el-divider>
        <div style="margin: 0 auto;">
          <h3 style="text-align: center;">Attachment</h3>
          <div style="margin: 0 auto">
            <el-upload style="display: block; margin: 0 auto" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            multiple >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
              </div>
            </template>
          </el-upload>
          </div>
        </div>
        <el-divider></el-divider>
        <div>
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="Comment" name="first">Comment</el-tab-pane>
            <el-tab-pane label="Activity" name="second">Activity</el-tab-pane>
          </el-tabs>
        </div>
      </el-aside>
      <el-main>
        <div style="background: #f9f9fb">
          <h2 style="margin: 10px">status</h2>
          <el-select v-model="us.status" class="m-2" placeholder="Select" size="large">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-divider></el-divider>
          <h2>assigned to</h2>
          <div>
            <div style="float: left; margin: 10px">
              <el-avatar shape="square" />
            </div>
            <div style="display: inline">
              <h4 style="margin: 20px">{{ us.assigned_to }}</h4>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import request from "../utils/request";
import imgurl from "../assets/img/img.jpg";
import type { TabsPaneContext } from 'element-plus'


let activeName = ref("first")
const options = [
  {
    value: 1,
    label: "New",
  },
  {
    value: 2,
    label: "Ready",
  },
  {
    value: 3,
    label: "In Progress",
  },
  {
    value: 4,
    label: "Ready for test",
  },
  {
    value: 5,
    label: "Done",
  },
  {
    value: 6,
    label: "Archived",
  },
];

let us = reactive({
  subject: "my first us",
  status: "In progress",
  assigned_to: "lng2020",
  owner: "lng2020"
});


const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}


</script>
