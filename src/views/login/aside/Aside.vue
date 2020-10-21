<template>
  <div class="aside">
    <el-card>
      <div slot="header">
        <h3>登陆</h3>
      </div>
      <div>
        <!-- 登录方式 -->
        <div class="loginFun">
          <span @click="isPassLogin" :class="isFun ? 'span-left active' : 'span-left'">密码登录</span>
          <span class="link"></span>
          <span @click="isPhoneLogin" :class="!isFun ? 'span-right active' : 'span-left'">手机登录</span>
        </div>
        <!-- 学号登陆 -->
        <el-form v-if="isFun" :model="passRuleForm" status-icon :rules="rules" ref="passRuleForm" label-position="top" label-width="80px" >
          <el-form-item label="学号/工号" prop="studentID">
            <el-input v-model.number="passRuleForm.studentID"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="passRuleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%;" type="primary" @click="passSubmitForm('passRuleForm')">登陆</el-button>
          </el-form-item>
          

        </el-form>
        <!-- 手机号登陆 -->
        <el-form v-else :model="phoneRuleForm" status-icon :rules="rules" ref="phoneRuleForm" label-position="top" label-width="80px">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.number="phoneRuleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-row>
              <el-col :span="14">
              <el-input  v-model="phoneRuleForm.code" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button 
              style="width:112px;"
              @click="btnSendCode"
              :disabled="!isSendCode" >{{btnText}}</el-button>
            </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%;" type="primary" @click="phoneSubmitForm('phoneRuleForm')">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {countDown} from 'common/common'

  import {getPhoneCode} from 'network/user'
  export default {
    data() {
      var checkStudentID = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('学号/工号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            callback()
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
       var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入正确格式'));
          } else {
            callback()
          }
        }, 1000);
      };
      var validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('验证码'));
        } else {
          callback();
        }
      };
      return {
        isFun: true,
        isSendCode: true,
        btnText: "发送验证码",
        passRuleForm: {
          studentID: '',
          password: '',
        },
        phoneRuleForm: {
          phone: '',
          code: ''
        },
        rules: {
          studentID: [
            { validator: checkStudentID, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      // 判断登陆的方式
      isPassLogin () {
        this.isFun = true
      },
      isPhoneLogin () {
        this.isFun = false
      },
      // 密码登陆
      passSubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 发射登陆事件
            // console.log('passSubmitForm')
            this.$emit('passLogin', this.passRuleForm)
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      // 手机登陆
      phoneSubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 发送登陆事件
            // console.log('phoneSubmitForm')
            this.$emit('phoneLogin', this.phoneRuleForm)
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      // 发送手机验证码
      btnSendCode () {
        getPhoneCode(this.phoneRuleForm.phone).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '短信发送成功',
              type: 'success'
            });
            const foo = (currenTtime) => {
              if(currenTtime === 0){
                  this.btnText = '发送验证码'
                  this.isSendCode = true
                } else {
                  this.btnText = currenTtime
                  this.isSendCode = false
                }
              }
            countDown(foo, 60, 1, 1000)
          } else {
           this.$message.error('发送失败，请稍后再试');
          }
        })
        

      }
    }
  }

</script>

<style scoped>
  .aside {

    height: 60vh;
    position: relative;
    top: 20px;
    padding-left: 10px;
  }

   .loginFun{
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .link {
   width: 100px;
  height: 20%;
  border-right: solid #ACC0D8 1px;
  padding: 0 5px;
  margin-right: 10px;
  /* padding-right: 10px; */
  }
  span{
    padding:5px 0;
  }
  .span-left {
    padding: 5px 10px;
  }
  .span-right {
    padding: 5px 10px;
  }
  .active {
    border-bottom: 2px solid blue;
  }

</style>
