<template>
  <div>

    <b-card no-body class="mx-auto" id="member-info">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-body id="card-info" class="text-center rounded-0">
            <div id="loginForm">
              <h2 class="label-text" style="padding-top:1.5em">MEMBER INFO</h2>
              <b-form style="width:80%; margin:2em auto;" @submit.prevent>
                <label for="user_id" class="label-text">USER ID</label>
                <b-form-input class="member-info-input" name="user_id" readonly placeholder="Enter your ID"
                  v-model="form.user_id" />

                <!-- 비밀번호 변경 collapse -->
                <div>
                  <button class="btn" type="button" data-bs-toggle="collapse"
                    style="margin-bottom:1em; background-color:lightgrey; border:none; color:aliceblue"
                    data-bs-target="#collapse" aria-expanded="false" aria-controls="collapse">
                    비밀번호 변경
                  </button>
                  <div class="collapse mt-3" id="collapse">
                    <div style="color:gray">
                      비밀번호 변경시에만 입력해주세요.
                    </div>
                    <div class="card card-body">
                      <label for="password" class="label-text">기존 비밀번호</label>
                      <b-form-input class="member-info-input" name="password" placeholder="Enter your password"
                        v-model="form.password" type="password" />

                      <label for="password" class="label-text">새로운 비밀번호</label>
                      <b-form-input class="member-info-input" name="new_password" placeholder="Enter your new password"
                        v-model="form.new_password" type="password" />

                      <label for="check_password" class="label-text">새로운 비밀번호 확인</label>
                      <b-form-input class="member-info-input" name="check_password"
                        placeholder="Confirm your new password" v-model="form.check_password" type="password" />


                    </div>
                  </div>
                </div>

                <!-- /비밀번호 변경 collapse -->

                <label for="email" class="label-text">EMAIL</label>
                <b-form-input class="member-info-input" name="email" :value="form.email" v-model="form.email"
                  type="email" />

                <label for="user_name" class="label-text">NAME</label>
                <b-form-input class="member-info-input" name="user_name" :value="form.user_name"
                  v-model="form.user_name" />

                <label for="birth" class="label-text">BIRTH</label>
                <b-form-input class="member-info-input" name="birth" :value="form.birth" v-model="form.birth" />

                <b-button block style="margin:1em; background-color:#EAC39F; border:none"
                  @click="checkPassword()">저장</b-button>
              </b-form>
            </div>
          </b-card-body>
        </b-col>
        <b-col md="6">
          <b-card-body class="text-center rounded-0">
            <h2 class="label-text" style="padding-top:1.5em">JOY COLOR SELECT</h2>

            <b-form style="width:80%; margin:2em auto; " @submit.prevent>
              <div id="joyColor" v-for="(item, index) in joyList" :key="index">
                <b-row align-v="center" class="mb-3">
                  <b-col md="4">
                    <label for="name" class="label-text">{{ item.joy_name }}</label>
                  </b-col>
                  <b-col md="8">
                    <b-form-select class="colorSelect" :id="'colorSelect' + index" :options="colorList"
                      value-field="value" text-field="text" v-model="item.color"
                      @change="event => updateBackground(event, index)">></b-form-select>
                  </b-col>
                </b-row>
              </div>
            </b-form>

            <b-button align-v="baseline" block style="margin:1em; background-color:#EAC39F; border:none"
              @click="joySave()">저장</b-button>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>

  </div>

</template>
<script>
import { Collapse } from 'bootstrap';



export default {
  name: 'memberInfo',
  props: {},
  data() {
    return {
      title: 'memberInfo',
      form: {
        user_id: '',
        email: '',
        user_name: '',
        password: '',
        new_password: '',
        check_password: '',
        birth: ''
      },
      param: {},
      member_id: '',
      joyList: [],
      changePW: false,
      //todo
      colorList: [{ text: '선택', value: '' }, { text: 'ㅤ', value: '#858BBE' },
      { text: 'ㅤ', value: '#BFE5B6' }, { text: 'ㅤ', value: '#81B29A' }, { text: 'ㅤ', value: '#F2CC8F' }]
    }
  },
  mounted: function () {
    this.member_id = localStorage.member_id;
    this.selectMemberInfo();
    this.selectJoyList();

  },
  methods: {
    /* 좌측 멤버 정보 조회  */
    selectMemberInfo() {
      this.axios.get("/member/selectMemberOne", {
        params: {
          'member_id': this.member_id
        }
      })
        .then((res) => {
          this.form = res.data;
          //비밀번호 폼 초기화
          this.form.password = '';
        })
        .catch((error) => {
          console.log(error);
        })
    },
    /* 우측 멤버 취미 목록 조회  */
    selectJoyList() {
      this.axios.get("/mjR/selectMemberJoyRList", {
        params: {
          'member_id': this.member_id,
          'del_yn': 'N'
        }
      })
        .then((res) => {
          const self = this;
          this.joyList = res.data;
          //기존에 저장한 색 selectbox에 바인딩
          this.$nextTick(function () {
            res.data.forEach(item => {
              item.member_id = self.member_id;
              if (item.color !== null) {
                this.updateBackground(item.color, item.joy_id - 1);
              }
            });
          });
        })
        .catch((error) => {
          console.log(error);
        })
    },
    /* 비밀번호 체크 */
    checkPassword() {

      const self = this;
      //비밀번호 입력시에만 체크하도록 - 셋중 하나라도 비어있으면 비밀번호 저장 X
      this.changePW = false;
      if (!(this.form.password == '' || this.form.new_password == '' || this.form.check_password == '' ||
        this.form.password == null || this.form.new_password == null || this.form.check_password == null)) {
        this.changePW = true;
        if (this.form.new_password !== this.form.check_password) {
          alert('비밀번호가 일치하지 않습니다.');
          return;
        }
        const reqData = {
          'user_id': localStorage.user_id,
          'password': this.form.password
        }
        //기존 비밀번호 확인
        this.axios.post('/auth/checkPassword', reqData, {
          headers: {
            'Content-type': 'application/json'
          }
        }).then(function (res) {
          if (res.data !== true) {
            alert('기존 비밀번호가 틀렸습니다.');
            return;
          } else {
            self.memberInfoSave();
          }
        }).catch(function (error) {
          // 오류발생시 실행
          console.log(error)
        })
      } else {
        this.memberInfoSave();

      }
    },
    /* 회원정보 수정 및 저장 */
    memberInfoSave() {
      const self = this;
      this.form.changePW = this.changePW;
      this.form.member_id = this.member_id;

      this.axios.put('/member/updateMember', this.form, {
        headers: {
          'Content-Type': 'application/json'
        }

      })
        .then(function (res) {
          if (res.data.result > 0) {
            alert('수정이 완료되었습니다.');
            self.selectMemberInfo();

            // Collapse 요소를 닫기
            const collapseElement = document.getElementById('collapse');
            const collapseInstance = Collapse.getInstance(collapseElement) || new Collapse(collapseElement);
            if (collapseElement.classList.contains('show')) {
              collapseInstance.hide();
            }

          }
        }).catch(function (error) {
          // 오류발생시 실행
          console.log(error)
        });






    },
    /* 취미 별 색상 저장 */
    joySave() {
      this.axios.put('/mjR/upsertMemberJoyR', this.joyList, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (res) {
          if (res.data.result > 0) {
            alert('수정이 완료되었습니다.');
            self.closeModal();
          }
        }).catch(function (error) {
          // 오류발생시 실행
          console.log(error)
        });
    },

    /* 취미 색상 선택시 selectBox 색 바뀌도록  */
    updateBackground(value, index) {
      const indexId = 'colorSelect' + index;
      document.getElementById(indexId).style.backgroundColor = value;
    }
  },
  computed: {

  }
}
</script>
<style>
.member-info-input {
  margin-bottom: 1em;
}

.colorSelect option:not(:first-child) {
  font-size: 1.5em;
}

.colorSelect option:first-child {
  font-size: 1.2em;
}

.colorSelect option:hover {
  background-color: black !important;
}

.colorSelect option:nth-child(2) {
  background-color: #858BBE;
}

.colorSelect option:nth-child(3) {
  background-color: #BFE5B6;
}

.colorSelect option:nth-child(4) {
  background-color: #81B29A;
}

.colorSelect option:nth-child(5) {
  background-color: #F2CC8F;
}

#member-info {
  width: 70vw;
  height: 80vh;
  overflow-x: auto;
}

#card-info {
  border-right: dotted 4px rgb(234 195 159 / 48%);
  height: 79vh;
}

/* 화면 너비가 576px  이하일 때 (모바일/태블릿용) */
@media screen and (max-width: 576px) {
  #member-info {
    width: 90vw;
  }

  #card-info {
    border-right: none;
    border-bottom: dotted 4px rgb(234 195 159 / 48%);
    height: auto;
  }

  .card-body {
    overflow-y: visible;

  }
}
</style>
