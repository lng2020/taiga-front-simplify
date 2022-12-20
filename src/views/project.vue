<template>
    <div class="container">
        <h2>project detail</h2>
        <el-container style="width: 60%;">
            <el-aside style="margin: 0 auto ">
                <el-avatar :size="100" :src="imgurl" style="margin: 20px; display: block;"/>
                <el-button>
                    change logo
                </el-button>
            </el-aside>
            <el-main>
                <h3>project name</h3>
                <br>
                <el-input v-model="project_name">
                </el-input>
                <el-divider></el-divider>
                <h3>project description</h3>
                <br>
                <el-input 
                :autosize="{ minRows: 6, maxRows: 8 }" type="textarea" v-model="description">
                </el-input>
                <el-divider></el-divider>
                <div>
                    <div style="float: left; margin: 10px;">
                        <el-avatar shape="square"/>
                    </div>
                    <div style="display: inline; padding: 5px 0 0 0;">
                        <p>project owner</p>
                        <h4>{{ username }}</h4>
                    </div>
                </div>
                <el-divider></el-divider>
                <el-button @click="saveData">
                    save
                </el-button>
            </el-main>
        </el-container>
    </div>
</template>


<script lang="ts" setup>
import {ref, reactive} from 'vue';
import {ElMessage} from 'element-plus';
import request from "../utils/request";
import imgurl from '../assets/img/img.jpg';

let description = ref("")
let project_name = ref("")
let username = ref("")
const getData = () => {
    const token=localStorage.getItem("token")
    const project_id = localStorage.getItem("project_id")
    request.get('/projects/'+project_id, {headers:{Authorization:`Bearer ${token}`}}).then((res) => {
        description.value = res.data.description
        project_name.value = res.data.name
        username.value = res.data.owner.username
    }).catch((e) => {
        ElMessage.error('获取后台数据失败');
    })
}
getData()

const saveData = () =>{
    const token=localStorage.getItem("token")
    const project_id = localStorage.getItem("project_id")
    let form = {
        description: description.value,
        name: project_name.value,
    }
    request.patch('/projects/'+project_id,JSON.stringify(form),{headers:{Authorization:`Bearer ${token}`, 'content-type':'application/json'}}).then((res) => {
        ElMessage.success("修改成功")
        getData()
    }).catch((e) => {
        ElMessage.error('修改失败');
    })
}
</script>