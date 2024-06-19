<template>
  <b-modal ref="eventModal" :title="state" size="lg" centered hide-footer :no-close-on-backdrop="true" @hide="onHide">
    <!-- state : view(글 보기) / write(글쓰기) / edit(수정하기) -->
    <b-input-group style="display:inline">
      <div class="form-inline">
        <b-form-select v-model="joySelected" :options="joyList" :disabled="state == 'view'"
          style="display:inline-block; margin-bottom :5px"></b-form-select>
        <Datepicker v-model="joy_date" locale="ko" :enable-time-picker="false" :min-date="minDate" :max-date="maxDate"
          :readonly="state == 'view'" style="display:inline-block; margin-bottom :5px" />
      </div>
    </b-input-group>
    <b-form-input v-model="title" placeholder="제목을 입력하세요." :readonly="state == 'view'" :value="title"
      style="margin-bottom:5px"></b-form-input>
    <b-form-textarea id="textarea-rows" placeholder="글 내용을 입력하세요." v-model="board_text" rows="10" :value="board_text"
      :readonly="state == 'view'"></b-form-textarea>

    <div class='float-end'>
      <b-button v-show="state == 'view'" class="mt-2" variant="outline-info" block @click="editClick()">수정</b-button>
      <b-button v-show="state == 'write'" class="mt-2" variant="secondary" block @click="saveData()">등록</b-button>
      <b-button v-show="state == 'edit'" class="mt-2" variant="secondary" block @click="saveData()">저장</b-button>
      <b-button class="mt-2" variant="outline-info" block @click="closeModal()">닫기</b-button>
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
  name: 'eventModal',
  props: {
    type: {
      type: String,
      required: true
    },
    selectedDate: {
      type: String,
      required: true
    },
    board_id: {
      type: String,
      required: true
    },

  },
  data() {
    return {
      eventModal: {},
      title: '',        //글 제목
      board_text: '',   // 글 내용
      joy_date: '',     // 취미 날짜
      joyList: [],      // 취미 콤보 박스
      joySelected: null,// 취미 콤보 박스 선택
      state: this.type,
      //todo: 
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2024, 11, 31)
    }
  },
  watch: {
    type(newType) {
      this.state = newType;
      //새 글 추가 하는 경우 리셋
      if (this.state == 'write') {
        this.title = '';
        this.board_text = '';
        this.joy_date = this.selectedDate; // 선택한 날짜 바인딩
        this.joySelected = '';
      } /* else if (this.state == 'view') {
        //기존 이벤트 클릭하는 경우 조회
        console.log('view;;;;;;;;;;;;;;;;;;;;;;;')
        this.selectOne();
      } */
    }
  },
  mounted() {
    console.log('mounted....')
    this.selectJoyList(); // 취미 목록 조회(콤보박스)
  },
  updated() {
    //console.log('!!!!!!!!!!!!!update!!!!!!!!!!!!!!!')
    if (this.state == 'view') {
      //기존 이벤트 클릭하는 경우 조회
      console.log('view;;;;;;;;;;;;;;;;;;;;;;;')
      this.selectOne();
    }

  },
  methods: {
    /* 이벤트(글) 조회 */
    selectOne() {
      this.axios.get("/board/selectBoardOne", {
        params: {
          'board_id': this.board_id
        }
      })
        .then((res) => {
          console.log(res);
          const form = res.data;
          this.title = form.title;
          this.board_text = form.board_text;
          this.joy_date = form.joy_date;
          this.joySelected = form.joy_id;
        })
        .catch((error) => {
          console.log(error);
        })


    },
    /* 콤보박스 취미 목록 조회  */
    selectJoyList() {
      console.log('joyListw')
      this.axios.get("/joy/selectJoyList", {
        params: {
          'del_yn': 'N'
        }
      })
        .then((res) => {
          const datas = res.data;
          this.joyList = datas.map(data => ({
            text: data.joy_name,
            value: data.joy_id,
          }));
          this.joyList.unshift({ text: '선택', value: '' });
          console.log(this.joyList)
        })
        .catch((error) => {
          console.log(error);
        })
    },
    /* 글(이벤트) 저장하기 */
    saveData() {
      const self = this;
      const param = {};
      param.title = this.title;
      param.board_text = this.board_text;
      param.joy_date = this.joy_date;
      param.joy_id = this.joySelected;
      param.board_id = this.board_id;
      param.member_id = localStorage.member_id;

      console.log(param);

      if (this.state == 'write') {
        console.log('saveData');

        this.axios.post("/board/insertBoard", null, {
          params: param
        },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }).then((res) => {
            if (res) {
              alert('글이 등록되었습니다.');
              self.closeModal();
            }
          }).catch((res) => {
            //실패
            console.error("실패 ", res);
          })

      } else if (this.state == 'edit') {
        console.log('editData');

        this.axios.put('/board/updateBoard', param, {
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
    /* 글(이벤트) 수정하기 */
    editClick() {
      console.log('editData');
      this.state = 'edit';
    },
    /* 모달 닫기 버튼*/
    closeModal() {
      // state 초기화
      this.state = 'view';
      this.$emit('closeModal');
    },
    onHide() {
      // 모달이 숨겨지기 전에 발생하는 이벤트 :: state 초기화
      this.state = 'view';
    },
  }
};
</script>
<style>
/* Readonly 상태일 때 포커싱 스타일 제거 */
textarea[readonly]:focus {
  outline: none;
  box-shadow: none;
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
</style>
