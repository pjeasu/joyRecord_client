<template>
  <b-modal id="eventModal" ref="eventModal" :title="state == 'write' ? '글 쓰기' : (state == 'view' ? '글 보기' : '글 수정')"
    size="lg" centered hide-footer :no-close-on-backdrop="true" @hide="onHide">
    <!-- state : view(글 보기) / write(글쓰기) / edit(수정하기) -->
    <b-input-group style="display:inline">
      <div class="form-inline">
        <b-form-select v-model="joySelected" :options="joyList" :disabled="state == 'view'"
          style="display:inline-block; margin-bottom :5px"></b-form-select>
        <Datepicker v-model="joy_date" locale="ko" :enable-time-picker="false" :min-date="minDate" :max-date="maxDate"
          :readonly="state == 'view'" st yle="display:inline-block; margin-bottom :5px" />
      </div>
    </b-input-group>
    <b-form-input v-model="title" placeholder="제목을 입력하세요." :readonly="state == 'view'" :value="title"
      style="margin-bottom:5px"></b-form-input>



    <b-card style="height:23.5em" v-show="state == 'view'">
      <!-- 첨부된 사진 -->
      <template v-if="fileYn">
        <img :src="attachFile" alt="업로드된 이미지" class="img-cls" />
      </template>
      
      <b-card-text>
        {{ board_text }}
      </b-card-text>
    </b-card>

    <b-form-textarea id="textarea-rows" placeholder="글 내용을 입력하세요." v-model="board_text" rows="15" :value="board_text"
      v-show="state !== 'view'"></b-form-textarea>
    <!-- 이미지 업로드 -->
    <template v-if="state == 'write'">
      <form @submit.prevent="handleFileUpload">
        <input type="file" id="file" @change="onFileChange" accept="image/*" hidden />
        <label for="file">
          <div class="btn-upload modal-button">파일</div>
        </label>

        <div v-if="previewUrl" class="preview">
          <img :src="previewUrl" alt="미리보기" class="img-cls"/>
        </div>
      </form>
    </template>


    <!-- /이미지 업로드  -->

    <div class='float-end'>
      <div id="pub_yn">
        <b-form-checkbox v-show="isMine" @click="readonly" v-model="pub_yn" name="pub_yn" value="Y" unchecked-value="N">
          공개여부
        </b-form-checkbox>
      </div>
      <div style="display:inline-block">
        <b-button v-show="state == 'view' && isMine" class="mt-2 modal-button" block
          @click="editClick('del')">삭제</b-button>
        <b-button v-show="state == 'view' && isMine" class="mt-2 modal-button" block
          @click="editClick('edit')">수정</b-button>
        <b-button v-show="state == 'write'" class="mt-2 modal-button" block @click="saveData()">등록</b-button>
        <b-button v-show="state == 'edit'" class="mt-2 modal-button" block @click="saveData()">저장</b-button>
        <b-button class="mt-2 modal-button" block @click="closeModal()">닫기</b-button>
      </div>

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
      required: false
    },
    board_id: {
      type: [String, Number],
      required: false
    },

  },
  data() {
    return {
      eventModal: {},
      title: '',        //글 제목
      board_text: '',   // 글 내용
      joy_date: '',     // 취미 날짜
      pub_yn: 0,     // 글 공개 여부 
      joyList: [],      // 취미 콤보 박스.
      joySelected: null,// 취미 콤보 박스 선택
      state: this.type,
      member_id: '',
      isMine: false,
      //todo: 
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2026, 12, 31),
      //이미지 업로드
      selectedFile: null,
      previewUrl: null,
      fileUrl: null,
      maxFileSize: 5 * 1024 * 1024, // 5MB (1MB = 1024 * 1024 바이트)
      new_board_id: '', // 새로 등록된 board_id
      fileYn: false,
      attachFileList: [], // 등록된 게시물 첨부 사진 리스트
      attachFile: null, // 등록된 게시물 첨부 사진 리스트
      confirmModal: false, // 모달의 표시 여부
    }
  },
  watch: {
    type(newType) {
      this.state = newType;
      //새 글 추가 하는 경우 리셋
      if (this.state == 'write') {
        this.title = '';
        this.board_text = '';
        this.joySelected = null;
      }

      // mainList에서 글 쓰는 경우 오늘 날짜로 자동 바인딩
      if (this.selectedDate == undefined) {
        const date = new Date();
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        this.joy_date = `${year}-${month}-${day}`;
      }
    },
    selectedDate(newDate) {
      this.joy_date = newDate; // 선택한 날짜 바인딩

    }
  },
  mounted() {
    this.selectJoyList(); // 취미 목록 조회(콤보박스)
    this.member_id = localStorage.member_id;
  },
  updated() {
    if (this.state == 'view') {
      //캘린더 화면 - 기존 이벤트 클릭하는 경우 조회
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
          const form = res.data;
          this.title = form.title;
          this.board_text = form.board_text;
          this.joy_date = form.joy_date;
          this.joySelected = form.joy_id;
          this.pub_yn = form.pub_yn;
          //내가 쓴 글이 맞는지 체크
          this.isMine = this.member_id == form.member_id ? true : false;
          //첨부파일이 있으면 조회
          if (form.file_id !== 0) {
            this.fileYn = true;
            this.selectFile();
          }else{
            this.attachFile = null;
            this.fileYn = false;
          }
        })
        .catch((error) => {
          console.log(error);
        })


    },
    /*  첨부파일 조회  */
    selectFile() {
      this.axios.get("/boardFileR/selectBoardFile", {
        params: {
          'board_id': this.board_id
        }
      })
        .then((res) => {
          this.attachFile = res.data[0].file_path;

        })
        .catch((error) => {
          console.log(error);
        })
    },

    /* 콤보박스 취미 목록 조회  */
    selectJoyList() {
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
          this.joyList.unshift({ text: '선택', value: null });
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
      param.pub_yn = this.pub_yn;
      param.member_id = this.member_id;

      if (this.state == 'write') {

        this.axios.post("/board/insertBoard", null, {
          params: param
        },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }).then((res) => {
            if (res) {
              this.new_board_id = res.data.board_id;
              // 첨부파일이 있는 경우
              if (this.file !== null) {
                this.handleFileUpload();

              } else {
                alert('글이 등록되었습니다.');
                self.closeModal();
              }
            }
          }).catch((res) => {
            //실패
            console.error("실패 ", res);
          })
      } else if (this.state == 'edit') {
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
    /* 글(이벤트) 수정 or 삭제하기 */
    editClick(type) {
      const self = this;
      if (type === 'edit') {
        this.state = 'edit';
      } else if (type === 'del') {
        //todo : confirm
        this.axios.put('/board/deleteBoard', { 'board_id': self.board_id }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(function (res) {
            if (res.data.result > 0) {
              alert('삭제되었습니다.');
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
      this.fileYn = false;
      this.title = '';
      this.board_text = '';
      this.joySelected = null;
      this.previewUrl = null;

      if (this.state === 'edit') {
        this.state = 'view';
      }
      this.$emit('closeModal');

    },
    onHide() {
      this.fileYn = false;
    },

    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {

        if (file.size > this.maxFileSize) {
          alert("파일 크기가 5MB를 초과합니다. 5MB 이하의 사진을 첨부해주세요.");
          this.selectedFile = null;
          return;
        }
        this.selectedFile = file;
        // 미리보기 URL 생성
        this.previewUrl = URL.createObjectURL(file);
      }
    },
    handleFileUpload() {
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.append('param', this.new_board_id);

      this.axios.post("/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.data.fileUrl) {
            this.fileUrl = res.data.fileUrl;
            alert('글이 등록되었습니다.');
            this.closeModal();
          }
        })
        .catch((error) => {
          console.log(error);
        })
    },
    /* 체크박스 readonly 처리 */
    readonly(event) {
      // 글 보기 상태일 때만 체크박스 막기
      if (this.state == 'view') {
        event.preventDefault();
      }
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


/* 파일 버튼 */
.btn-upload {
  width: 58px;
  height: 38px;
  background: #FFD6B1;
  color: #818385;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500 !important;
  margin-top: 8px;

  &:hover {
    background: #5c636a;
    color: #fff;
  }
}

#file {
  display: none;
}

#eventModal.modal {
  --bs-modal-bg: #dedede;
  --bs-modal-border-color: none;

}

.modal-body {
  min-height: 35em;
}

/* 모달 하단 버튼  */
.modal-button {
  --bs-btn-color: #818385 !important;
  --bs-btn-bg: #FFD6B1 !important;
  --bs-btn-border-color: none !important;
  margin-left: 0.5em;
  font-weight: 500 !important;
}


#pub_yn {
  display: inline-block;
  position: absolute;
  left: 2em;
  bottom: 2.8em;
}

.img-cls{
   max-width:80%;
   margin-right:1em; 
   margin-bottom:1em;
}

.card-body {
  overflow-y: auto;
}
</style>
