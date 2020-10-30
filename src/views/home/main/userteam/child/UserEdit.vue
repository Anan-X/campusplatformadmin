<template>
  <div v-if="show">
  <el-form label-position="right" label-width="80px" :model="formLabelAlign" :disabled="isDisabled">
      <el-form-item label="用户id" >
        <el-input disabled v-model="formLabelAlign.user_id"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="formLabelAlign.sex"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="formLabelAlign.age"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formLabelAlign.phone"></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-input v-model="formLabelAlign.birthday"></el-input>
      </el-form-item>
      <el-form-item label="户籍">
        <el-input v-model="formLabelAlign.address"></el-input>
      </el-form-item>
      <el-form-item v-show="!isDisabled">
        <el-button type="button" @click="dialogVisible = true">保存修改</el-button>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
          <span>确定要修改吗</span>
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
    apiUserEdit
  } from 'network/user'

export default {
  data () {
      return {
        show: false,
        dialogVisible: false,
        isDisabled: false,
        formLabelAlign: {
        },
        classrooms:[],
        // schools: []
      }
    },
    methods: {
      onSubmit(formLabelAlign) {
        // console.log(formLabelAlign)
        apiUserEdit(formLabelAlign)
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
      this.formLabelAlign = JSON.parse(this.$route.query.user)
      console.log(this.formLabelAlign)
      this.show = true
      // console.log(this.formLabelAlign)
    }
}
</script>

<style>

</style>