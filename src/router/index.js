import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('../views/home/Home.vue')
// 老师
const Score = () =>import('../views/home/main/score/Score')
const ScoreEdit = () => import('views/home/main/score/ScoreEdit')
const ClassTeam = () => import('views/home/main/classteam/ClassTeam')
const Curriculum = () => import('views/home/main/curriculum/Curriculum')
const StudentInfo = () => import('views/home/main/classteam/children/StudentInfo')
const StudentInfoEdit = () => import('views/home/main/classteam/children/StudentInfoEdit')

// 管理员 
const TeacherTeam = ()=> import('views/home/main/teacherteam/TeacherTeam')
const TeacherEdit = ()=> import('views/home/main/teacherteam/child/TeacherEdit')
const TeacherAdd = ()=> import('views/home/main/teacherteam/child/TeacherAdd')

const StudentTeam = ()=> import('views/home/main/studentteam/StudentTeam')
const StudentEdit = ()=> import('views/home/main/studentteam/child/StudentEdit')
const StudentAdd = ()=> import('views/home/main/studentteam/child/StudentAdd')

const UserTeam = ()=> import('views/home/main/userteam/UserTeam')
const UserEdit = ()=> import('views/home/main/userteam/child/UserEdit')


const Login = () => import('../views/login/Login.vue')


const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children:[
      {
        path: 'classteam',
        component: ClassTeam
      },
      {
        path: 'score',
        component: Score
      },
      {
        path: 'scoreedit',
        name: 'scoreedit',
        component: ScoreEdit
      },
      {
        path: 'studentinfo',
        name: 'studentinfo',
        component: StudentInfo
      },
      {
        path: 'studentinfoedit',
        name: 'studentinfoedit',
        component: StudentInfoEdit
      },
      {
        path: 'curriculum',
        name: 'curriculum',
        component: Curriculum
      },
      // 管理员
      {
        path: 'teacherteam',
        name: 'teacherteam',
        component: TeacherTeam
      },
      {
        path: 'teacheredit',
        name: 'teacheredit',
        component: TeacherEdit
      },
      {
        path: 'teacheradd',
        name: 'teacheradd',
        component: TeacherAdd
      },
      {
        path: 'studentteam',
        name: 'studentteam',
        component: StudentTeam
      },
      {
        path: 'studentedit',
        name: 'studentedit',
        component: StudentEdit
      },
      {
        path: 'studentadd',
        name: 'studentadd',
        component: StudentAdd
      },
      {
        path: 'userteam',
        name: 'userteam',
        component: UserTeam
      },
      {
        path: 'useredit',
        name: 'useredit',
        component: UserEdit
      },
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  // 判断用户是否登陆
  if(localStorage.getItem('token')===''||localStorage.getItem('token')===null)
  {
    if(to.path === '/login'){
      return next()
    }
    return next('/login')
  } else {
    next()
  }
  
})

export default router