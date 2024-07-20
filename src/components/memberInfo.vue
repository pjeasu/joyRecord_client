<template>
  <div>

    <b-card no-body class="overflow-hidden mx-auto" style="width:60em;">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-body class="text-center rounded-0" style=" border-right: dotted 4px rgb(234 195 159 / 48%);">
            <div id="loginForm">
              <h2 class="label-text" style="padding-top:1.5em">MEMBER INFO</h2>
              <b-form style="width:80%; margin:2em auto;" @submit.prevent>
                <label for="uid" class="label-text">USER ID</label>
                <b-form-input class="member-info-input" name="uid" placeholder="Enter your ID" v-model="user_id" />

                <label for="password" class="label-text">PASSWORD</label>
                <b-form-input class="member-info-input" name="password" placeholder="Enter your password"
                  v-model="password" type="password" />

                <label for="password" class="label-text">PASSWORD CHECK</label>
                <b-form-input class="member-info-input" name="passwordCheck" placeholder="Enter your password"
                  v-model="password" type="password" />

                <label for="password" class="label-text">EMAIL</label>
                <b-form-input class="member-info-input" name="email" placeholder="Enter your password"
                  v-model="password" type="email" />

                <label for="password" class="label-text">NAME</label>
                <b-form-input class="member-info-input" name="name" placeholder="Enter your password" v-model="name" />

                <label for="password" class="label-text">BIRTH</label>
                <b-form-input class="member-info-input" name="birth" placeholder="Enter your password"
                  v-model="birth" />

                <b-button block style="margin:1em; background-color:#EAC39F; border:none"
                  @click="fnLogin()">저장</b-button>
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

export default {
  name: 'memberInfo',
  props: {},
  data() {
    return {
      title: 'memberInfo',
      user_id: '',
      password: '',
      param: {},
      joyList: [],
      colorList: [{ text: '선택', value: '' }, { text: 'ㅤ', value: '#858BBE' },
      { text: 'ㅤ', value: '#BFE5B6' }, { text: 'ㅤ', value: '#81B29A' }, { text: 'ㅤ', value: '#F2CC8F' }]
    }
  },
  mounted: function () {
    this.selectJoyList();
  },
  methods: {
    /* 우측 멤버 취미 목록 조회  */
    selectJoyList() {
      this.axios.get("/mjR/selectMemberJoyRList", {
        params: {
          'member_id': localStorage.member_id,
          'del_yn': 'N'
        }
      })
        .then((res) => {
          this.joyList = res.data;
          console.log(this.joyList)
          //기존에 저장한 색 selectbox에 바인딩
          this.$nextTick(function () {
            res.data.forEach(item => {
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
    /* 취미 별 색상 저장 */
    joySave() {
      console.log('joySave')
      console.log(this.joyList)

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
      console.log(value)
      console.log(index)
      const indexId = 'colorSelect' + index;
      console.log(indexId)
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
</style>
