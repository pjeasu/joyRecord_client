<template>
  <div style="padding:1em; font-weight: bolder; color:darkslategrey">
    {{title}}
  </div>
  <div class="container">
		<form @submit.prevent="submitForm">
      <div>
				<label for="user_id">아이디</label>
				<input type="text" id="position" v-model="position" />
			</div>
		
			<div>
				<label for="password">비밀번호</label>
				<input type="password" id="password" v-model="password" />
			</div>
			<div>
				<label for="passwordConfirm">비밀번호 확인</label>
				<input type="password" id="passwordConfirm" v-model="passwordConfirm" />
			</div>
			<div>
				<label for="email">email</label>
				<input type="text" id="email" v-model="email" />
			</div>
			<div>
				<label for="name">이름</label>
				<input type="text" id="name" v-model="name" />
			</div>
			<div>
				<label for="teamName">팀 이름</label>
				<input type="text" id="teamName" v-model="teamName" />
			</div>
			<button type="submit">회원가입</button>
		</form>
	</div>
</template>
<script>
export default {
  name: 'signUp',
  props: {
  },
  data() {
    return{
      title : 'signUp'
    }
   
  },
  mounted: function () {
  },
  methods:{

  }
}

</script>