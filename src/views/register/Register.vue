<template>
  <div id="register">
    <el-card id="register_card">
      <div slot="header" class="clearfix">
        <el-row>
          <el-col :span="12"><span>注册界面</span></el-col>
          <el-col :span="12" style="text-align:right;"><span><router-link to="login">登陆页面</router-link></span></el-col>
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
        <el-form-item label="学工号" prop="teacher_id">
          <el-input v-model="ruleForm.teacher_id"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPass">
          <el-input v-model="ruleForm.confirmPass"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone">
            <el-button
              slot="append"
              :icon="btnIcon"
              size="mini"
              @click="sendPhoneCode"
              :disabled="!btnCode"
              >{{ btnText }}</el-button
            >
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code"> </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { countDown } from "common/common";

import { isTeacher, getPhoneCode, Register, isPhone } from "network/user";
export default {
  data() {
    // 自定义校验规则
    var validateTeacherId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入教师工号"));
      } else {
        isTeacher(value).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            callback();
          } else {
            callback(new Error(res.data.msg));
          }
        });
      }
    };
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
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        this.btnCode = false;
        callback(new Error("请输入手机号"));
      } else if (value.length != 11) {
        this.btnCode = false;
        callback(new Error("手机号格式不正确!"));
      } else {
        isPhone(value).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            this.btnCode = true;
            callback();
          } else {
            this.btnCode = false;
            callback(new Error(res.data.msg));
          }
        });
      }
    };
    return {
      // 表单提交数据
      ruleForm: {
        teacher_id: "",
        password: "",
        confirmPass: "",
        phone: "",
        code: "",
      },
      // 控制发送按钮是否仅用
      btnCode: false,
      btnText: "发送验证码",
      btnIcon: "el-icon-s-promotion",
      // 表单校验规则
      rules: {
        teacher_id: [
          { required: true, validator: validateTeacherId, trigger: "blur" },
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        confirmPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            min: 4,
            max: 4,
            message: "验证吗错误",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 提交表单 注册账号
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(valid)
          Register(this.ruleForm).then((res) => {
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
    // 发送手机验证码
    sendPhoneCode() {
      getPhoneCode(this.ruleForm.phone).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          let endFun = (s) => {
            console.log(s);
            if (s != 0) {
              this.btnCode = false;
              this.btnIcon = "el-icon-loading";
              this.btnText = s + "S";
            } else {
              this.btnCode = true;
              this.btnIcon = "el-icon-s-promotion";
              this.btnText = "发送验证码";
            }
          };
          countDown(endFun, 60, 1, 1000);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style scoped>
#register {
  width: 100vw;
}
#register_card {
  /* width: 60vw; */
  width: 700px;
  margin: auto;
  margin-top: 20vh;
}
</style>