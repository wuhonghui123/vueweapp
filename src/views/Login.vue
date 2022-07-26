<template>
  <label htmlFor="username">用户名：</label><input type="text" id="username" v-model="loginForm.username">
  <label htmlFor="password">密码：</label><input type="text" id="password" v-model="loginForm.password">
  <button @click="login">登录</button>
</template>

<script>

export default {
  name: "LoginPage",
  data() {
    return {
      loginForm: {
        username: 'liwei',
        password: 'lw1234'
      }
    }
  },
  methods: {
    login() {
      // 1、拿到username和password
      // 2、使用axios发送登录请求给后端（SpringBoot）

      this.$api.login.login("/login", this.loginForm)
          .then(res => {

            // vuex（状态管理）
            sessionStorage.setItem("token", res.token);
            // 跳转到页面之前要调用后台的菜单接口，获取当前用户的菜单
            // 再次发请求，但是发请求之前，要带上token

            this.$api.menu.findNavTree("menu/findNavTree", {'userName': this.loginForm.username})
                .then(res => {
                  console.log("当前用户的菜单：",res);
                  // 给全局属性赋值
                  this.$store.commit('setNavTree',res);
                })
            this.$router.push("/index");
          }).catch(err => {
        console.log(err);
        this.$router.push("/");//跳到登录页面
      })
    }
  }
}
</script>

<style scoped>

</style>