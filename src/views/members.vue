<template>
    <div class="container">
    <el-header>    
        <h2 style="float: left">Manage members</h2>
        <el-button type="default" style="float: right;" @click="openDialog">+NEW MEMBER</el-button>
    </el-header>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column>
            <template #default="scope">
                <div style="float: left; margin: 10px;">
                    <el-avatar shape="square"/>
                </div>
                <div style="display: inline">
                    <h4 style="margin: 20px">{{ scope.row.full_name }}</h4>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Admin">
            <template #default="scope">
                <el-switch v-model="scope.row.is_admin"/>
            </template>
        </el-table-column>
        <el-table-column label="Role" prop="role_name">
            <template #default="scope">
                <el-select v-model="scope.row.role_name" class="m-2" placeholder="Select" size="large">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                </el-select>
            </template>
        </el-table-column>
        <el-table-column label="Status">
            <template #default="scope">
                <el-button type="default" v-if="scope.row.is_active == true">active</el-button>
                <el-button type="default" v-else>disactive</el-button>
            </template>
        </el-table-column>
        <el-table-column>
            <template #default="scope">
                <el-icon :size="20" @click="memberDelete(scope.row.id)"><Delete/></el-icon>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="Add Member">
        <el-form>
            <el-form-item label="username" v-model="form.bulk_memberships[0].username">
                <el-input v-model="form.bulk_memberships[0].username" />
            </el-form-item>
            <el-form-item label="role" v-model="form.bulk_memberships[0].role_id">
                <el-select v-model="form.bulk_memberships[0].role_id" placeholder="please select role">
                    <el-option
                            v-for="(item, index) in options"
                            :key="item.value"
                            :label="item.label"
                            :value="index"
                            />
                </el-select>
            </el-form-item>
            <el-button type="default" @click="addMember">Add</el-button>
            <el-button type="default" @click="closeDialog">Cancel</el-button>
        </el-form>
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


let dialogFormVisible = ref(false)

const options = [
    {
        value: "UX",
        label: "UX"
    },
    {
        value: "Design",
        label: "Design"
    },
    {
        value: "Front",
        label: "Front",
    },{
        value: "Back",
        label: "Back"
    },
    {
        value: "Product Owner",
        label: "Product Owner"
    },
    {
        value: "Stakeholder",
        label: "Stakeholder"
    }
]

let tableData = ref([
])

let form = reactive({
    project_id: 1,
    bulk_memberships: [
        {
            role_id: 5,
            username: "user2114747470430251528"
        }
    ]
})

const memberDelete = (id: number) => {
    console.log(id)
    const token = localStorage.getItem("token")
    request.delete('/memberships/'+id, {
          headers:{Authorization:`Bearer ${token}`}}).then((res)=>{
            ElMessage.success('删除成功')
            getMember()
          }).catch((e) => {
            ElMessage.error('删除失败')
          })
}

const getMember = () => {
    const token=localStorage.getItem("token")
    const project_id = localStorage.getItem("project_id")
    request.get('/memberships', {params:{project: project_id}}).then((res) => {
        tableData.value = res.data
    }).catch((e) => {
        ElMessage.error('获取后台数据失败');
    })
}
getMember()

const addMember = () => {
    const token=localStorage.getItem("token");
    console.log("submit!");
    console.log(form);
    request
        .post('/memberships/bulk_create',JSON.stringify(form),{
          headers:{Authorization:`Bearer ${token}`,'content-type':'application/json'}})
        .then((res) => {
          ElMessage.success('create successfully');
        })
        .catch((e) => {
          ElMessage.error('create unsuccessfullly');
        })
    dialogFormVisible.value = false
    getMember()
}

const openDialog = () => {
    dialogFormVisible.value = true
}

const closeDialog = () => {
    dialogFormVisible.value = false
}
</script>