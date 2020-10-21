import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('../views/home/Home.vue')
const Score = () =>import('../views/home/main/score/Score')
const ScoreEdit = () => import('views/home/main/score/ScoreEdit')
const ClassTeam = () => import('views/home/main/classteam/ClassTeam')
const Curriculum = () => import('views/home/main/curriculum/Curriculum')
const StudentInfo = () => import('views/home/main/classteam/children/StudentInfo')
const StudentInfoEdit = () => import('views/home/main/classteam/children/StudentInfoEdit')

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
      }
      

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