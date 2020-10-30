import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: null,
    myInfo: null,
    token: '',
    admin:false,
    role: ''
  },
  mutations: {
    loginAfter (state, payload) {
      state.userInfo = payload.data.info
      state.myInfo = payload.data.myInfo
      state.token = payload.data.token
      state.admin = true
      state.role = payload.data.info.role

      // 把token储存在localStorage中
      localStorage.setItem('token',state.token)
    },
    exit (state) {
      state.userInfo = null
      state.myInfo = null
      state.token = ''
      state.role = ''
      state.admin = false
      localStorage.removeItem('token')
      sessionStorage.removeItem('store')
      sessionStorage.clear()
    }
  }
})

export default store