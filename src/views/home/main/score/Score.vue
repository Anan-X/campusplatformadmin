<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-select
          style="padding-bottom: 10px"
          v-model="value"
          @change="getScore"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :offset="5" :span="4">
        <el-button @click="(dialogVisible = true), addcourseButton()"
          >添加课程</el-button
        >
      </el-col>
      <el-col :span="2">
        <el-button @click="(dialogVisibleMove = true), removecourseButton()"
          >删除课程</el-button
        >
      </el-col>
    </el-row>
    <!-- 添加课程板块 -->
    <el-dialog title="添加课程" :visible.sync="dialogVisible" width="30%">
      <el-select v-model="subject_id" placeholder="请选择课程">
        <el-option
          v-for="(item, index) in notUsedSubject"
          :key="index"
          :label="item.subjectname"
          :value="item.subject_id"
        ></el-option>
      </el-select>

      <!-- <el-form-item label="任课老师" label-width="80px">
         <el-select v-model="addCourseData.teacher_id" placeholder="请选择课程">
          <el-option v-for="(item,index) in staData.teachers"
          :key="index" 
          :label="item.name" :value="item.teacher_id"></el-option>
        </el-select>
       </el-form-item> -->

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="(dialogVisible = false), btnAddcourse()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 删除课程板块 -->
    <el-dialog
      v-if="dialogVisibleMove"
      title="删除课程"
      :visible.sync="dialogVisibleMove"
      width="30%"
    >
      <ul class="infinite-list" style="overflow: auto">
        <li v-for="(item,index) in usedSubject" :key="index" class="infinite-list-item">
          <el-button style="width: 100%" @click="btnMovecourse(item.subject_id)">{{
            item.subjectname
          }}</el-button>
        </li>
      </ul>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-table v-if="isShow" :data="tableData" border style="width: 100%">
      <el-table-column
        :prop="item"
        :label="rename(item)"
        v-for="item in Object.keys(tableData[0])"
        :key="item"
      />

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="btnScoreEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  apiGetSemester,
  apiGetScore,
  apiAddScore,
  apiMoveScore,
  apiGetsta,
  apiGetUsedSubject,
} from "network/user";
export default {
  data() {
    return {
      coursname: [],
      dialogVisible: false,
      dialogVisibleMove: false,
      tableData: [],
      isShow: false,
      course: "",
      options: [],
      value: 1,
      staData: {},
      subject_id: "",
      notUsedSubject: [],
      usedSubject:[]
    };
  },
  methods: {
    rename(item) {
      if (item === "student_id") {
        return (item = "学号");
      } else if (item === "name") {
        return (item = "姓名");
      } else if (item === "classroom") {
        return (item = "班级");
      } else if (item === "semester") {
        return (item = "学期");
      } else {
        return item;
      }
    },
    // 获取班级学生成绩
    getScore() {
      apiGetScore(this.value, this.$store.state.userInfo.user_id).then(
        (res) => {
          // console.log(res)
          this.tableData = res.data.score;
          this.isShow = true;
        }
      );
    },
    // 分数编辑
    btnScoreEdit(row) {
      this.$router.push({
        name: "scoreedit",
        query: {
          student_id: row["学号"],
          semester_id: this.value,
        },
      });
    },
    // 添加课程按钮
    addcourseButton() {
      apiGetsta().then((res) => {
        this.staData = res.data;
        console.log(this.staData);
        apiGetUsedSubject(this.$store.state.userInfo.user_id, this.value).then(
          (res2) => {
            // 筛选出班级没有选的科目 根据班级和学期的数据
            this.staData.subjects.map((item1) => {
              res2.data.data.map((item2) => {
                if (item1.subject_id == item2.subject_id) {
                  //添加属性用来标记相同的对象
                  item1.isRepeat = true;
                }
              });
            });
            this.staData.subjects.map((item) => {
              //通过标记筛选对象
              if (!item.isRepeat) {
                this.notUsedSubject.push(item);
              }
            });
          }
        );
      });
    },
    // 添加课程
    btnAddcourse() {
      if (this.subject_id != "") {
        apiAddScore(
          this.subject_id,
          this.value,
          this.$store.state.userInfo.user_id
        ).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            // 重新获取班级学生成绩
            this.getScore(this.value);
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }else {
        this.$message("请选择要添加的科目")
      }
    },
    // 删除课程按钮
    removecourseButton() {
      apiGetUsedSubject(this.$store.state.userInfo.user_id, this.value)
      .then(res => {
        this.usedSubject = res.data.data
      })
    },
    // 删除课程提交
    btnMovecourse(subject_id) {
      apiMoveScore(subject_id,this.value,this.$store.state.userInfo.user_id).then((res) => {
        this.dialogVisibleMove = false;
        if (res.data.code === 200) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          // 重新获取班级学生成绩
          this.getScore();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 课程名称
    courseNameFun() {
      this.coursname = Object.keys(this.tableData[0]).filter((i) => {
        return (
          i != "student_id" &&
          i != "name" &&
          i != "classroom" &&
          i != "semester"
        );
      });
    },
  },
  created() {
    // 获取学期
    apiGetSemester().then((res) => {
      this.options = res.data.data;
    });
    // 获取班级学生成绩
    this.getScore(this.value, this.$store.state.userInfo.user_id);
  },
};
</script>

<style>
</style>
