<template>
  <div>
    <!-- 选择周数 -->
    <el-select v-model="value" placeholder="请选择" @change="getCourse">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <!-- 选择天数 -->
    <el-select v-model="value2" placeholder="请选择" @change="getCourse">
      <el-option
        v-for="item in optionsDay"
        :key="item.value2"
        :label="item.label"
        :value="item.value2"
      >
      </el-option>
    </el-select>
    <!-- 添加课程 -->
    <el-button id="addbtn" @click="addCourse">添加课程</el-button>
    <add-curriculum
      :dialog="dialog"
      :freetime_id="freetime_id"
      :day="value2"
      :weekth="value"
      @closeDialog="closeDialog"
      @refreshCourse="getCourse"
    />
    <!-- 展示 课表 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="time_id" label="课次" width="100">
      </el-table-column>
      <el-table-column prop="classroomname" label="班级" width="100">
      </el-table-column>
      <el-table-column prop="subjectname" label="课程" width="100">
      </el-table-column>
      <el-table-column prop="name" label="任课老师" width="100">
      </el-table-column>
      <el-table-column prop="addressname" label="上课地点" width="100">
      </el-table-column>
      <el-table-column prop="time" label="上课时间" width="100">
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑课表页面 -->
    <edit-curriculum
      :dialog="dialogEdit"
      @closeDialog="closeDialogEdit"
      @refreshCourse="getCourse"
      v-if="dialogEdit"
      :formEdit="formEdit"
      :freetime_id="freetime_id"
    />
  </div>
</template>

<script>
import { apiGetCourse, apiDeleteCourse } from "network/user";
import AddCurriculum from "./child/AddCurriculum";
import EditCurriculum from "./child/EditCurriculum";
export default {
  data() {
    return {
      // 课表 数据
      tableData: null,
      // 周
      options: [
        {
          value: "1",
          label: "第一周",
        },
        {
          value: "2",
          label: "第二周",
        },
        {
          value: "3",
          label: "第三周",
        },
        {
          value: "4",
          label: "第四周",
        },
        {
          value: "5",
          label: "第五周",
        },
        {
          value: "6",
          label: "第六周",
        },
        {
          value: "7",
          label: "第七周",
        },
        {
          value: "8",
          label: "第八周",
        },
        {
          value: "9",
          label: "第九周",
        },
        {
          value: "10",
          label: "第十周",
        },
        {
          value: "11",
          label: "第十一周",
        },
        {
          value: "12",
          label: "第十二周",
        },
        {
          value: "13",
          label: "第十三周",
        },
        {
          value: "14",
          label: "第十四周",
        },
        {
          value: "15",
          label: "第十五周",
        },
        {
          value: "16",
          label: "第十六周",
        },
        {
          value: "17",
          label: "第十七周",
        },
        {
          value: "18",
          label: "第十八周",
        },
        {
          value: "19",
          label: "第十九周",
        },
        {
          value: "20",
          label: "第二十周",
        },
      ],
      optionsDay: [
        {
          value2: "1",
          label: "星期一",
        },
        {
          value2: "2",
          label: "星期二",
        },
        {
          value2: "3",
          label: "星期三",
        },
        {
          value2: "4",
          label: "星期四",
        },
        {
          value2: "5",
          label: "星期五",
        },
      ],
      value: "1",
      value2: "1",
      day: [], // 记录今天的课次
      freetime_id: [], //记录今天没有课的课次
      number: ["1", "2", "3", "4", "5", "6", "7", "8"],
      dialog: false, // 控制添加课程页面显示
      dialogEdit: false, // 控制编辑课程页面显示
      formEdit: {}, // 编辑课程的数据
    };
  },
  components: {
    AddCurriculum,
    EditCurriculum,
  },
  methods: {
    // 获取课程表
    getCourse() {
      // console.log(this.value2);
      apiGetCourse(
        this.$store.state.userInfo.user_id,
        this.value,
        this.value2
      ).then((res) => {
        // console.log(res);
        this.tableData = res.data.data;
      });
    },
    // 判读是第几节有课
    subjectTime(time_id) {
      if (time_id == "1") {
        return "第一节课";
      } else if (time_id == "2") {
        return "第二节课";
      } else if (time_id == "3") {
        return "第三节课";
      } else if (time_id == "4") {
        return "第四节课";
      } else if (time_id == "5") {
        return "第五节课";
      } else if (time_id == "6") {
        return "第六节课";
      } else if (time_id == "7") {
        return "第七节课";
      } else if (time_id == "8") {
        return "第八节课";
      }
    },
    // 修改按钮事件
    handleEdit(index, row) {
      // 筛选没课的课次
      this.day = [];
      this.tableData.forEach((item) => {
        this.day.push(item.time_id);
      });
      this.freetime_id = this.getArrDifference(this.day, this.number);
      this.freetime_id.push(row.time_id);
      this.dialogEdit = true;
      console.log(index, row);
      this.formEdit = row;
    },
    // 删除按钮事件
    handleDelete(index, row) {
      this.$messagebox
        .confirm("确定要删除吗？")
        .then(() => {
          apiDeleteCourse(row.course_id).then((res) => {
            if (res.data.code === 200) {
              this.$message(res.data.msg);
              this.getCourse();
            } else {
              this.$message(res.data.msg);
            }
          });
        })
        .catch(() => {});
    },
    // 筛选没课的课次
    getArrDifference(arr1, arr2) {
      return arr1.concat(arr2).filter(function (v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
      });
    },
    // 添加课程
    addCourse() {
      this.day = [];
      this.tableData.forEach((item) => {
        this.day.push(item.time_id);
      });
      // 筛选没课的课次
      this.freetime_id = this.getArrDifference(this.day, this.number);
      // 判读今天课满了没
      if (this.freetime_id.length === 0) {
        this.$message("今天课程已满，请另择日");
      } else {
        this.dialog = true;
      }
    },
    // 关闭添加课程页面
    closeDialog() {
      this.dialog = false;
    },
    // 关闭编辑课程页面
    closeDialogEdit() {
      this.dialogEdit = false;
    },
  },
  // 获取课程表
  created() {
    apiGetCourse(
      this.$store.state.userInfo.user_id,
      this.value,
      this.value2
    ).then((res) => {
      // console.log(res);
      this.tableData = res.data.data;
    });
  },
};
</script>

<style scoped>
#addbtn {
  float: right;
}
</style>
