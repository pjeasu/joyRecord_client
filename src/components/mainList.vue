<template>
  <div style="margin:3vh 5em">
    <b-container style="min-height:60vh">
      <b-input-group style="display:inline;">
        <div class="form-inline" style="margin-bottom:1em">

          <b-form-group>
            <b-form-radio-group id="btn-radios" @change="selectList" v-model="listSelected" :options="listOptions"
              name="radios-btn-default" buttons></b-form-radio-group>
          </b-form-group>


          <b-col sm="1"> <label for="joy-combo"> 취미 : </label></b-col>
          <b-col sm="2">
            <b-form-select id="joy-combo" v-model="joySelected" :options="joyList"
              style="display:inline-block; margin-bottom :5px">
            </b-form-select>
          </b-col>

          <b-col sm="2">
            <b-form-input v-model="searchText" placeholder="검색" :value="searchText"
              style="margin-bottom:5px"></b-form-input>
          </b-col>
          <b-col sm="1">기간 : </b-col>
          <b-col sm="2">
            <Datepicker v-model="fromDate" locale="ko" format="yyyy-MM-dd" :enable-time-picker="false"
              :min-date="minDate" :max-date="maxDate" style="display:inline-block; margin-bottom :5px" />

          </b-col>
          -
          <b-col sm="2">
            <Datepicker v-model="toDate" locale="ko" format="yyyy-MM-dd" :enable-time-picker="false" :min-date="minDate"
              :max-date="maxDate" style="display:inline-block; margin-bottom :5px" />

          </b-col>
          <b-col sm="">
            <b-button id="search-btn" size="md" type="button" variant="secondary" @click="selectList()">검색</b-button>
          </b-col>
        </div>
      </b-input-group>

      <b-table hover class="align-middle" :items="items" :fields="fields" :per-page="perPage"
        :current-page="currentPage">
        <template #cell(joy_name)="row">
          {{ row.value == null ? '-' : row.value }}
        </template>
        <template #cell(title)="row">
          <b-button variant="link" size="sm" @click="openModal(row.item)" class="mr-1"
            style="color:black; font-size:1rem;">
            {{ row.value }}
          </b-button>

        </template>

      </b-table>
      <EventModal v-model="eventModal" :type="type" :board_id="board_id" @closeModal="close" />

      <div class="float-end">
        <b-button @click="openModal('new')" size="sm" type="button" variant="secondary">글쓰기</b-button>
      </div>
    </b-container>
    <br><br>
    <b-pagination size="sm" :align="'center'" v-model="currentPage" :total-rows="rows" :per-page="perPage"
      aria-controls="my-table" first-text="<<" prev-text="<" next-text=">" last-text=">>"></b-pagination>

  </div>
</template>
<script>

import EventModal from './modal/eventModal.vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
export default {
  name: 'mainList',
  components: {
    EventModal, Datepicker
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  data() {
    return {
      title: 'mainList',
      eventModal: false, // 모달의 표시 여부
      searchText: '',
      //todo: 
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2024, 11, 31),
      fromDate: '',
      toDate: '',
      fields: [
        {
          key: 'board_id',
          label: '번호',
          sortable: true
        },
        {
          key: 'joy_name',
          label: '취미',
          sortable: false
        },
        {
          key: 'title',
          label: '제목',
          labelAlign: 'left',
          tdAttr: { 'class': 'text-start' },
          sortable: true
        },
        {
          key: 'joy_date',
          label: '취미일',
          sortable: true
        },
        {
          key: 'user_id',
          label: '작성자',
          sortable: true
        },
        {
          key: 'created_date',
          label: '작성일시',
          sortable: true
        }
      ],
      perPage: 10, // 한 페이지당 글 개수
      currentPage: 1, // 현재 페이지 
      items: [],
      board_id: '',
      type: '',
      joyList: [],
      joySelected: '',
      listOptions: [ //리스트 타입
        { text: '내 글', value: 'mine' },
        { text: '전체', value: 'all' }
      ],
      listSelected: 'mine'

    }

  },
  mounted: function () {
    this.fromDate = new Date(2024, 0, 1);
    this.toDate = new Date();

    this.selectJoyList(); // 취미 목록 조회(콤보박스)
    this.selectList();
  },
  methods: {
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
          this.joyList.unshift({ text: '전체', value: '' });
        })
        .catch((error) => {
          console.log(error);
        })
    },
    /* 글 목록 조회 */
    selectList() {
      // 삭제처리 되지 않은 글만 조회
      this.currentPage = 1;
      const param = { del_yn: 'N' };
      param.searchText = this.searchText;
      param.joy_id = this.joySelected;
      param.fromDate = this.fromDate;
      param.toDate = this.toDate;

      if (this.listSelected == 'mine') {
        // 내 글보기 인경우에만 파라미터에 아이디 포함
        param.member_id = localStorage.member_id;
        // 내 글보기인 경우에 작성자 표시 X
        this.fields.forEach((e) => {
          if (e.key === 'user_id') {
            e.thClass = 'd-none';
            e.tdClass = 'd-none';
          }
        })
      } else {
        // 모든 글 보기인 경우에만 작성자 표시
        this.fields.forEach((e) => {
          if (e.key === 'user_id') {
            e.thClass = '';
            e.tdClass = '';
          }
        })
      }

      console.log(param)
      this.axios.get("/board/selectBoardList", {
        params: param
      })
        .then((res) => {
          console.log(res);
          this.items = res.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log("항상 마지막에 실행");
        });

    },
    openModal(item) {
      console.log(item)
      if (item === 'new') {
        this.type = 'write';
      } else {
        this.type = 'view';
        this.board_id = item.board_id;
      }

      this.eventModal = true;
    },

    close() {
      this.eventModal = false;
      this.selectList();
    },
  }
}

</script>
<style>
.custom-modal .modal-body {
  height: 50vh;
}

/* 상단 좌측 리스트 타입 라디오박스  */
#btn-radios .form-check-inline {
  margin-right: 0 !important;
  margin-top: 1em;
}

#btn-radios .form-check-inline:first-child .btn {
  border-radius: 0.3em 0 0 0.3em;
  background-color: #B4D7C2;
  border-color: #B4D7C2;
}

#btn-radios .form-check-inline:first-child .btn.active {
  background-color: #67b686;
  border-color: #67b686;
}

#btn-radios .form-check-inline:last-child .btn {
  border-radius: 0 0.3em 0.3em 0;
  background-color: #B4D7C2;
  border-color: #B4D7C2;
}

#btn-radios .form-check-inline:last-child .btn.active {
  background-color: #67b686;
  border-color: #67b686;
}

#search-btn {
  background-color: #67b686;
  border-color: #67b686;
  padding: 0.5em;
}

fieldset {
  margin-bottom: 0 !important;
}
</style>