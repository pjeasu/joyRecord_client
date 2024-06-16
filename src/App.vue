<template>
  <div id="app">

    <div class="header">
      <router-link to="/" v-if="!this.$store.state.isLogin"> 로그인</router-link>
      <span style="padding:1em" v-if="!this.$store.state.isLogin"> | </span>
      <router-link to="/mainCalendar">메인 캘린더</router-link>
      <span style="padding:1em"> | </span>
      <router-link to="/mainList"> 글 목록</router-link>
      <span style="padding:1em"> | </span>
      <router-link to="/joyRecordInfo"> info</router-link>
      <span style="padding:1em"> | </span>
      <router-link to="/memberInfo">회원정보</router-link>


      <span v-if="this.$store.state.isLogin" style="padding:1em"> | </span>
      <a v-if="this.$store.state.isLogin" @click="fnLogout">로그아웃</a>
    </div>




    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  methods: {
    /* 로그아웃  */
    fnLogout() {
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_role");
      this.$store.state.isLogin = false;
      this.$store.state.user = null;
      console.log(localStorage)
      console.log(this.$store)


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
  font-family: NanumGothic !important;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}



.header {
  font-size: 20px
}

@font-face {
  font-family: 'NanumGothic';
  src: local(※), url('./assets/fonts/NanumGothic.ttf') format('truetype'),
    url('./assets/fonts/NanumGothic.otf') format('opentype');
  font-weight: 400;

}

@font-face {
  font-family: 'NanumGothicBold';
  src: url('./assets/fonts/NanumGothicBold.ttf') format('truetype'),
    url('./assets/fonts/NanumGothicBold.otf') format('opentype');
  font-weight: 500;
}

@font-face {
  font-family: 'NanumGothicExtraBold';
  src: url('./assets/fonts/NanumGothicExtraBold.ttf') format('truetype');
  font-weight: 700;
}
</style>
