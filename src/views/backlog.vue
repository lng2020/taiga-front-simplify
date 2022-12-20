<template>
  <div class="container">
    <h2>userstory</h2>
    <br>
    <div class="handle-box">
      <!--      <el-input v-model="query.name" placeholder="问题名" class="handle-input mr10"></el-input>-->
      <el-input placeholder="userstory name" class="handle-input mr10"></el-input>
      <!--            <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>-->
      <el-button type="primary" :icon="Search">search</el-button>
      <!--      <el-button type="primary" :icon="Plus">新问题</el-button>-->
      <el-button type="primary" :icon="Plus" @click="showDialog">new userstory</el-button>
    </div>

    <el-table
        :data="pageData"
        :default-sort="{ prop: 'modified_date', order: 'descending' }"
        style="width: 100%;-webkit-border-horizontal-spacing: 13px;" @row-click="handleClick">
      <el-table-column prop="subject" label="subject" width="500"/>
      <el-table-column label="status" width="180">
        <template #default="scope">
          <el-select v-model="scope.row.status" class="m-2" placeholder="Select" size="large">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  />
          </el-select>
        </template>
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


    <el-dialog title="Create a userstory" v-model="dialogVisible" width="600px">
      <span class="dialog-footer">
        <el-form :model="form" label-width="130px">
          <el-form-item label="Userstory Subject">
            <el-input v-model="form.Userstoryname" />
          </el-form-item>
          <el-form-item label="Userstory Type">
            <el-select
                v-model="form.UserstoryType"
                placeholder="please select your Userstory type"
            >
              <el-option label="Bug" value="Bug" />
              <el-option label="Problem" value="Problem" />
              <el-option label="Enhancement" value="Enhancement" />
            </el-select>
          </el-form-item>
          <el-form-item label="Userstory Severity">
            <el-select
                v-model="form.UserstorySeverity"
                placeholder="please select your Userstory Severity"
            >
              <el-option label="Critical" value="Critical" />
              <el-option label="Important" value="Important" />
              <el-option label="Normal" value="Normal" />
            </el-select>
          </el-form-item>
          <el-form-item label="Userstory Priority">
            <el-select
                v-model="form.UserstoryPriority"
                placeholder="please select your Userstory Priority"
            >
              <el-option label="High" value="High" />
              <el-option label="Medium" value="Medium" />
              <el-option label="Low" value="Low" />
            </el-select>
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="form.desc" type="textarea" />
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
import {ElMessage, ElMessageBox, genFileId, UploadInstance, UploadProps, UploadRawFile} from 'element-plus';
import {ElTable} from 'element-plus'
import {Delete, Edit, Search, Plus} from '@element-plus/icons-vue';
import request from "../utils/request";
import {useRouter} from "vue-router";

const options = [
  {
    value: 1,
    label: "New"
  },
  {
    value: 2,
    label: "Ready"
  },
  {
    value: 3,
    label: "In Progress"
  },
  {
    value: 4,
    label: "Ready for test"
  },
  {
    value: 5,
    label: "Done"
  },
  {
    value: 6,
    label: "Archived"
  },
]
interface userstory {
  name: string;
  status: number;
}

const query = reactive({
  pageIndex: 1,
  pageSize: 10
})

let pageTotal = ref(0);
let tableData = ref<userstory[]>([])
let pageData = ref<userstory[]>([])
const project_id = localStorage.getItem("project_id")
// let tableData = new FormData();

const getData = () => {
  request.get('/userstories', {params:{project: project_id}}).then((res) => {
    ElMessage.success('获取后台数据成功');
    tableData.value = res.data;
    pageData.value = tableData.value.slice((query.pageIndex-1)*query.pageSize, query.pageIndex*query.pageSize-1)
    pageTotal.value = res.data.length;
  }).catch((e) => {
    ElMessage.error('获取后台数据失败');
  })
}
getData();

const form = reactive({
  Userstoryname: "",
  UserstoryType: "",
  UserstorySeverity: "",
  UserstoryPriority: "",
  desc: "",
});

const userstory_id=localStorage.getItem("story_id");

const onSubmit = () => {
  request.put('/issues/' + userstory_id,form).then((res) => {
    ElMessage.success('创建成功');

  }).catch((e) => {
    ElMessage.error('创建失败');
  })
  console.log("submit!");
};

const dialogVisible = ref(false);
const showDialog = () => {
  dialogVisible.value = true;
};
const unshowDialog = () => {
  dialogVisible.value = false;
};

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

const handlePageChange = (val: number) => {
  query.pageIndex = val;
  pageData.value = tableData.value.slice((query.pageIndex-1)*query.pageSize, query.pageIndex*query.pageSize-1)

};

const router = useRouter();
const handleClick = (row: any, event: any, column: any) => {
  localStorage.setItem('userstory_id', row.id)
  router.push('/userstorydetail');
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