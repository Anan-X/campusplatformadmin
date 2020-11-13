<template>
  <el-container id="login_div">
    <el-header>
      <Header/>
    </el-header>
    <el-container>
      <el-aside>
        <Aside 
        @passLogin="passLogin"
        @phoneLogin="phoneLogin" />
      </el-aside>
      <el-main>
        <Main/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from './header/Header'
import Aside from './aside/Aside'
import Main from './main/Main'

import {apiPassLogin, apiPhoneLogin} from 'network/user'
export default {
  methods: {
    passLogin (data) {
      apiPassLogin(data).then(res => {
        if(res.data.code === 200){
          // 把用户信息存储在store中
          this.$store.commit('loginAfter', res)
          this.$message({
            message: '登陆成功',
            type: 'success'
          })
          this.$router.push({
            path: '/home'
          })
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(error => console.log(error))
    },
    phoneLogin (data) {
     apiPhoneLogin(data).then(res => {
        if(res.data.code === 200){
          // 把用户信息存储在store中
          this.$store.commit('loginAfter', res)
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.$router.push({
            path: '/home'
          })
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(error => console.log(error))
    }
  },
  components: {
    Aside,
    Main,
    Header
  }
}
</script>

<style>
  .el-header{
    padding: 0;
  }
  .el-aside{
    padding: 0;
  }
  #login_div {
    height: 100vh;
  }
</style>