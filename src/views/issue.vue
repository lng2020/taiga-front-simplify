<template>
  <div class="container">
    <h2>issue</h2>
    <br>
    <div class="handle-box">
      <el-input v-model="queryInfo.subject" placeholder="issue subject" class="handle-input mr10"></el-input>
      <el-button type="primary" :icon="Search" @click="handleSearch">search</el-button>
      <el-button type="primary" :icon="Plus" @click="showDialog">new issue</el-button>
    </div>

    <el-table
        :data="pageData"
        :default-sort="{ prop: 'modified_date', order: 'descending' }"
        style="width: 100%;-webkit-border-horizontal-spacing: 13px;" @row-click="handleClick">
      <el-table-column prop="type" label="type" width="120">
        <template #default="scope">
          <span v-if="scope.row.type===1" style="color:#E44057;">Bug</span>
          <span v-else-if="scope.row.type===2" style="color:#5178D3;">Problem</span>
          <span v-else style="color:#40E4CE;">Enhancement</span>
        </template>
      </el-table-column>
      <el-table-column prop="severity" label="severity" width="100">
        <template #default="scope">
          <span v-if="scope.row.severity===5" style="color:#ff0000 ;">Critical</span>
          <span v-else-if="scope.row.severity===4" style="color:#20a0ff;">Important</span>
          <span v-else style="color:#00a854;">Normal</span>
        </template>
      </el-table-column>
      <el-table-column prop="priority" label="priority" width="100">
        <template #default="scope">
          <span v-if="scope.row.priority===3">High</span>
          <span v-else-if="scope.row.priority===2">Medium</span>
          <span v-else>Low</span>
        </template>
      </el-table-column>
      <el-table-column prop="subject" label="subject" width="300">
      </el-table-column>
      <el-table-column prop="status" label="status" width="180">
        <template #default="scope">
          <span v-if="scope.row.status===1">New</span>
          <span v-else-if="scope.row.status===2">In progress</span>
          <span v-else-if="scope.row.status===3">Ready for test</span>
          <span v-else-if="scope.row.status===4">Closed</span>
          <span v-else-if="scope.row.status===5">Needs Info</span>
          <span v-else-if="scope.row.status===6">Rejected</span>
          <span v-else-if="scope.row.status===7">Postponed</span>
        </template>
      </el-table-column>
      <el-table-column prop="modified_date" label="modified_date" width="200">
        <template #default="scope">{{ formatDate(scope.row.modified_date) }}</template>
      </el-table-column>
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
    <el-dialog title="Create a Issue" v-model="dialogVisible" width="600px">
      <span class="dialog-footer">
        <el-form :model="form" label-width="120px">
          <el-form-item label="Issue Subject">
            <el-input v-model="form.subject" />
          </el-form-item>
          <el-form-item label="Issue Type">
            <el-select
              v-model="form.type"
              placeholder="please select your Issue type"
            >
              <el-option label="Bug" value="1" />
              <el-option label="Problem" value="2" />
              <el-option label="Enhancement" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="Issue Severity">
            <el-select
              v-model="form.severity"
              placeholder="please select your Issue Severity"
            >
              <el-option label="Critical" value="5" />
              <el-option label="Important" value="4" />
              <el-option label="Normal" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="Issue Priority">
            <el-select
              v-model="form.priority"
              placeholder="please select your Issue Priority"
            >
              <el-option label="High" value="3" />
              <el-option label="Medium" value="2" />
              <el-option label="Low" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="form.description" type="textarea" />
          </el-form-item>
          <el-form-item label="Attachment">
              <el-upload
                ref="upload"
                class="upload-demo"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :limit="5"
                :on-exceed="handleExceed"
                :auto-upload="false"
              >
                <template #trigger>
                  <el-button type="primary">select file</el-button>
                </template>
                <el-button class="ml-3" type="success" @click="submitUpload">
                  upload to server
                </el-button>
              </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button @click="unshowDialog">Cancel</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';
import {ElTable} from 'element-plus'
import {Delete, Edit, Search, Plus} from '@element-plus/icons-vue';
import request from "../utils/request";
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import {useRouter} from "vue-router";

const router = useRouter();
interface Issue {
  id:number;
  type: number;
  severity: number;
  priority: number;
  subject: string;
  status: number;
  modified_date: string;
}

let query = reactive({
  pageIndex: 1,
  pageSize: 10
});
let project_id = localStorage.getItem("project_id")||""
let pageTotal = ref(0);
let tableData = ref<Issue[]>([]);
let pageData = ref<Issue[]>([])
// let tableData = new FormData();
const getData = () => {
  request.get('/issues', {params:{project: project_id}}).then((res) => {
    ElMessage.success('获取后台数据成功');
    tableData.value = res.data;
    pageData.value = tableData.value.slice((query.pageIndex-1)*query.pageSize, query.pageIndex*query.pageSize-1)
    pageTotal.value = res.data.length;
  }).catch((e) => {
    ElMessage.error('获取后台数据失败');
  })
}
getData();
// 分页导航
const handlePageChange = (val: number) => {
  query.pageIndex = val;
  pageData.value = tableData.value.slice((query.pageIndex-1)*query.pageSize, query.pageIndex*query.pageSize-1)

};

//创建新问题
interface formInfo{
  type:string;
  severity:string;
  priority:string;
  status:number;
  subject:string;
  description:string;
  project:string;
}
let form = reactive<formInfo>({
  type:"",
  severity:"",
  priority:"",
  status:1,
  subject:"",
  description:"",
  project:""
})
form.project=project_id;
const onSubmit = () => {
    const token=localStorage.getItem("token");
    console.log("submit!");
    console.log(form);
    request
        .post('/issues',JSON.stringify(form),{
          headers:{Authorization:`Bearer ${token}`,'content-type':'application/json'}})
        .then((res) => {
          ElMessage.success('create successfully');
          unshowDialog();
          getData()
        })
        .catch((e) => {
          ElMessage.error('create unsuccessfullly');
        })
};
const dialogVisible = ref(false);
const showDialog = () => {
  dialogVisible.value = true;
};
const unshowDialog = () => {
  dialogVisible.value = false;
};
// 上传附件
const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = () => {
  upload.value!.submit()
}
// issue详情页跳转
const handleClick = (row: any, event: any, column: any) => {
  localStorage.setItem('issue_id', row.id)
  router.push('/issuedetail');
}

//搜索issue功能
const queryInfo = reactive({
  subject:"",
})

// queryInfo.project=project_id;
const handleSearch = () => {
  console.log(queryInfo.subject);
  request.get('/issues', {params:{project:project_id,subject:queryInfo.subject},headers:{"x-disable-pagination":"1"}}).then((res) => {
    ElMessage.success('获取后台数据成功');
    tableData.value = res.data;
    pageTotal.value = res.data.length;
  }).catch((e) => {
    ElMessage.error('获取后台数据失败');
  })
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