<template>

  <div>
    <b-card id="login-page" class="text-center rounded-4">
      <div id="loginForm" style="padding:2em;">
        <h2 class="label-text">LogIn</h2>
        <b-form style="width:80%; margin:2em auto; " @submit.prevent>
          <label for="uid" class="label-text">USER ID</label>
          <b-form-input name="uid" placeholder="Enter your ID" v-model="user_id" /><br />
          <label for="password" class="label-text">PASSWORD</label>
          <b-form-input name="password" placeholder="Enter your password" v-model="password" type="password" />
          <b-button block style="margin:1em; background-color:#EAC39F; border:none" @click="fnLogin()">LOGIN</b-button>
        </b-form>

        <router-link to="/signUp" class="label-text">회원가입</router-link>
      </div>
    </b-card>


  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'loginPage',
  props: {},
  data() {
    return {
      title: 'loginPage',
      user_id: '',
      password: '',
      param: {}
    }
  },
  mounted: function () { },
  methods: {
    ...mapActions(['login']), //vuex/actions에 있는 login 함수

    async fnLogin() {
      if (this.user_id === '') {
        alert('ID를 입력하세요.')
        return
      }

      if (this.user_pw === '') {
        alert('비밀번호를 입력하세요.')
        return
      }

      console.log('state')
      console.log(this.$store.state)

      //로그인 API 호출
      try {
        let loginResult = await this.login({
          user_id: this.user_id,
          password: this.password
        })
        if (loginResult) {
          this.$router.push({
            name: 'mainCalendar'
          })

        }
      } catch (err) {
        if (err.message.indexOf('Network Error') > -1) {
          alert('서버에 접속할 수 없습니다. 상태를 확인해주세요.')
        } else {
          alert('로그인 정보를 확인할 수 없습니다.')
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      errorState: 'getErrorState'
    })
  }
}
</script>
<style>
.label-text {
  color: #B4D7C2
}

#login-page{
  max-width: 30rem; 
  margin:0 auto; 
  margin-top:3rem
}


.form-inline {
  display: flex;
  align-items: center;
}



/* 화면 너비가 768px 이하일 때 (모바일/태블릿용) */
@media screen and (max-width: 768px) {

.form-inline {
  display: inherit;
  align-items: center;
}

  
}

</style>