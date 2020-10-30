<template>
  <el-aside class="aside">
    <!-- 教师页面导航 -->
    <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      v-if="this.$store.role=='teacher'"
    >
      <router-link
        v-for="(item, index) in teacherNav"
        :key="index"
        :to="Object.values(item).toString()"
      >
        <el-menu-item :index="'' + index">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ Object.keys(item) + "" }}</span>
          </template>
        </el-menu-item>
      </router-link>
    </el-menu>
    <!-- 管理员页面导航 -->
    <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      v-else
    >
      <router-link
        v-for="(item, index) in adminNav"
        :key="index"
        :to="Object.values(item).toString()"
      >
        <el-menu-item :index="'' + index">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ Object.keys(item) + "" }}</span>
          </template>
        </el-menu-item>
      </router-link>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      // info: {
      //   "班级": [{"班级成员":"/home/classteam"},{"成绩":"/home/score"},{"课表":"/home/curriculum"}],
      //   "管理员操作": [{"班级成员":"/home/classteam"},{"成绩":"/home/score"},{"课表":"/home/curriculum"}]
      // },
      teacherNav: [
        { 班级成员管理: "/home/classteam" },
        { 班级成绩管理: "/home/score" },
        { 班级课表管理: "/home/curriculum" },
      ],
      adminNav: [
        { 教师成员管理: "/home/teacherteam" },
        { 学生成员管理: "/home/studentteam" },
        { 系统用户管理: "/home/userteam" },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>
.aside {
  height: 100vh;
  background-color: rgb(84, 92, 100);
}
</style>