<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-select style="padding-bottom: 10px" v-model="value" :label="label" @change="getScore">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :offset="5" :span="4">
        <el-button @click="dialogVisible = true">添加课程</el-button>
      </el-col>
      <el-col :span="2">
        <el-button @click="dialogVisibleMove = true,courseNameFun()">删除课程</el-button>
      </el-col>
    </el-row>
    <!-- 添加课程板块 -->
    <el-dialog title="添加课程" :visible.sync="dialogVisible" width="30%">
      <el-input v-model="course" placeholder="请输入要添加的课程名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false,btnAddcourse()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除课程板块 -->
    <el-dialog v-if="dialogVisibleMove" title="删除课程" :visible.sync="dialogVisibleMove" width="30%">
      
      <ul class="infinite-list"  style="overflow:auto">
        <li v-for="item in coursname" :key="item" class="infinite-list-item">
          <el-button style="width:100%" @click="btnMovecourse(item)">{{item}}</el-button>
        </li>
      </ul>

      <span slot="footer" class="dialog-footer">

      </span>
    </el-dialog>
    <el-table v-if="isShow" :data="tableData" border style="width: 100%">
      <el-table-column :prop="item" :label="rename(item)" v-for="item in Object.keys(tableData[0])" :key="item" />

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="btnScoreEdit(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    apiGetSemester,
    apiGetScore,
    apiAddcourse,
    apiMoveCourse
  } from 'network/user'
  export default {
    data() {
      return {
        coursname:[],
        dialogVisible: false,
        dialogVisibleMove: false,
        tableData: [],
        isShow: false,
        course: '',
        options: [],
        value: '1',
        label: '2019-2020-第一学期'
      }
    },
    methods: {
      rename(item) {
        if (item === 'student_id') {
          return item = "学号"
        } else if (item === 'name') {
          return item = "姓名"
        } else if (item === 'classroom') {
          return item = "班级"
        } else if (item === 'semester') {
          return item = "学期"
        } else {
          return item
        }
      },
      // 获取班级学生成绩
      getScore() {
        apiGetScore(this.value,this.$store.state.userInfo.user_id)
          .then(res => {
            // console.log(res)
            this.tableData = res.data.score
            this.isShow = true
          })
      },
      // 分数编辑
      btnScoreEdit(row) {
        this.$router.push({
          name: 'scoreedit',
          query: {
            student_id: row['学号'],
            semester_id: this.value
          }
        })
      },
      // 添加课程
      btnAddcourse() {
        apiAddcourse(this.course, this.tableData[0].semester)
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              // 重新获取班级学生成绩
              this.getScore(this.value)
            } else {
              this.$message.error(res.data.msg)
            }
          })
      },
      // 删除课程
      btnMovecourse(item) {
        apiMoveCourse(item, this.value)
        .then(res => {
          this.dialogVisibleMove = false
          if (res.data.code === 200) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              // 重新获取班级学生成绩
              this.getScore(this.value)
            } else {
              this.$message.error(res.data.msg)
            }
        })
      },
      // 课程名称
      courseNameFun() {
        this.coursname = Object.keys(this.tableData[0]).filter(i =>{
          return (i != 'student_id'&&i !='name'&&i !='classroom'&&i !='semester')
        })
      }
    },
    created() {
      // 获取学期
      apiGetSemester()
      .then(res  => {
        this.options = res.data.data
      })
      // 获取班级学生成绩
      this.getScore(this.value, this.$store.state.userInfo.user_id)
    },
  }

</script>

<style>
</style>
