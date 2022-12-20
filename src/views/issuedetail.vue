<template>
  <div class="container">
    <h2>issue: </h2>
    <br>
    <el-form :v-model="form" label-width="120px">
      <el-form-item label="subject">
        <el-input v-model="form.subject"/>
      </el-form-item>
      <el-form-item label="type">
        <el-select v-model="form.type" placeholder="please select your type">
          <el-option label="Bug" value="1"/>
          <el-option label="Problem" value="2"/>
          <el-option label="Enhancement" value="3"/>
        </el-select>
      </el-form-item>
      <el-form-item label="severity">
        <el-select v-model="form.severity" placeholder="please select your severity">
          <el-option label="Critical" value="5"/>
          <el-option label="Important" value="4"/>
          <el-option label="Normal" value="3"/>
        </el-select>
      </el-form-item>
      <el-form-item label="priority">
        <el-select v-model="form.priority" placeholder="please select your priority">
          <el-option label="High" value="3"/>
          <el-option label="Medium" value="2"/>
          <el-option label="Low" value="1"/>
        </el-select>
      </el-form-item>
      <el-form-item label="status">
        <el-select v-model="form.status" placeholder="please select your status">
          <el-option label="New" value="1"/>
          <el-option label="In progress" value="2"/>
          <el-option label="Ready for test" value="3"/>
          <el-option label="Closed" value="4"/>
          <el-option label="Needs Info" value="5"/>
          <el-option label="Rejected" value="6"/>
          <el-option label="Postponed" value="7"/>
        </el-select>
      </el-form-item>
      <el-form-item label="description">
        <el-input v-model="form.description" type="textarea" :rows="5"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Save</el-button>
        <router-link to="/issue"><el-button>Cancel</el-button></router-link>
      </el-form-item>
    </el-form>
    <el-form :v-model="attachments" label-width="120px">
      <el-form-item label="Attachment">
        <el-upload
            ref="upload"
            class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :limit="5"
            :on-exceed="handleExceed"
            :auto-upload="false">
          <template #trigger>
            <el-button type="primary">select file</el-button>
          </template>
          <el-button class="ml-3" type="success" @click="submitUpload">
            upload to server
          </el-button>
        </el-upload>
      </el-form-item>
    </el-form>
<!--    评论功能-->

  </div>
</template>

<script lang="ts" setup>

import request from "../utils/request";
import {ElMessage, FormInstance, genFileId, UploadInstance, UploadProps, UploadRawFile} from "element-plus";
import {nextTick, onMounted, ref, watch} from "vue";
import {reactive} from 'vue'
import {useRouter} from "vue-router";

interface formInfo{
  type:any;
  severity:any;
  priority:any;
  status:any;
  subject:string;
  description:string;
}
let form = reactive<formInfo>({
  type:"",
  severity:"",
  priority:"",
  status:"",
  subject:"",
  description:""
})
let attachments = reactive({})
const state = reactive({
  type:["Bug","Problem","Enhancement"],
  severity:["Normal","Normal","Normal","Important","Critical"],
  priority:["Low","Medium","High"],
  status:["New","In progress","Ready for test","Closed","Needs Info","Rejected","Postponed"]
})
const issue_id = localStorage.getItem("issue_id")
const getData = () => {
  request.get('/issues/' + issue_id).then((res) => {
    ElMessage.success('获取后台数据成功');
    res.data.type=state.type[res.data.type-1];
    res.data.severity=state.severity[res.data.severity-1];
    res.data.priority=state.priority[res.data.priority-1];
    res.data.status=state.status[res.data.status-1];
    Object.assign(form,res.data);
  }).catch((e) => {
    ElMessage.error('获取后台数据失败');
  })
  request.get('/issues/attachments/' + issue_id).then((res) => {
    // ElMessage.success('获取后台数据成功');
    // Object.assign(form,res.data);
  }).catch((e) => {
    ElMessage.error('获取附件失败');
  })
}
getData();
//上传附件
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
// {headers:{"Authorization":'Bearer #{token}'}}
//修改issue
console.log(form);

const router = useRouter();
const onSubmit = () => {
  console.log('submit!');
  const token=localStorage.getItem("token");
  for(var i=0;i<3;i++)
  {
    if(state.type[i]==form.type) form.type=i+1;
  }
  for(var i=2;i<5;i++)
  {
    if(state.severity[i]==form.severity) form.severity=i+1;
  }
  for(var i=0;i<3;i++)
  {
    if(state.priority[i]==form.priority) form.priority=i+1;
  }
  for(var i=0;i<7;i++)
  {
    if(state.status[i]==form.status) form.status = i+1;
  }
  request
      .patch("/issues/"+issue_id,JSON.stringify(form),{
        headers:{Authorization:`Bearer ${token}`,'content-type':'application/json'}})
      .then((res) => {
        console.log("save successfully");
        router.replace("/issue");
      })
      .catch((e) => {
          ElMessage.error('save unsuccessfully');
      })
}

// 评论功能

</script>

<style scoped>

</style>