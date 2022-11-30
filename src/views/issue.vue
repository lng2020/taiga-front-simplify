<template>
  <div class="container">
    <h2>issue</h2>
    <br>
    <div class="handle-box">
      <!--      <el-input v-model="query.name" placeholder="问题名" class="handle-input mr10"></el-input>-->
      <el-input placeholder="issue name" class="handle-input mr10"></el-input>
      <!--            <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>-->
      <el-button type="primary" :icon="Search">search</el-button>
      <!--      <el-button type="primary" :icon="Plus">新问题</el-button>-->
      <el-button type="primary" :icon="Plus">new issue</el-button>
    </div>
    <el-table
        :data="tableData"
        :default-sort="{ prop: 'modified_date', order: 'descending' }"
        style="width: 100%">
      <el-table-column prop="type" label="type" sortable width="100"/>
      <el-table-column prop="severity" label="severity" width="180"/>
      <el-table-column prop="priority" label="priority" width="180"/>
      <el-table-column prop="name" label="name" width="180"/>
      <el-table-column prop="status" label="status" width="180"/>
      <el-table-column prop="modified_date" label="modified_date" width="180"/>
    </el-table>
    <div class="pagination">
      <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';
import {ElTable} from 'element-plus'
import {Delete, Edit, Search, Plus} from '@element-plus/icons-vue';
import type {TableColumnCtx} from 'element-plus/es/components/table/src/table-column/defaults'
import request from "../utils/request";

interface Issue {
  type: number;
  severity: number;
  priority: number;
  name: string;
  status: number;
  modified_date: string;

}

const query = reactive({
  pageIndex: 1,
  pageSize: 10
});
const project_id = localStorage.getItem("project_id")
const pageTotal = ref(0);
const tableData = ref<Issue[]>([]);
// let tableData = new FormData();
const getData = () => {
  request.get('/issues', {params:{project: project_id}}).then((res) => {
    ElMessage.success('获取后台数据成功');
    console.log(res.data[0].type);
    tableData.value = res.data;
    // tableData.append('type', res.data.type);
    // tableData.append('severity', res.data.severity);
    // tableData.append('priority', res.data.priority);
    // tableData.append('name', res.data.name);
    // tableData.append('status', res.data.status);
    // tableData.append('modified_date', res.data.modified_date);
    pageTotal.value = res.data.length;
    // localStorage.setItem('token', res.data.auth_token);
    // console.log('fine');
  }).catch((e) => {
    ElMessage.error('获取后台数据失败');
  })
}
getData();
// 分页导航
const handlePageChange = (val: number) => {
  query.pageIndex = val;
  getData();
};

</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-input {
  width: 300px;
}

.mr10 {
  margin-right: 10px;
}

</style>