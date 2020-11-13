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
  })
}
// 判断该学工号能否注册
export function isTeacher (teacher_id) {
  return request({
    url: '/backstageUsers/is_teacher',
    method: 'get',
    params: {
      teacher_id
    }
  })
}
// 判断该手机号能否注册
export function isPhone (phone) {
  return request({
    url: '/backstageUsers/is_phone',
    method: 'get',
    params: {
      phone
    }
  })
}
// 注册
export function Register(data) {
  return request({
    url: '/backstageUsers/register',
    method: 'post',
    data
  })
}
// 修改密码
export function Password(data) {
  return request({
    url: '/backstageUsers/password',
    method: 'post',
    data
  })
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
// 查询班级上什么课
export function apiGetUsedSubject (teacher_id,semester_id) {
  return request({
    url: '/backstageUsers/usedsubject',
    method: 'get',
    params: {
      teacher_id,
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

// 添加课程分数
export function apiAddScore (subject_id, semester_id, teacher_id) {
  return request({
    url: '/backstageUsers/addscore',
    method: 'get',
    params: {
      subject_id,
      semester_id,
      teacher_id
    } 
  })
}
// 删除课程分数
export function apiMoveScore(subject_id, semester_id, teacher_id) {
  return request ({
    url: '/backstageUsers/movescore',
    method: 'get',
    params: {
      subject_id,
      semester_id,
      teacher_id
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
// 获取科目 任课老师 上课地点 班级名
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
// 修改课表
export function apiEditCourse(data) {
  return request ({
    url: '/backstageUsers/editcourse',
    method: 'post',
    data
  })
}
// 修改课表
export function apiDeleteCourse(course_id) {
  return request ({
    url: '/backstageUsers/deletecourse',
    method: 'get',
    params: {
      course_id
    }
  })
}

// 管理员操作请求
// 获取教师信息
export function apiGetTeacher() {
  return request({
    url:'/backstageUsers/teacher',
    method:'get'
  })
}
// 教师信息修改
export function apiTeacherEdit(teacher) {
  return request({
    url:'/backstageUsers/teacheredit',
    method:'post',
    data: {
      teacher
    }
  })
}
// 添加教师
export function apiTeacherAdd(teacher) {
  return request({
    url:'/backstageUsers/teacheradd',
    method:'post',
    data: {
      teacher
    }
  })
}
// 查询老师的信息（根据老师id查找）
export function apiTeacherIdFind(teacher_id) {
  return request({
    url:'/backstageUsers/teacheridfind',
    method:'get',
    params: {
      teacher_id
    }
  })
}
// 删除老师（
export function apiTeacherDelete(teacher_id) {
  return request({
    url:'/backstageUsers/teacher_delete',
    method:'post',
    data: {
      teacher_id
    }
  })
}
// 查询老师的信息（根据老师姓名查找）
export function apiTeacherNameFind(name) {
  return request({
    url:'/backstageUsers/teachernamefind',
    method:'get',
    params: {
      name
    }
  })
}

// 获取学生信息
export function apiGetStudent() {
  return request({
    url:'/backstageUsers/student',
    method:'get'
  })
}
// 学生信息修改
export function apiStudentEdit(student) {
  return request({
    url:'/backstageUsers/studentedit',
    method:'post',
    data: {
      student
    }
  })
}
// 添加学生
export function apiStudentAdd(student) {
  return request({
    url:'/backstageUsers/studentadd',
    method:'post',
    data: {
      student
    }
  })
}
// 删除学生
export function apiStudentDelete(student_id) {
  return request({
    url:'/backstageUsers/studentdelete',
    method:'get',
    params: {
      student_id
    }
  })
}
// 查询学生的信息（根据学生id查找）
export function apiStudentIdFind(student_id) {
  return request({
    url:'/backstageUsers/studentidfind',
    method:'get',
    params: {
      student_id
    }
  })
}
// 查询学生的信息（根据学生姓名查找）
export function apiStudentNameFind(name) {
  return request({
    url:'/backstageUsers/studentnamefind',
    method:'get',
    params: {
      name
    }
  })
}
// 查询学生的信息（根据学生班级查找）
export function apiStudentClassroomFind(classroom_id) {
  return request({
    url:'/backstageUsers/studentclassfind',
    method:'get',
    params: {
      classroom_id
    }
  })
}

// 获取全部用户的信息
export function apiGetUser() {
  return request({
    url:'/backstageUsers/user',
    method:'get'
  })
}
// 获取全部用户的信息
export function apiGetUserIdFind(user_id) {
  return request({
    url:'/backstageUsers/useridfind',
    method:'get',
    params: {
      user_id
    }
  })
}
// 获取全部用户的信息
export function apiUserEdit(user) {
  return request({
    url:'/backstageUsers/useredit',
    method:'post',
    data: {
      user
    }
  })
}
// 获取用户的信息（根据用户id查找）
export function apiUserIdFind(user_id) {
  return request({
    url:'/backstageUsers/user_id_find',
    method:'get',
    params: {
      user_id
    }
  })
}
// 获取用户的信息（根据用户用户名查找）
export function apiUserNameFind(name) {
  return request({
    url:'/backstageUsers/user_name_find',
    method:'get',
    params: {
      name
    }
  })
}
// 修改用户状态  （账号冻结）
export function apiUserAdmin(user) {
  return request({
    url:'/backstageUsers/user_admin',
    method:'post',
    data: {
      user
    }
  })
}
// 删除用户
export function apiUserDelete(user_id) {
  return request({
    url:'/backstageUsers/user_delete',
    method:'post',
    data: {
      user_id
    }
  })
}
// 获取科目信息
export function apiGetSubject() {
  return request({
    url:'/backstageUsers/subject',
    method:'get'
  })
}
// 添加科目
export function apiAddSubject(data) {
  return request({
    url:'/backstageUsers/subject_add',
    method:'post',
    data
  })
}
// 修改科目
export function apiEditSubject(data) {
  return request({
    url:'/backstageUsers/subject_edit',
    method:'post',
    data
  })
}
// 获取科目  根据科目名称
export function apiSubjectName(subjectname) {
  return request({
    url:'/backstageUsers/subject_name',
    method:'get',
    params:{
      subjectname
    }
  })
}
// 获取科目  根据任课老师姓名
export function apiSubjectTeacher(name) {
  return request({
    url:'/backstageUsers/subject_teacher_name',
    method:'get',
    params:{
      name
    }
  })
}

