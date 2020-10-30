<template>
  <div>
    <el-row>
      <el-col :span="4">
        <!-- 添加教师 -->
        <el-button @click="addTeacher">添加教师</el-button>
      </el-col>
      <el-col :span="8">
        <!-- 根据教师工号查询教师信息 -->
        <el-input
          placeholder="请输入教师工号"
          v-model="teacher_id"
          class="input-with-select"
        >
          <el-button
            @click="teacher_idFind"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="8">
        <!-- 根据教师姓名查询教师信息 -->
        <el-input
          placeholder="请输入教师姓名"
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
        <el-button @click="getTeacher">显示全部</el-button>
      </el-col>
    </el-row>
    <!-- 教师信息表格 -->
    <el-table v-if="isShow" :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="teacher_id" label="教师工号" width="120">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="classroomname" label="班级" width="120">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="120"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="120"> </el-table-column>
      <el-table-column prop="phone" label="联系方式" width="120">
      </el-table-column>
      <el-table-column prop="address" label="籍贯" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click="btnGetStudentInfoEdit(scope.row)"
            type="text"
            size="small"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="teacherDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  apiGetTeacher,
  apiTeacherIdFind,
  apiTeacherNameFind,
  apiTeacherDelete
} from "network/user";
export default {
  data() {
    return {
      isShow: false,
      tableData: [],
      teacher_id: "",
      name: "",
    };
  },
  methods: {
    // 修改教师详情信息
    btnGetStudentInfoEdit(row) {
      this.$router.push({
        name: "teacheredit",
        query: {
          teacher: JSON.stringify(row),
        },
      });
    },
    // 添加教师
    addTeacher() {
      this.$router.push({
        path: "teacheradd",
      });
    },
    // 根据老师的工号查询老师信息
    teacher_idFind() {
      apiTeacherIdFind(this.teacher_id.trim()).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.teachers;
          this.isShow = true;
        }
      });
    },
    // 根据老师的名字查询老师的信息
    nameFind() {
      apiTeacherNameFind(this.name.trim()).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.teachers;
          this.isShow = true;
        }
      });
    },
    // 获取教师成员全部
    getTeacher() {
      this.name = "";
      this.teacher_id = "";
      apiGetTeacher()
        .then((res) => {
          if (res.data.code === 200) {
            this.tableData = res.data.teachers;
            this.isShow = true;
            // console.log(this.tableData)
          }
        })
        .catch((err) => console.log(err));
    },
    // 删除教师档案
    teacherDelete(index, row) {
      apiTeacherDelete(row.teacher_id).then(res => {
        if(res.data.code === 200){
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.getTeacher()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  created() {
    // 获取教师成员
    this.getTeacher();
  },
};
</script>

<style scoped>
.el-col-4,
.el-col-8 {
  padding: 10px;
}
</style>
