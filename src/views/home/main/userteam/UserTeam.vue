<template>
  <div v-if="isShow">
    <el-row>
      <el-col :span="10">
        <!-- 根据用户id查询用户信息 -->
        <el-input
          placeholder="请输入用户账号"
          v-model="user_id"
          class="input-with-select"
        >
          <el-button
            @click="user_idFind"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="10">
        <!-- 根据教师姓名查询教师信息 -->
        <el-input
          placeholder="请输入用户名"
          v-model="name"
          class="input-with-select"
        >
          <el-button
            @click="nameFind"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <!-- 显示全部 -->
        <el-button @click="getUser">显示全部</el-button>
      </el-col>
    </el-row>
    <!-- 用户信息表格 -->
    <el-table v-if="isShow" :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="user_id" label="用户账号" width="120">
      </el-table-column>
      <el-table-column prop="name" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="role" label="角色" width="120"> </el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.admin"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="adminFun(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="sex" label="性别" width="120"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="120"> </el-table-column>
      <el-table-column prop="phone" label="联系方式" width="120">
      </el-table-column>
      <el-table-column prop="address" label="籍贯" width="120">
      </el-table-column>
      <el-table-column prop="brithday" label="出生日期" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="btnGetUserEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="userDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  apiGetUser,
  apiUserIdFind,
  apiUserNameFind,
  apiUserAdmin,
  apiUserDelete,
} from "network/user";
export default {
  data() {
    return {
      isShow: false,
      tableData: [],
      user_id: "",
      name: "",
      value: true,
    };
  },
  methods: {
    // 修改用户详情信息
    btnGetUserEdit(row) {
      this.$router.push({
        name: "useredit",
        query: {
          user: JSON.stringify(row),
        },
      });
    },
    // 根据用户账号查询用户信息
    user_idFind() {
      apiUserIdFind(this.user_id.trim()).then(res => {
        if (res.data.code === 200) {
          console.log(res.data)
          let  array  = res.data.user
          array.forEach(item => {
              if (item.admin == "true") {
                item.admin = true;
              } else {
                item.admin = false;
              }
            });
          this.tableData = array;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 根据老师的名字查询老师的信息
    nameFind() {
      apiUserNameFind(this.name.trim()).then((res) => {
        if (res.data.code === 200) {
          let  array  = res.data.user
          array.forEach(item => {
              if (item.admin == "true") {
                item.admin = true;
              } else {
                item.admin = false;
              }
            });
          this.tableData = array;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 获取用户成员信息 全部
    getUser() {
      this.name = "";
      this.teacher_id = "";
      apiGetUser()
        .then((res) => {
          if (res.data.code === 200) {
            res.data.users.forEach((item) => {
              if (item.admin == "true") {
                item.admin = true;
              } else {
                item.admin = false;
              }
            });
            this.tableData = res.data.users;
            this.isShow = true;
          }
        })
        .catch((err) => console.log(err));
    },
    // 用户删除方法
    userDelete(index, row) {
      apiUserDelete(row.user_id).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.getUser()
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 用户状态修改方法
    adminFun(row) {
      apiUserAdmin(row).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  created() {
    // 获取用户成员
    this.getUser();
  },
};
</script>

<style scoped>
.el-col-4,
.el-col-8 {
  padding: 10px;
}
</style>
