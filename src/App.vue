<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  created () {
    // 在页面加载时读取sessionStorage
    if (sessionStorage.getItem('store')) {
      // console.log("llll")
      // apiGetUserInfo().then(res => {
      //   if (res.data.code === 200){
      //     this.$store.commit('loginAfter', res)
      //   }
      // })
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
    // console.log(this.$store.state)
  },
}
</script>

<style>
  @import url('./assets/css/base.css'); 
</style>
