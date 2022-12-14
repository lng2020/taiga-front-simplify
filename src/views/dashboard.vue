<template>
  <div>
    <div class="header">
      <div class="logo">项目管理系统</div>
      <div class="header-right">
        <div class="header-user-con">
          <!-- 消息中心 -->
          <div class="btn-bell">
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
          <el-avatar class="user-avator" :size="30" :src="imgurl" />
          <!-- 用户名下拉菜单 -->
          <el-dropdown
            class="user-name"
            trigger="click"
            @command="handleCommand"
          >
            <span class="el-dropdown-link">
              {{ username }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <a
                  href="https://github.com/lin-xin/vue-manage-system"
                  target="_blank"
                >
                  <el-dropdown-item>项目仓库</el-dropdown-item>
                </a>
                <el-dropdown-item command="user">个人中心</el-dropdown-item>
                <el-dropdown-item divided command="loginout"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div class="container" style="text-align: center;">
      <el-row class="title">
        <div style="padding-left: 20px">My Projects</div>
        <div style="padding-left: 830px">
          <el-button type="primary" plain @click="showDialog"
            >New Project</el-button
          >
        </div>
      </el-row>
      <el-table :data="tableData"  @row-click="handleClick" :row-style="{height: '50px'}">
        <el-table-column prop="name" label="name" width="150"></el-table-column>
        <el-table-column
          prop="description"
          label="description"
        ></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page="query.pageIndex"
        :page-size="query.pageSize"
        :total="pageTotal"
        @current-change="handlePageChange"
      ></el-pagination>
    </div>
    <el-dialog title="Create a project" v-model="dialogVisible" width="600px">
      <span class="dialog-footer">
        <el-form :model="form" label-width="120px">
          <el-form-item label="Project Name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="Create Date">
            <el-col :span="11">
              <el-date-picker
                v-model="form.created_date"
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="form.description" type="textarea" />
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
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import request from "../utils/request";
import { useRouter } from "vue-router";
import imgurl from "../assets/img/img.jpg";

const router = useRouter()

// 根据user_id获取项目数据表
const user_id = localStorage.getItem("user_id")
const tableData = ref([]);
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
      pageTotal.value = res.data.length;
    })
    .catch((e) => {
      ElMessage.error("failed to get data");
    });
};

// 分页导航
const query = reactive({
  pageIndex: 1,
  pageSize: 10,
});
const pageTotal = ref(0);
const dialogVisible = ref(false);
const showDialog = () => {
  dialogVisible.value = true;
};
const unshowDialog = () => {
  dialogVisible.value = false;
}
const handlePageChange = (val: number) => {
  query.pageIndex = val;
  getData();
};

//创建新项目
const form = reactive({
  name: "",
  created_date: "",
  is_private: false,
  description: "",
});

const onSubmit = () => {
	const token = localStorage.getItem("token")
	request
    .post('/projects',JSON.stringify(form),{headers:{Authorization:`Bearer ${token}`,'content-type':'application/json'}})
    .then((res) => {
      ElMessage.success("successfully create new project");
      unshowDialog();
      getData()
    })
    .catch((e) => {
      ElMessage.error("failed to create new project");
    });
};

// 点击某一行进入该项目
const handleClick = (row: any, event: any, column: any) => {
  console.log(row);
  localStorage.setItem('project_id', row.id)
  router.push('/timeline');
}

// 用户名下拉菜单选择事件
const handleCommand = (command: string) => {
  if (command == "loginout") {
    localStorage.removeItem("user_id");
    router.push("/login");
  } else if (command == "user") {
    router.push("/myhome");
  }
};

getData()

</script>

<style scoped>
.title {
  font-size: 30px;
  line-height: 1.9;
  color: rgb(2, 21, 56);
  margin: 10px auto;
  background-color: #e6e6e6;
  width: 80%;
}

.el-pagination {
  width: 80%;
  margin: 10px auto;
}
.el-table {
  width: 80%;
  font-size: 14px;
  margin: 10px auto;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
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
