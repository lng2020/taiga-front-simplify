<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">注册</div>
      <el-form :model="param" :rules="rules" ref="register" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="请输入用户名">
            <template #prepend>
              <el-button :icon="User"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              type="password"
              placeholder="设置密码"
              v-model="param.password"
              @keyup.enter="submitForm(register)"
          >
            <template #prepend>
              <el-button :icon="Lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="register-btn">
          <el-button type="primary" @click="submitForm(register)">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue';
import {useTagsStore} from '../store/tags';
import {usePermissStore} from '../store/permiss';
import {useRouter} from 'vue-router';
import {ElMessage} from 'element-plus';
import type {FormInstance, FormRules} from 'element-plus';
import {Lock, User} from '@element-plus/icons-vue';
import request from "../utils/request";


interface RegisterInfo {
  username: string;
  password: string;
}

const router = useRouter();
const param = reactive<RegisterInfo>({
  username: '',
  password: ''
});

const rules: FormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}]
};
const permiss = usePermissStore();
const register = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: boolean) => {
    if (valid) {
      let data = new FormData();

      data.append('username', param.username);
      data.append('password', param.password);
      data.append('type', "public");
      data.append('full_name', "test123");
      data.append('email', "test@test.com");
      data.append('accepted_terms', "True");
      console.log(data);
      console.log(JSON.stringify(data));
      // ElMessage.success('注册成功');
      request.post('/auth-register', JSON.stringify(data), {headers: {'content-type': 'application/json'}}).then((res) => {
        ElMessage.success('注册成功');
        // localStorage.setItem('token', res.data.auth_token);
        console.log('fine');
        router.push('/');
      })
    } else {
      ElMessage.error('注册失败');
      // router.push('/login');
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