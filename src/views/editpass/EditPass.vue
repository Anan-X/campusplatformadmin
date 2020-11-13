<template>
  <div id="edit_pass">
    <el-card id="edit_pass_card">
      <div slot="header" class="clearfix">
        <el-row>
          <el-col :span="12"><span>修改密码页面</span></el-col>
          <el-col :span="12" style="text-align:right;"><span><router-link to="/">首页</router-link></span></el-col>
        </el-row>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="学工号">
          <el-input v-model="ruleForm.teacher_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="原密码" prop="oldPassword">
          <el-input type="password" v-model="ruleForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input  type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item  label="确认新密码" prop="confirmPass">
          <el-input type="password" v-model="ruleForm.confirmPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即修改</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

import { Password} from "network/user";
export default {
  data() {
    // 自定义校验规则
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入的新密码不一致!"));
      } else {
        callback();
      }
    };
    
    return {
      // 表单提交数据
      ruleForm: {
        teacher_id: "",
        password: "",
        confirmPass: "",
        oldPassword: ''
      },
      // 控制发送按钮是否仅用
      btnCode: false,
      btnText: "发送验证码",
      btnIcon: "el-icon-s-promotion",
      // 表单校验规则
      rules: {
        oldPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        confirmPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ]
      },
    };
  },
  methods: {
    // 提交表单 注册账号
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(valid)
          Password(this.ruleForm).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: res.data.msg,
                type: "success",
              });
              this.$router.go(-1);
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.ruleForm.teacher_id = this.$store.state.userInfo.user_id
  }
};
</script>

<style scoped>
#edit_pass {
  width: 100vw;
}
#edit_pass_card {
  /* width: 60vw; */
  width: 700px;
  margin: auto;
  margin-top: 10vh;
}
</style>