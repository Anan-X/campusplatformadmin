<template>
  <div>
    <el-row>
      <el-col :span="4">
        <!-- 添加学生 -->
        <el-button @click="addStudent">添加学生</el-button>
      </el-col>
      <el-col :span="6">
        <!-- 根据学生学号查询信息 -->
        <el-input
          placeholder="请输入学生学号"
          v-model="student_id"
          class="input-with-select"
        >
          <el-button
            @click="student_idFind"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <!-- 根据学生姓名查询教师信息 -->
        <el-input
          placeholder="请输入学生姓名"
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
        <!-- 根据班级查询 -->
        <el-select
          v-model="classroom_id"
          @change="classStudentFun"
          placeholder="请选择班级"
        >
          <el-option
            v-for="(item, index) in classrooms"
            :key="index"
            :label="item.classroomname"
            :value="item.classroom_id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <!-- 显示全部 -->
        <el-button @click="getStudent">显示全部</el-button>
      </el-col>
    </el-row>
    <!-- 教师信息表格 -->
    <el-table v-if="isShow" :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="student_id" label="学号" width="120">
      </el-table-column>
      <el-table-column  prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="classroomname" label="班级" width="120">
      </el-table-column>
      <el-table-column prop="schoolname" label="学院" width="150">
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
            @click="studentDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  apiGetStudent,
  apiStudentIdFind,
  apiStudentNameFind,
  apiGetsta,
  apiStudentClassroomFind,
  apiStudentDelete,
} from "network/user";
export default {
  data() {
    return {
      isShow: false,
      tableData: [],
      student_id: "",
      name: "",
      classrooms: [],
      classroom_id: "全部班级",
    };
  },
  methods: {
    // 修改学生详情信息
    btnGetStudentInfoEdit(row) {
      this.$router.push({
        name: "studentedit",
        query: {
          teacher: JSON.stringify(row),
        },
      });
    },
    // 添加学生
    addStudent() {
      this.$router.push({
        path: "studentadd",
      });
    },
    // 根据学生id查询信息
    student_idFind() {
      apiStudentIdFind(this.student_id.trim()).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.students;
          this.isShow = true;
        }
      });
    },
    // 根据学生的名字查询学生的信息
    nameFind() {
      apiStudentNameFind(this.name.trim()).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.students;
          this.isShow = true;
        }
      });
    },
    // 获取学生成员全部
    getStudent() {
      this.name = "";
      this.student_id = "";
      this.classroom_id = "全部班级";
      apiGetStudent()
        .then((res) => {
          if (res.data.code === 200) {
            this.tableData = res.data.students;
            this.isShow = true;
            // console.log(this.tableData)
          }
        })
        .catch((err) => console.log(err));
    },
    // 根据班级查找
    classStudentFun() {
      apiStudentClassroomFind(this.classroom_id).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.students;
          this.isShow = true;
        }
      });
    },
    // 删除学生
    studentDelete(index, row) {
      console.log(row);
      this.$messagebox
        .confirm("确定要删除吗？")
        .then(() => {
          apiStudentDelete(row.student_id).then((res) => {
            if (res.data.code === 200) {
              this.$message(res.data.msg);
              this.getStudent();
            } else {
              this.$message(res.data.msg);
            }
          });
        })
        .catch(() => {});
    },
  },
  created() {
    // 获取学生成员
    this.getStudent();

    apiGetsta().then((res) => {
      this.classrooms = res.data.classrooms;
    });
  },
};
</script>

<style scoped>
.el-col-4,
.el-col-6 {
  padding: 10px;
}
</style>
