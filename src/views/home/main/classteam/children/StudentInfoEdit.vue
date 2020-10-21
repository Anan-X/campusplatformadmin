<template>
  <form-table 
  :isDisabled=isDisabled 
  :formLabelAlign=formLabelAlign 
  @onSubmit="onSubmit" />
</template>

<script>
  import {
    apiGetStudentInfo,
    apiStudentInfoEdit
  } from 'network/user'

  import FormTable from './FormTable'
export default {
  data () {
      return {
        isDisabled: false,
        formLabelAlign: {
          student_id: '',
          name: '',
          adress: ''
        }
      }
    },
    methods: {
      onSubmit(formData) {
        // console.log(formData)
        apiStudentInfoEdit(formData)
        .then(res => {
          if(res.data.code === 200){
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        } else {
          this.$message.error(res.data.msg)
        }
        })
      }
    },
    components: {
      FormTable
    },
    created() {
      apiGetStudentInfo(this.$route.query.student_id)
        .then(res => {
          this.formLabelAlign = res.data.studentInfo[0]
        })
    }
}
</script>

<style>

</style>