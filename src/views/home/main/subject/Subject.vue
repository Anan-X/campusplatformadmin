<template>
  <div>
    <el-row>
      <el-col :span="4">
        <!-- 添加课程-->
        <el-button @click="drawer = true">添加科目</el-button>
      </el-col>
      <el-col :span="6">
        <!-- 根据学生学号查询信息 -->
        <el-input
          placeholder="请输入科目名称"
          v-model="subjectname"
          class="input-with-select"
        >
          <el-button
            @click="subject_name"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <!-- 根据任课老师姓名查询科目信息 -->
        <el-input
          placeholder="请输入任课老师姓名"
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
        <el-button @click="getsubject(),name='',subjectname=''">显示全部</el-button>
      </el-col>
    </el-row>
    <!-- 课程信息表格 -->
    <el-table
      v-if="isShow"
      :data="tableData"
      height="600"
      border
      style="width: 100%"
    >
      <el-table-column fixed prop="subject_id" label="课程编号">
      </el-table-column>
      <el-table-column prop="subjectname" label="科目名称"> </el-table-column>
      <el-table-column prop="name" label="任课老师"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="btnEditSubject(scope.row)"
            type="text"
            size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加科目 -->
    <el-drawer
      title="添加科目"
      :visible.sync="drawer"
      direction="ltr"
    >
      <span>我来啦!</span>
      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="课程名称" prop="subjectname">
          <el-input v-model="form.subjectname"></el-input>
        </el-form-item>
        <el-form-item label="任课老师" required>
          <el-select v-model="form.teacher_id" placeholder="请选择任课老师">
            <el-option
              v-for="(item, index) in teachers"
              :key="index"
              :label="item.name"
              :value="item.teacher_id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!-- 科目修改  -->
    <el-drawer
      title="添加科目"
      :visible.sync="drawerEdit"
      direction="rtl"
    >
      <span>我来啦!</span>
      <el-form :rules="rules" ref="formEdit" :model="formEdit" label-width="80px">
        <el-form-item label="课程名称" prop="subjectname">
          <el-input v-model="formEdit.subjectname"></el-input>
        </el-form-item>
        <el-form-item label="任课老师" required>
          <el-select v-model="formEdit.teacher_id" placeholder="请选择任课老师">
            <el-option
              v-for="(item, index) in teachers"
              :key="index"
              :label="item.name"
              :value="item.teacher_id+''"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitEdit('formEdit')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import {
  apiGetSubject,
  apiAddSubject,
  apiEditSubject,
  apiSubjectTeacher,
  apiGetsta,
  apiSubjectName
} from "network/user";
export default {
  data() {
    return {
      isShow: false,
      tableData: [],
      subjectname: "",
      name: "",
      drawer: false,
      drawerEdit: false,
      form: {
        subjectname: "",
        teacher_id: "",
      },
      formEdit:{},
      teachers: [],
      rules: {
        subjectname: [
          { required: true, message: "请输入科目名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 修改科目详情信息
    btnEditSubject(row) {
      this.formEdit = row
      this.drawerEdit = true
      // console.log(this.formEdit)
    },
    // 根据科目的名称查找
    subject_name() {
      apiSubjectName(this.subjectname.trim()).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.subjects;
          this.isShow = true;
        }else {
          this.$message.error(res.data.msg)
        }
      });
    },
    // 根据任课老师的姓名查找科目
    nameFind() {
      apiSubjectTeacher(this.name.trim()).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.subjects;
          this.isShow = true;
        }else {
          this.$message.error(res.data.msg)
        }
      });
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.teacher_id == "") {
            this.$message.error("请选择任课老师");
          } else {
            // 提交请求
            apiAddSubject(this.form).then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  message: res.data.msg,
                  type: "success",
                });
                this.drawer = false;
                this.getsubject();
              } else {
                this.$message.error(res.data.msg);
                this.drawer = false;
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onSubmitEdit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
            // 提交请求
            apiEditSubject(this.formEdit).then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  message: res.data.msg,
                  type: "success",
                });
                this.drawerEdit = false;
                this.getsubject();
              } else {
                this.$message.error(res.data.msg);
                this.drawerEdit = false;
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getsubject() {
      apiGetSubject().then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.tableData = res.data.subjects;
          this.isShow = true;
          // this.$message({
          //   message: res.data.msg,
          //   type: "success",
          // });
        } else {
          this.$message.error(res.data.msg);
        }
      });
      apiGetsta().then((res) => {
        this.teachers = res.data.teachers;
        console.log(this.teachers);
      });
    },
  },
  created() {
    this.getsubject();
  },
};
</script>

<style>
</style>