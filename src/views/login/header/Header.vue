<template>
  <el-header class="header">
      <el-row>
        <el-col :span="4" :offset="18">
          <el-link type="info" class="text" href="http://127.0.0.1:8080/home">关于</el-link>
        </el-col>
      </el-row>
    </el-header>
</template>

<script>
export default {

}
</script>

<style>
.header {
    background-color: rgb(84, 92, 100);
    text-align: center;
  }
  .text {
    /* color:rgb(249, 249, 250); */
    font-size: 20px;
    padding-top: 20px;
  }
</style>