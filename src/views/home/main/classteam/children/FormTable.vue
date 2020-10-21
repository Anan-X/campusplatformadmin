<template>
  <div>
    <el-form label-position="right" label-width="80px" :model="formLabelAlign" :disabled="isDisabled">
      <el-form-item label="学号" >
        <el-input disabled v-model="formLabelAlign.student_id"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="formLabelAlign.sex"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formLabelAlign.phone"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="formLabelAlign.classroom"></el-input>
      </el-form-item>
      <el-form-item label="年级">
        <el-input v-model="formLabelAlign.star_year"></el-input>
      </el-form-item>
      <el-form-item label="所在学院">
        <el-input v-model="formLabelAlign.college"></el-input>
      </el-form-item>
      <el-form-item label="所在学校">
        <el-input v-model="formLabelAlign.school"></el-input>
      </el-form-item>
      <el-form-item label="户籍">
        <el-input v-model="formLabelAlign.adress"></el-input>
      </el-form-item>
      <el-form-item label="身份证">
        <el-input v-model="formLabelAlign.card_id"></el-input>
      </el-form-item>
      <el-form-item v-show="!isDisabled">
        <!-- <el-popconfirm title="这是一段内容确定删除吗？">
          
          <el-button slot="reference" type="primary" @click="onSubmit(formLabelAlign)">提交</el-button>
        </el-popconfirm> -->
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
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    props: {
      isDisabled: Boolean,
      formLabelAlign: Object
    },
    methods: {
      onSubmit(formLabelAlign) {
        this.$emit('onSubmit', formLabelAlign)
      },
    }
  }

</script>

<style>

</style>
