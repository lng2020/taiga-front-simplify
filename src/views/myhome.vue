<template>
	<div>
    <div class="header">
      <div class="logo">项目管理系统</div>
		<div class="header-right">
			<div class="header-user-con">
				<!-- 消息中心 -->
				<div class="btn-bell" @click="router.push('/tabs')">
					<el-tooltip
						effect="dark"
						:content="message ? `有${message}条未读消息` : `消息中心`"
						placement="bottom"
					>
						<i class="el-icon-lx-notice"></i>
					</el-tooltip>
					<span class="btn-bell-badge" v-if="message"></span>
				</div>
				<!-- 用户头像 -->
				<el-avatar class="user-avator" :size="30" :src="avatar" />
				<!-- 用户名下拉菜单 -->
				<el-dropdown class="user-name" trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						{{ username }}
						<el-icon class="el-icon--right">
							<arrow-down />
						</el-icon>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
								<el-dropdown-item>项目仓库</el-dropdown-item>
							</a>
							<el-dropdown-item command="user">个人中心</el-dropdown-item>
							<el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</div>
    </div>

		<el-row :gutter="20">
			<el-col :span="6">
				<el-card shadow="hover">
						<div class="clearfix">
							<span>Information</span>
						</div>
					<div class="info">
						<div class="info-image">
							<img v-bind:src="userphoto1.photo"/>
						</div>
                        <el-divider />
						<div class="info-name">{{ name }}</div>
                        <div v-for="roles in role">
							{{roles}}
						</div>
                        <el-divider />
                        <div>
						<el-row :gutter="100" aglin="middle">
                            <el-col :span="2">{{projectTotal}}</el-col>
                            <el-col :span="2">4</el-col>
                            <el-col :span="2">4</el-col>
                        </el-row>
                        <el-row :gutter="100" aglin="middle">
                            <el-col :span="2">Projects</el-col>
                            <el-col :span="2">ClosedUS</el-col>
                            <el-col :span="2">Contacts</el-col>
                        </el-row>
						</div>
                        <el-divider />
					</div>
				</el-card>
			</el-col>
            <el-col :span="12">
				<el-card shadow="hover">
					<template #header>
						<div class="clearfix">
							<span>Eidt your account</span>
						</div>
					</template>
					<el-form label-width="90px">
						<el-form-item label="username:"> {{ username1 }} </el-form-item>
						<el-form-item label="full name:">
							<el-input type="full_name" v-model="form.full_name"></el-input>
						</el-form-item>
						<!-- <el-form-item label="email:">
							<el-input type="email" v-model="form.email"></el-input>
						</el-form-item>  -->
						<el-form-item label="language:">
            				<el-select
              					v-model="form.lang"
              					placeholder="please select your language"
            				>
              				<el-option label="English" value="English(US)" />
              				<el-option label="Chinese" value="中文（简体）" />
            				</el-select> 
							
          				</el-form-item> 
						  <el-form-item label="Theme:">
            				<el-select
              					v-model="form.theme"
              					placeholder="please select the theme"
            				>

              				<el-option label="common" value="common" />
            				</el-select> 
							
          				</el-form-item> 
						
						<el-form-item>
							<el-button type="primary" @click="onSubmit">edit</el-button>
						</el-form-item>
					</el-form>
				</el-card>
            </el-col>
			<el-col :span="6">
				<el-card shadow="hover">
						<div class="clearfix">
							<span>Your profile</span>
						</div>
							<el-input v-model="form2.bio" type="textarea"></el-input>
					<div style="margin-top: 20px;align-items: center"><el-button round @click="onSubmitbio">Edit Bio</el-button></div>
					
				</el-card>
                <el-card shadow="hover">
						<div class="clearfix">
							<span>Hint</span>
						</div>
						<div>Did you forget what were you working on?</div>
						<br>
						<div>Don't worry,on your dashboard you'll find your open tasts,issues, and user stories in the order you worked on theme.</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="user">
import { reactive, ref } from 'vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import avatar from '../assets/img/img.jpg';
import { onMounted } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRouter } from 'vue-router';
import request from "../utils/request";
import { ElMessage, ElMessageBox } from "element-plus";

const user_id = localStorage.getItem("user_id")
const username1= localStorage.getItem("username")

// username
interface user{
  full_name: string;
}
const userData = ref<user[]>([]);
const usersdata = () => {
  request
    .get('/users/'+user_id)
    .then((res) => {
      ElMessage.success("successfully get data");
	  console.log(user_id);
      userData.value = res.data.full_name;
    })
    .catch((e) => {
      ElMessage.error("failed to get data");
    });
};
usersdata();
const name=userData;
// userrole
interface userrole{
  roles: string;
}
let form =reactive({});
let form2 =reactive({});
const userRole = ref<userrole[]>([]);
const userroles= () => {
	const token = localStorage.getItem("token")
	request
    .get('/users/'+user_id)
    .then((res) => {
      ElMessage.success("successfully get data");
	  console.log(user_id);
      userRole.value = res.data.roles;
	  Object.assign(form,res.data)
	  Object.assign(form2,res.data)
	  //form2.bio='Peole can see everthing you do and what you do and what you are working on.Add a nice bio to give an enhanced version of your information.';
	  form2.bio=res.data.bio;
	  form.full_name=res.data.full_name;
	  form.lang=res.data.lang;
	  form.theme=res.data.theme;
    })
    .catch((e) => {
      ElMessage.error("failed to get data");
    });
};
userroles();
const role=userRole;


const onSubmit = () => {
	const token = localStorage.getItem("token")
	request
    .patch('/users/'+user_id,JSON.stringify(form),{headers:{Authorization:`Bearer ${token}`,'content-type':'application/json'}})
    .then((res) => {
      ElMessage.success("successfully patch data");
    })
    .catch((e) => {
      ElMessage.error("failed to patch data");
    });
};

const onSubmitbio = () => {
	const token = localStorage.getItem("token")
	request
    .patch('/users/'+user_id,JSON.stringify(form2),{headers:{Authorization:`Bearer ${token}`,'content-type':'application/json'}})
    .then((res) => {
      ElMessage.success("successfully patch data");
    })
    .catch((e) => {
      ElMessage.error("failed to patch data");
    });
};

const avatarImg = ref(avatar);
const imgSrc = ref('');
const cropImg = ref('');
const dialogVisible = ref(false);
const cropper: any = ref();

// photo
interface userphoto{
  photo: string;
}
const userphoto1 = reactive<userphoto>({photo:""});
const userPhoto= () => {
  request
    .get('/users/'+user_id)
    .then((res) => {
      ElMessage.success("successfully get data");
      userphoto1.photo= res.data.photo;
    })
    .catch((e) => {
      ElMessage.error("failed to get data");
    });
};
userPhoto();

//watched data
interface Projects {
  name: string;
  description: string;
}
const tableData = ref<Projects[]>([]);
const projectTotal = ref(0);
// 获取表格数据,count project number
const getData = () => {
  request
    .get("/projects", {
      params: {
        member: user_id,
      },
    })
    .then((res) => {
      ElMessage.success("successfully get data");
      tableData.value = res.data;
	  projectTotal.value = res.data.length;
    })
    .catch((e) => {
      ElMessage.error("failed to get data");
    });
};
getData();
const handleClick = (row: any, event: any, column: any) => {
  console.log(row);
  localStorage.setItem('project_id', row.id)
  router.push('/timeline');
}




const username: string | null = localStorage.getItem('ms_username');
const message: number = 2;

const sidebar = useSidebarStore();
// 侧边栏折叠
const collapseChage = () => {
	sidebar.handleCollapse();
};

onMounted(() => {
	if (document.body.clientWidth < 1500) {
		collapseChage();
	}
});

// 用户名下拉菜单选择事件
const router = useRouter();
const handleCommand = (command: string) => {
	if (command == 'loginout') {
		localStorage.removeItem('ms_username');
		router.push('/login');
	} else if (command == 'user') {
		router.push('/myhome');
	}
};
</script>

<style scoped>
.info {
	text-align: center;
	padding: 35px 0;
}
.info-image {
	position: relative;
	margin: auto;
	width: 100px;
	height: 100px;
	background: #f8f8f8;
	border: 1px solid #eee;
	border-radius: 50px;
	overflow: hidden;
}

.info-edit {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	opacity: 0;
	transition: opacity 0.3s ease;
}
.info-edit i {
	color: #eee;
	font-size: 25px;
}
.info-image:hover .info-edit {
	opacity: 1;
}
.info-name {
	margin: 15px 0 10px;
	font-size: 24px;
	font-weight: 500;
	color: #262626;
}
.crop-demo-btn {
	position: relative;
}
.crop-input {
	position: absolute;
	width: 100px;
	height: 40px;
	left: 0;
	top: 0;
	opacity: 0;
	cursor: pointer;
}
.clearfix{
	font-size: 30px;
	font-weight: 500;
}
/*以下是header的style*/
.header {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 70px;
	font-size: 22px;
	color: #fff;
}
.collapse-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	float: left;
	padding: 0 21px;
	cursor: pointer;
}
.header .logo {
	float: left;
	width: 250px;
	line-height: 70px;
	padding-left: 20px;
}
.header-right {
	float: right;
	padding-right: 50px;
}
.header-user-con {
	display: flex;
	height: 70px;
	align-items: center;
}
.btn-fullscreen {
	transform: rotate(45deg);
	margin-right: 5px;
	font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
	position: relative;
	width: 30px;
	height: 30px;
	text-align: center;
	border-radius: 15px;
	cursor: pointer;
	display: flex;
	align-items: center;
}
.btn-bell-badge {
	position: absolute;
	right: 4px;
	top: 0px;
	width: 8px;
	height: 8px;
	border-radius: 4px;
	background: #f56c6c;
	color: #fff;
}
.btn-bell .el-icon-lx-notice {
	color: #fff;
}
.user-name {
	margin-left: 10px;
}
.user-avator {
	margin-left: 20px;
}
.el-dropdown-link {
	color: #fff;
	cursor: pointer;
	display: flex;
	align-items: center;
}
.el-dropdown-menu__item {
	text-align: center;
}
</style>