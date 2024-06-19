<template>
  <div style="padding: 1em; font-weight: bolder; color: darkslategrey">
    {{ title }}
  </div>
  <div>
    <h2>Please Log In</h2>
    <div id="loginForm">
      <b-form style="width:25%; margin:2em auto" @submit.prevent>
        <b-form-input name="uid" placeholder="Enter your ID" v-model="user_id" /><br />
        <b-form-input name="password" placeholder="Enter your password" v-model="password" type="password" />
        <b-button variant="primary" style="margin:1em" @click="fnLogin()">Login</b-button>
      </b-form>

      <router-link to="/signUp">회원가입</router-link>
    </div>
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

    /* doLogin(){
      this.param.user_id = this.user_id;
      this.param.password = this.password;

      this.axios.post("/api/auth/login", 
          this.param,
          {
            headers:{
            'Content-Type': 'application/json'}
            }).then((res) => {
              //성공
              console.log("성공", res);
              localStorage.setItem('user-token', res);
              console.log(localStorage)
              this.$router.push({
                name: 'mainCalendar'
              })
              
            }).catch((res) => {
              //실패
              console.error("실패 ", res);
            })
          } */
  }
}
</script>
