<template>
  <div>
    <el-table v-if="isShow" :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="name" label="姓名" >
      </el-table-column>
      <el-table-column prop="student_id" label="学号" >
      </el-table-column>
      <el-table-column prop="classroomname" label="班级" >
      </el-table-column>
      <el-table-column prop="sex" label="性别" >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="btnGetStudentInfo(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="btnGetStudentInfoEdit(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    apiGetClassTeam
  } from 'network/user'
  export default {
    data() {
      return {
        isShow: false,
        tableData: []
      }
    },
    methods: {
      // 查看学生详情信息
      btnGetStudentInfo(row) {
        this.$router.push({
              name: 'studentinfo',
              query:{
                student_id:row.student_id
              }
        })
      },
      // 修改学生详情信息
      btnGetStudentInfoEdit(row) {
        this.$router.push({
              name: 'studentinfoedit',
              query:{
                student_id:row.student_id
              }
        })
      }
    },
    created() {
      // 获取班级成员
      apiGetClassTeam()
        .then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.info
            this.isShow = true
            // console.log(this.tableData)
          }
        })
        .catch(err => console.log(err))
    }
  }

</script>

<style>

</style>
