<template>
  <b-modal id="joyModal" title="JOY - 취미" size="lg" centered hide-footer :no-close-on-backdrop="true" @hide="onHide">

    <b-row>
      <b-col sm="1" class="mt-2" style="text-align: right;">
        <label for="joy_name" style="line-height: 1em;"> 이름 </label>
      </b-col>
      <b-col sm="5">
        <b-form-input v-model="joy_name" id="joy_name" placeholder="제목을 입력하세요."
          style=" margin-bottom:5px"></b-form-input>
      </b-col>
      <b-col sm="2" class="mt-2" style="text-align: right;">
        <label for="del_yn"> 삭제여부</label>
      </b-col>
      <b-col sm="3">
        <div class="form-inline">
          <b-form-select v-model="del_yn" :options="del_ynList" style=" margin-bottom :5px"></b-form-select>
        </div>

      </b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col sm="1" class="mt-2" style="text-align: right;">
        설명
      </b-col>
      <b-col>
        <b-form-textarea id="textarea-rows" placeholder="글 내용을 입력하세요." rows="4" :value="detail"
          v-model="detail"></b-form-textarea>
      </b-col>
    </b-row>



    <div class='float-end'>
      <b-button v-show="state == 'edit'" class="mt-2 modal-button" block @click="saveData()">수정완료</b-button>
      <b-button v-show="state == 'write'" class="mt-2 modal-button" block @click="saveData()">등록</b-button>
      <b-button class="mt-2 modal-button" block @click="closeModal()">닫기</b-button>
    </div>

  </b-modal>

</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: {
    Datepicker
  },
  name: 'joyModal',
  props: {
    type: {
      type: String,
      required: true
    },
    joyData: {
      type: Object,
      required: false
    },


  },
  data() {
    return {
      title: '',        //글 제목
      state: this.type,
      joy_id: '',
      joy_name: '',
      detail: '',
      del_yn: '',
      del_ynList: [{ text: 'N', value: 'N' }, { text: 'Y', value: 'Y' }]
    }
  },
  watch: {
    type(newType) {
      this.state = newType;
      //새 글 추가 하는 경우 리셋
      if (this.state == 'write') {
        this.joy_id = '';
        this.joy_name = '';
        this.detail = '';
        this.del_yn = 'N';
      }
    }
  },
  mounted() {
  },
  updated() {
    console.log('update....')
    console.log(this.state)
    if (this.state == 'edit') {
      console.log('edit;;;;;;;;;;;;;;;;;;;;;;;')

      this.joy_id = this.joyData.joy_id;
      this.joy_name = this.joyData.joy_name;
      this.detail = this.joyData.detail;
      this.del_yn = this.joyData.del_yn;
    }


  },
  methods: {

    /* 글(이벤트) 저장하기 */
    saveData() {
      const self = this;
      const param = {};
      param.joy_id = this.joy_id;
      param.joy_name = this.joy_name;
      param.detail = this.detail;
      param.del_yn = this.del_yn;
      console.log(param);

      if (this.state == 'write') {
        console.log('saveData');

        this.axios.post("/joy/insertJoy", null, {
          params: param
        },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }).then((res) => {
            if (res) {
              console.log(res)
              alert('글이 등록되었습니다.');
              self.closeModal();
            }
          }).catch((res) => {
            //실패
            console.error("실패 ", res);
          })
      } else if (this.state == 'edit') { // 글 수정
        this.axios.put('/joy/updateJoy', param, {
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
      }
    },
    /* 모달 닫기 버튼*/
    closeModal() {
      this.$emit('closeModal');

    },
    onHide() {
      this.fileYn = false;
    },
  }
};
</script>
<style>
.form-control:focus {
  border-color: #B4D7C2 !important;
  box-shadow: 0 0 0 0.25rem #B4D7C2 !important;
}

.form-select:focus {
  border-color: #B4D7C2 !important;
  box-shadow: 0 0 0 0.25rem #B4D7C2 !important;
}

/* Readonly 상태일 때 포커싱 스타일 제거 */
textarea[readonly]:focus {
  outline: none !important;
  box-shadow: none !important;
}

/* Readonly 상태일 때 포커싱 스타일 제거 */
input[readonly]:focus {
  outline: none !important;
  box-shadow: none !important;
}

.form-inline {
  display: flex;
  align-items: center;
  /* 옵션: 요소들을 수직 중앙 정렬 */
}

.form-inline>* {
  margin-right: 5px;
  /* 각 요소 사이에 간격 추가 */
}


#joyModal.modal {
  --bs-modal-bg: #dedede;
  --bs-modal-border-color: none;

}

#joyModal.modal-body {
  min-height: 15em;
}

/* 모달 하단 버튼  */
.modal-button {
  --bs-btn-color: #818385 !important;
  --bs-btn-bg: #FFD6B1 !important;
  --bs-btn-border-color: none !important;
  margin-left: 0.5em;
  font-weight: 500 !important;
}
</style>
