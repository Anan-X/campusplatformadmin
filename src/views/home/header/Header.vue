<template>
  <el-header class="header">
  <el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  
    <el-submenu index="1" class="mine">
      <template slot="title">
        <i class="el-icon-user-solid"></i>
        我的
      </template>
      <el-menu-item @click="exitBtn" index="2-1">注销</el-menu-item>
    </el-submenu>
  
  
  
</el-menu>

  </el-header>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      exitBtn () {
      this.$store.commit('exit')
      this.$router.go(0)
    }
    }
  }

</script>

<style scoped>
  .header {
    background-color: rgb(67, 73, 81);
  }
  .mine {
    float:right;
    margin-right: 20px;
  }
</style>
