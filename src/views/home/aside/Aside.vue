<template>
  <el-aside class="aside">
          <el-menu default-active="2" class="el-menu-vertical-demo" 
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">

            <el-menu-item index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>首页</span>
              </template>
            </el-menu-item>
            <el-submenu v-for="(items, key, indexs) in info" :key="key" :index="indexs.toString()">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{key}}</span>
              </template>
              <router-link v-for="(item, index) in items" :key="index" :to="Object.values(item).toString()">
  
                <el-menu-item  :index="indexs + '-' + index">{{Object.keys(item)+''}}</el-menu-item>
              </router-link>
              
            </el-submenu>
          </el-menu>
        </el-aside>
</template>

<script>
export default {
  data () {
    return{
      info: {
        "班级": [{"班级成员":"/home/classteam"},{"成绩":"/home/score"},{"课表":"/home/curriculum"}]
      }
    }
  },
  methods: {
  }
}

</script>

<style scoped>
.aside {
   height: 100vh;
   background-color: rgb(84, 92, 100);
   
 }
</style>