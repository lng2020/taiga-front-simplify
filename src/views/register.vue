<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">Register</div>
      <el-form :model="param" :rules="rules" ref="register" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="please enter your username">
            <template #prepend>
              <el-button :icon="User"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              type="password"
              placeholder="please enter your password"
              v-model="param.password">
            <template #prepend>
              <el-button :icon="Lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
              placeholder="please enter your email"
              v-model="param.email"
              @keyup.enter="submitForm(register)">
            <template #prepend>
              <el-button class="el-icon-lx-mail"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="register-btn">
          <el-button type="primary" @click="submitForm(register)">register</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue';
import {useTagsStore} from '../store/tags';
import {useRouter} from 'vue-router';
import {ElMessage} from 'element-plus';
import type {FormInstance, FormRules} from 'element-plus';
import {Lock, User} from '@element-plus/icons-vue';
import request from "../utils/request";


interface RegisterInfo {
  username: string;
  password: string;
  type:string,
  full_name:string,
  email:string,
  accepted_terms:boolean
}

const router = useRouter();
const param = reactive<RegisterInfo>({
  username: '',
  password: '',
  type:"public",
  full_name:"test2",
  email:"",
  accepted_terms:true
});

const rules: FormRules = {
  username: [
    {
      required: true,
      message: 'please enter your username',
      trigger: 'blur'
    }
  ],
  password: [{required: true, message: 'please enter your password', trigger: 'blur'}],
  email: [{required: true, message: 'please enter your email', trigger: 'blur'}]
};

const register = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: boolean) => {
    if (valid) {
      console.log(param);
      // JSON.stringify(data)
      // {headers:{'content-type':'application/json'}}
      request
          .post('/auth/register',JSON.stringify(param),{headers:{'content-type':'application/json'}})
          .then((res) => {
            ElMessage.success('register successfully');
            console.log('fine');
            router.replace('/login');
          })
          .catch((e) => {
          ElMessage.error('register unsuccessfully');
      })
    } else {
      ElMessage.error('register unsuccessfully');
      return false;
    }
  });
};

const tags = useTagsStore();
tags.clearTags();
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login-bg.jpg);
  background-size: 100%;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #000;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.register-btn {
  text-align: center;
}

.register-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

</style>