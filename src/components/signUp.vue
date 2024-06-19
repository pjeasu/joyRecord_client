<template>
	<b-container class="mt-5">
		<b-row>
			<b-col md="6" offset-md="3">
				<b-card title="Sign Up">
					<b-form @submit.prevent>
						<!-- 아이디 -->
						<b-form-group label="아이디" label-for="user_id" label-size="sm" label-align="left">
							<b-form-input id="user_id" v-model="form.user_id" required
								placeholder="Enter your ID"></b-form-input>
						</b-form-group>

						<!-- 비밀번호 -->
						<b-form-group label="비밀번호" label-for="password">
							<b-form-input id="password" type="password" v-model="form.password" required
								placeholder="Enter your password"></b-form-input>
						</b-form-group>

						<b-form-group label="비밀번호 확인" label-for="confirmPassword">
							<b-form-input id="confirmPassword" type="password" v-model="form.confirmPassword" required
								placeholder="Confirm your password"></b-form-input>
						</b-form-group>

						<!-- 이메일 -->
						<b-form-group label="Email" label-for="email">
							<b-form-input id="email" type="email" v-model="form.email" required
								placeholder="Enter your email"></b-form-input>
						</b-form-group>

						<!-- 이름 -->
						<b-form-group label="이름" label-for="user_name">
							<b-form-input id="user_name" type="text" v-model="form.user_name" required
								placeholder="Enter your name"></b-form-input>
						</b-form-group>

						<!-- 생년월일 -->
						<b-form-group label="생년월일" label-for="birth">
							<b-form-input id="birth" v-model="form.birth" required
								placeholder="Enter your birth"></b-form-input>
						</b-form-group>

						<!-- 약관 동의  -->
						<b-form-group>
							<b-form-checkbox v-model="form.termsAccepted" required>
								<b-link @click="showModal('PP')">개인 정보 보호 정책</b-link> 및 <b-link
									@click="showModal('TS')">서비스 약관</b-link>에 동의합니다.

							</b-form-checkbox>
						</b-form-group>

						<b-button type="submit" @click="joinMember()" variant="primary">회원가입</b-button>
					</b-form>
				</b-card>
			</b-col>
		</b-row>

		<!-- Modal for Privacy Policy -->
		<b-modal v-model="privacyPolicyModal.show" title="개인 정보 보호 정책" size="lg" scrollable hide-footer>
			<b-card>
				<!-- Privacy Policy 내용  -->
				<p><strong>Joy Record</strong>는 사용자("귀하")의 개인정보를 중요시하며, 개인정보보호법을 준수합니다. 본 개인정보
					처리방침은 우리가 귀하로부터 수집하는 정보, 그 정보의 사용 및 공유 방법에 대해 설명합니다.</p>

				<h5>1. 수집하는 개인정보 항목</h5>
				<p>회원가입 시 다음과 같은 개인정보를 수집합니다:</p>
				<ul>
					<li>아이디</li>
					<li>비밀번호</li>
					<li>이메일</li>
					<li>생년월일</li>
				</ul>

				<h5>2. 개인정보의 수집 및 이용 목적</h5>
				<p>우리는 수집한 개인정보를 다음의 목적을 위해 사용합니다:</p>
				<ul>
					<li>회원 관리</li>
					<li>서비스 제공 및 개선</li>
					<li>사용자의 문의 및 요청에 대한 대응</li>
				</ul>

				<h5>3. 개인정보의 보유 및 이용 기간</h5>
				<p>개인정보는 회원 탈퇴 시까지 보유하며, 목적 달성 후 지체 없이 파기합니다.</p>

				<h5>4. 개인정보의 제3자 제공</h5>
				<p>원칙적으로 귀하의 개인정보를 외부에 제공하지 않습니다. 단, 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우에는 예외로
					합니다.
				</p>

				<h5>5. 개인정보 보호를 위한 기술적/관리적 대책</h5>
				<p>우리는 귀하의 개인정보를 보호하기 위해 다음과 같은 대책을 강구하고 있습니다:</p>
				<ul>
					<li>비밀번호는 암호화되어 저장 및 관리됩니다.</li>
					<li>해킹이나 컴퓨터 바이러스 등에 의해 귀하의 개인정보가 유출되는 것을 방지하기 위해 보안 프로그램을 설치하고 주기적인 점검을 실시합니다.</li>
				</ul>

				<h5>6. 개인정보 처리방침의 변경</h5>
				<p>본 개인정보 처리방침은 법률이나 회사 정책에 따라 변경될 수 있으며, 변경 사항은 웹사이트를 통해 공지됩니다.</p>

				<h5>7. 개인정보 보호책임자</h5>
				<p>개인정보 보호와 관련된 문의사항이 있으시면 아래의 연락처로 연락주시기 바랍니다.</p>
				<ul>
					<li>담당자: 박지수</li>
					<li>이메일: pjeasu@gmail.com</li>
				</ul>
				<p>본 방침은 2024년 6월 1일부터 시행됩니다.</p>
			</b-card>
		</b-modal>

		<!-- Modal for Terms of Service -->
		<b-modal v-model="termsOfServiceModal.show" title="서비스 약관" size="lg" scrollable hide-footer>
			<b-card>
				<p><strong>Joy Record</strong>의 웹사이트를 이용해 주셔서 감사합니다. 본 약관은 귀하가 본 웹사이트를 이용함에
					있어
					준수해야 할 사항을 규정합니다.</p>

				<h5>1. 약관의 동의</h5>
				<p>귀하가 본 웹사이트에 회원가입을 완료하면 본 약관에 동의하는 것으로 간주합니다.</p>

				<h5>2. 회원가입</h5>
				<ul>
					<li>회원가입 시 정확한 정보를 제공해야 합니다.</li>
					<li>타인의 정보를 도용하거나 허위 정보를 제공해서는 안 됩니다.</li>
					<li>회원 계정은 본인만 사용 가능하며, 타인에게 양도하거나 대여할 수 없습니다.</li>
				</ul>

				<h5>3. 회원의 의무</h5>
				<ul>
					<li>본 약관을 준수하고, 공공질서 및 미풍양속을 해치는 행위를 하지 않습니다.</li>
					<li>서비스 이용 시 법령을 준수하고, 타인의 권리를 침해하지 않습니다.</li>
				</ul>

				<h5>4. 서비스 제공 및 변경</h5>
				<p>우리는 서비스의 제공 및 변경에 대해 최선을 다하며, 사전 통지 없이 서비스의 내용, 운영, 정책 등을 변경할 수 있습니다.</p>

				<h5>5. 서비스 이용 제한</h5>
				<p>우리는 귀하가 본 약관을 위반하는 경우 사전 통지 없이 서비스 이용을 제한하거나 계정을 삭제할 수 있습니다.</p>

				<h5>6. 책임 제한</h5>
				<p>우리는 천재지변, 전쟁, 파업, 정부의 규제 등 불가항력적인 사유로 인해 서비스를 제공할 수 없는 경우, 이에 대한 책임을 지지 않습니다.</p>

				<h5>7. 약관의 개정</h5>
				<p>본 약관은 법령이나 서비스 정책에 따라 변경될 수 있으며, 변경 사항은 웹사이트를 통해 공지됩니다.</p>

				<h5>8. 준거법 및 관할</h5>
				<p>본 약관은 대한민국 법률에 따라 해석되며, 본 약관과 관련된 분쟁은 대한민국 법원의 관할로 합니다.</p>

				<h5>9. 문의</h5>
				<p>약관과 관련된 문의사항이 있으시면 아래의 연락처로 연락주시기 바랍니다.</p>
				<ul>
					<li>담당자: 박지수</li>
					<li>이메일: pjeasu@gmail.com</li>
				</ul>

				<p>본 약관은 2024년 6월 1일부터 시행됩니다.</p>
			</b-card>
		</b-modal>

	</b-container>
</template>

<script>
export default {
	data() {
		return {
			form: {
				user_id: '',
				email: '',
				user_name: '',
				password: '',
				confirmPassword: '',
				birth: '',
				termsAccepted: false,
			},
			privacyPolicyModal: {
				show: false,
				id: 'privacyPolicyModal',
				title: '개인 정보 보호 정책',
			},
			termsOfServiceModal: {
				show: false,
				id: 'termsOfServiceModal',
				title: '서비스 약관',
			},
		};
	},
	methods: {
		joinMember() {
			if (this.form.password !== this.form.confirmPassword) {
				alert('비밀번호가 일치하지 않습니다.');
				return;
			}

			if (!this.form.termsAccepted) {
				alert('개인 정보 보호 정책 및 서비스 약관에 동의 해야 합니다.');
				return;
			}

			this.axios.post("/member/join",
				this.form,
				{
					headers: {
						'Content-Type': "multipart/form-data"
					}
				}).then((res) => {
					//중복아이디가 있을경우 
					if (res.data.error) {
						alert(res.data.error);
					} else {
						alert('회원가입이 완료되었습니다. 로그인해주세요.')
						this.$router.push({
							name: 'loginPage'
						})
					}


				}).catch((res) => {
					//실패
					console.error("실패 ", res);
				})


		},
		showModal(type) {
			if (type === 'TS') {
				this.termsOfServiceModal.show = true;
			} else if (type === 'PP') {
				this.privacyPolicyModal.show = true;
			}
		},

	}
};
</script>
<style>
b-modal {
	font-family: NanumGothic !important;
}
</style>