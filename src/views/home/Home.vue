<template>
  <div>
    <el-container class="container">
      <el-header>
        <Header/>
      </el-header>
      
      <el-container>
        <Aside />
        <Main/>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Header from './header/Header'
  import Aside from './aside/Aside'
  import Main from './main/Main'
  export default {
    components: {
      Header,
      Aside,
      Main
    },
    created() {
      // console.log("home")
    }
  }

</script>

<style scoped>
.el-header {
  padding: 0;
}
.container {
  height: 100vh;
}
 


</style>
