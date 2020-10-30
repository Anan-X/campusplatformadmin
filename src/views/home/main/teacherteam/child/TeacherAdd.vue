<template>
  <div v-if="show">
  <el-form label-position="right" label-width="80px" :model="formLabelAlign">
      <el-form-item label="姓名">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
         <el-radio v-model="formLabelAlign.sex" label="男">男</el-radio>
        <el-radio v-model="formLabelAlign.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="formLabelAlign.age"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formLabelAlign.phone"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-select v-model="formLabelAlign.classroom_id" placeholder="请选择班级">
          <el-option
            v-for="(item, index) in classrooms"
            :key="index"
            :label="item.classroomname"
            :value="item.classroom_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="户籍">
        <el-input v-model="formLabelAlign.address"></el-input>
      </el-form-item>
      <el-form-item v-show="!isDisabled">
        <el-button type="button" @click="dialogVisible = true">提交</el-button>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
          <span>确定要提交吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit(formLabelAlign), dialogVisible = false" >确 定</el-button>
          </span>
        </el-dialog>
      </el-form-item>
    </el-form>
  </div>
  
  
</template>

<script>
  import {
    apiTeacherAdd,
    apiGetsta
  } from 'network/user'

export default {
  data () {
      return {
        show: false,
        dialogVisible: false,
        isDisabled: false,
        formLabelAlign: {
          name: '',
          age: '',
          sex: '',
          classroom_id: '',
          address: ''
        },
        classrooms:[]
      }
    },
    methods: {
      onSubmit(formLabelAlign) {
        // console.log(formLabelAlign)
        apiTeacherAdd(formLabelAlign)
        .then(res => {
          if(res.data.code === 200){
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.$router.go(-1)
        } else {
          this.$message.error(res.data.msg)
        }
        })
      }
    },
    components: {
    },
    created() {
      this.show = true
      // console.log(this.formLabelAlign)
      apiGetsta()
      .then(res => {
        this.classrooms = res.data.classrooms
      })
    }
}
</script>

<style>

</style>