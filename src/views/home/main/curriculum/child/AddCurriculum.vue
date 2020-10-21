<template>
  <el-drawer
  :title="title"
  :before-close="handleClose"
  :visible.sync="dialog"
  direction="ltr"
  custom-class="demo-drawer"
  ref="drawer"
  >
  <div class="demo-drawer__content">
    <el-form :model="form">
      <el-form-item label="课节" :label-width="formLabelWidth">
        <el-select v-model="form.time_id" placeholder="请选择课节">
          <el-option v-for="item in freetime_id"
          :key="item" 
          :label="subjectTime(item)" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程" :label-width="formLabelWidth">
        <el-select v-model="form.subject_id" placeholder="请选择上课科目">
          <el-option 
            v-for="(item, index) in staData.subjects" 
            :key="index" 
            :label="item.subjectname" 
            :value="item.subject_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任课老师" :label-width="formLabelWidth">
        <el-select v-model="form.teacher_id" placeholder="请选择任课老师">
          <el-option 
            v-for="(item, index) in staData.teachers" 
            :key="index" 
            :label="item.name" 
            :value="item.teacher_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上课地点" :label-width="formLabelWidth">
        <el-select v-model="form.classaddress_id" placeholder="请选择上课教室">
          <el-option 
            v-for="(item, index) in staData.address" 
            :key="index" 
            :label="item.addressname" 
            :value="item.classaddress_id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="demo-drawer__footer">
      <el-button @click="cancelForm">取 消</el-button>
      <el-button type="primary" @click="onSubmit" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
    </div>
  </div>
</el-drawer>
</template>

<script>
import {
  apiGetsta,
 apiAddCourse
 } from 'network/user'
export default {
  props: {
    dialog:Boolean,
    freetime_id:Array,
    day:String,
    weekth:String
  },
  data() {
    return {
      staData:{},
      loading: false,
      form: {
        time_id: '',
        subject_id: '',
        teacher_id: '',
        classaddress_id: '',
      },
      formLabelWidth: '80px',
      timer: null,
    };
  },
  methods: {
    // 匹配课次
    subjectTime(time_id) {
        if (time_id == '1') {
          return "第一节课"
        } else if (time_id == '2') {
          return "第二节课"
        } else if (time_id == '3') {
          return "第三节课"
        } else if (time_id == '4') {
          return "第四节课"
        } else if (time_id == '5') {
          return "第五节课"
        } else if (time_id == '6') {
          return "第六节课"
        } else if (time_id == '7') {
          return "第七节课"
        } else if (time_id == '8') {
          return "第八节课"
        }
      },
    handleClose() {
      if (this.loading) {
        return;
      }
      this.$messagebox.confirm('确定要离开吗？')
        .then(()=> {
          this.$emit('closeDialog')
        })
        .catch(()=> {

        })
    },
    cancelForm() {
      this.loading = false;
      this.$emit('closeDialog')
      clearTimeout(this.timer);
    },
    // 提交
    onSubmit() {
      this.form.weekth = this.$parent.value
      this.form.day = this.$parent.value2
      this.loading = true
      if(Object.values(this.form).find(i=>{
        return i ==''||i == null 
      })!= undefined){
        this.$message('信息请填全');
      }else{
        console.log(this.form)
        apiAddCourse(this.form,this.$store.state.userInfo.user_id)
        .then(res => {
         if(res.data.code ===200) {
           this.loading = false
           this.$message(res.data.msg);
           this.$emit('closeDialog')
           this.$emit('refreshCourse')
           
         }
        })
        
      }
      
    }
  },
  computed: {
    title() {
      return '添加课程-'+'第'+this.$parent.value+'周-'+'星期'+this.$parent.value2
    }
  },
  created() {
   // 获取科目 任课老师 上课地点
    apiGetsta()
    .then(res =>{
      this.staData  = res.data
    })
  },
}
</script>

<style>

</style>