<template>
  <div class="container">
    <el-container width="100%">
      <el-aside width="70%">
        <div style="height: 30%">
          
        </div>
        <el-divider></el-divider>
        <div style="height: 30%"></div>
        <el-divider></el-divider>
        <div style="height: 30%"></div>
      </el-aside>
      <el-main>
        <div style="background: #f9f9fb">
          <h2 style="margin: 10px">status</h2>
          <el-select
            v-model="us.status"
            class="m-2"
            placeholder="Select"
            size="large"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
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

let us = reactive({});
</script>
