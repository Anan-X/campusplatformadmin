<template>
  <form-table :isDisabled=isDisabled :formLabelAlign=formLabelAlign />
</template>

<script>
  import {
    apiGetStudentInfo
  } from 'network/user'

  import FormTable from './FormTable'
  export default {
    data () {
      return {
        isDisabled: true,
        formLabelAlign: {
          student_id: '',
          name: '',
          adress: ''
        }
      }
    },
    methods: {

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

<style scoped>
  

</style>
