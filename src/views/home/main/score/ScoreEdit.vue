<template>
  <div>
   <el-form v-if="isShow" label-position="right" label-width="80px">
     <el-form-item  label="学号">
        <el-input v-model="this.$route.query.student_id" disabled></el-input>
      </el-form-item>
     <el-form-item  label="班级">
        <el-input v-model="score[0]['班级']" disabled></el-input>
      </el-form-item>
     <el-form-item  label="学期">
        <el-input v-model="score[0]['学期']" disabled></el-input>
      </el-form-item>
     <div v-for="(item, index) in score" :key="index">
      <el-form-item :label="item.subjectname" >
        <el-input v-model="score[index].score"></el-input>
      </el-form-item>
     </div>
      
      <el-form-item >
        <el-button type="button" @click="dialogVisible = true">保存修改</el-button>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
          <span>确定要修改吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit(score), dialogVisible = false" >确 定</el-button>
          </span>
        </el-dialog>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import{apiGetScoreStudent, apiScoreStudentEdit} from 'network/user'
export default {
  data () {
    return {
      score:null,
      dialogVisible: false,
      isShow: false,
    }
  },
  methods: {
    onSubmit(data){
      // console.log('修改',data,this.$route.student_id)
      apiScoreStudentEdit(data, this.$route.query.student_id)
      .then(res =>{
        if(res.data.code===200){
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
  },
  created () {
    let {student_id, semester_id} = this.$route.query
    apiGetScoreStudent(student_id, semester_id)
    .then(res => {
      // console.log('成绩',res)
      this.score = res.data.score,
      this.isShow = true
    })
  }
}
</script>

<style>

</style>