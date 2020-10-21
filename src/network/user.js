import {request} from './request'

// 密码登陆请求
export function apiPassLogin (data) {
  return request({
    url: '/backstageUsers/passLogin',
    method: 'post',
    data
  })
}
// 密码登陆请求
export function apiPhoneLogin (data) {
  return request({
    url: '/backstageUsers/phoneLogin',
    method: 'post',
    data
  })
}
// 发送手机验证码请求
export function getPhoneCode (phone) {
  return request({
    url: '/backstageUsers/sendPhoneCode',
    method: 'get',
    params: {
      phone
    }
  },'instance')
}

// 获取班级成员请求
export function apiGetClassTeam() {
  return request({
    url: '/backstageUsers/getClassTeam',
    method: 'get',
  },'instance')
}

// 获取学生详情信息
export function apiGetStudentInfo (student_id) {
  return request({
    url: '/backstageUsers/getStudentInfo',
    method: 'get',
    params:{
      student_id
    }
  })
}
// 修改学生详情信息
export function apiStudentInfoEdit (data) {
  return request({
    url: '/backstageUsers/StudentInfoEdit',
    method: 'post',
    data
  })
}
// 根据学期查询班级成绩
export function apiGetScore (semester_id,user_id) {
  return request({
    url: '/backstageUsers/getScore',
    method: 'get',
    params: {
      semester_id,
      user_id
    }
  })
}
// 获取学期
export function apiGetSemester () {
  return request({
    url: '/backstageUsers/semester',
    method: 'get'
  })
}
// 查询某个学生的成绩
export function apiGetScoreStudent (student_id,semester_id) {
  return request({
    url: '/backstageUsers/getScoreStudent',
    method: 'get',
    params: {
      student_id,
      semester_id
    }
  })
}
// 修改某个学生的成绩
export function apiScoreStudentEdit (data,student_id) {
  return request({
    url: '/backstageUsers/scoreStudentEdit',
    method: 'post',
    data: {
      data,
      student_id
    }
  })
}
// 添加课程
export function apiAddcourse (course, semester) {
  return request({
    url: '/backstageUsers/addCourse',
    method: 'get',
    params: {
      course,
      semester
    }
  })
}
// 删除课程
export function apiMoveCourse(course, semester) {
  return request ({
    url: '/backstageUsers/moveCourse',
    method: 'get',
    params: {
      course,
      semester
    }
  })
}

// 获取课表
export function apiGetCourse(teacher_id, weekth, day) {
  return request ({
    url: '/backstageUsers/course',
    method: 'get',
    params: {
      teacher_id,
      weekth,
      day
    }
  })
}
// 获取科目 任课老师 上课地点
export function apiGetsta() {
  return request ({
    url: '/backstageUsers/sta',
    method: 'get'
  })
}
// 添加课表
export function apiAddCourse(data,teacher_id) {
  return request ({
    url: '/backstageUsers/addcourse',
    method: 'post',
    data: {
      data,
      teacher_id
    }
  })
}