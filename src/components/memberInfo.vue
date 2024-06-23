<template>
  <div>
    <b-card class="text-center rounded-4" style="max-width: 30rem; margin:0 auto; margin-top:2rem">
      <div id="loginForm" style="padding-top:2em;">
        <h2 class="label-text">MEMBER INFO</h2>
        <b-form style="width:80%; margin:2em auto; " @submit.prevent>
          <label for="uid" class="label-text">USER ID</label>
          <b-form-input class="member-info-input" name="uid" placeholder="Enter your ID" v-model="user_id" />

          <label for="password" class="label-text">PASSWORD</label>
          <b-form-input class="member-info-input" name="password" placeholder="Enter your password" v-model="password"
            type="password" />

          <label for="password" class="label-text">PASSWORD CHECK</label>
          <b-form-input class="member-info-input" name="passwordCheck" placeholder="Enter your password"
            v-model="password" type="password" />

          <label for="password" class="label-text">EMAIL</label>
          <b-form-input class="member-info-input" name="email" placeholder="Enter your password" v-model="password"
            type="password" />

          <label for="password" class="label-text">NAME</label>
          <b-form-input class="member-info-input" name="name" placeholder="Enter your password" v-model="password"
            type="password" />

          <label for="password" class="label-text">BIRTH</label>
          <b-form-input class="member-info-input" name="birth" placeholder="Enter .0your password" v-model="password"
            type="password" />

          <b-button block style="margin:1em; background-color:#EAC39F; border:none" @click="fnLogin()">저장</b-button>
        </b-form>
      </div>
    </b-card>


  </div>

</template>
<script>

export default {
  name: 'memberInfo',
  props: {},
  data() {
    return {
      title: 'memberInfo',
      user_id: '',
      password: '',
      param: {}
    }
  },
  mounted: function () {
    console.log(localStorage)
  },
  methods: {
  },
  computed: {

  }
}
</script>
<style>
.member-info-input {
  margin-bottom: 1em;
}
</style>
