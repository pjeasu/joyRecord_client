<template>
  <div id="app">
    <mainHeader></mainHeader>




    <router-view></router-view>
  </div>
</template>

<script>

import mainHeader from './components/mainHeader.vue'
export default {
  name: 'App',
  components: {
    mainHeader
  },
  methods: {
    /* 로그아웃  */
    fnLogout() {
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_role");
      this.$store.state.isLogin = false;
      this.$store.state.user = null;

      alert('로그아웃 되었습니다.')
      this.$router.push({
        name: 'loginPage'
      })
    }
  }
}
</script>

<style>
#app {
  height: 100vh;
  font-family: NanumGothic !important;
  text-align: center;
  color: #2c3e50;
  background-color: #FAF7EB
}



.header {
  font-size: 20px
}

@font-face {
  font-family: 'NanumGothic';
  src: local(※),
    url('./assets/fonts/NanumGothic.otf') format('opentype'),
    url('./assets/fonts/NanumGothic.ttf') format('truetype');
  font-weight: 400;

}

@font-face {
  font-family: 'NanumGothicBold';
  src: url('./assets/fonts/NanumGothicBold.otf') format('opentype'),
    url('./assets/fonts/NanumGothicBold.ttf') format('truetype');
  font-weight: 500;
}

@font-face {
  font-family: 'NanumGothicExtraBold';
  src: url('./assets/fonts/NanumGothicExtraBold.ttf') format('truetype');
  font-weight: 700;
}
</style>
