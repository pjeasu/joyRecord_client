<template>
  <div class="main-div">
    <b-container style="min-height:60vh">
      <!-- 모바일 버전 검색조건  collapse -->
      <div class="display-mobile">
        <b-row align-h="end" class="mb-1">
          <b-col align-self="start" cols="4">
            <button class="btn" type="button" data-bs-toggle="collapse"
              style="margin-bottom:0; background-color:lightgrey; border:none; color:aliceblue;"
              data-bs-target="#collapse" aria-expanded="false" aria-controls="collapse">
              검색 조건
            </button>
          </b-col>
          <b-col></b-col>
          <b-col align-self="end" cols="5">
            <b-form-radio-group id="btn-radios" @change="selectList" v-model="listSelected" :options="listOptions"
              name="radios-btn-default" buttons></b-form-radio-group>
          </b-col>
        </b-row>
        <div class="collapse" id="collapse">
          <b-input-group>
            <div style="margin-bottom:1em">
              <b-row style="display:flex">
                <b-col>
                  <b-form-select id="joy-combo" v-model="joySelected" :options="joyList" class="search-form">
                  </b-form-select>
                </b-col>
                <b-col cols="8">
                  <b-form-input v-model="searchText" placeholder="검색" :value="searchText"
                    style="margin-bottom:5px"></b-form-input>

                </b-col>

              </b-row>
              <b-col sm="1" style="display:flex">
                <Datepicker v-model="fromDate" locale="ko" format="yyyy-MM-dd" :enable-time-picker="false"
                  :min-date="minDate" :max-date="maxDate" class="search-form" />
                <Datepicker v-model="toDate" locale="ko" format="yyyy-MM-dd" :enable-time-picker="false"
                  :min-date="minDate" :max-date="maxDate" class="search-form" />
              </b-col>
              <b-col><b-button id="search-btn" size="md" type="button" variant="secondary" style="width:95vw"
                  @click="selectList()">검색</b-button>

              </b-col>
            </div>
          </b-input-group>
        </div>
      </div>
      <!-- /모바일 버전 검색조건  collapse -->

      <b-input-group style="display:inline;" class="display-pc">
        <div class="form-inline " style="margin-bottom:1em">
          <b-form-group>
            <b-form-radio-group id="btn-radios" @change="selectList" v-model="listSelected" :options="listOptions"
              name="radios-btn-default" buttons></b-form-radio-group>
          </b-form-group>
          <b-col sm="1"> <label for="joy-combo"> 취미 : </label></b-col>
          <b-col sm="2">
            <b-form-select id="joy-combo" v-model="joySelected" :options="joyList" class="search-form">
            </b-form-select>
          </b-col>
          <b-col sm="2">
            <b-form-input v-model="searchText" placeholder="검색" :value="searchText"
              style="margin-bottom:5px"></b-form-input>
          </b-col>
          <b-col sm="1">기간 : </b-col>
          <b-col sm="2">
            <Datepicker v-model="fromDate" locale="ko" format="yyyy-MM-dd" :enable-time-picker="false"
              :min-date="minDate" :max-date="maxDate" class="search-form" />

          </b-col>
          -
          <b-col sm="2">
            <Datepicker v-model="toDate" locale="ko" format="yyyy-MM-dd" :enable-time-picker="false" :min-date="minDate"
              :max-date="maxDate" class="search-form" />

          </b-col>
          <b-col sm="">
            <b-button id="search-btn" size="md" type="button" variant="secondary" @click="selectList()">검색</b-button>
          </b-col>
        </div>
      </b-input-group>

      <!-- 검색조건 끝 -->

      <div id="main-table">
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
            <div class="d-sm-none text-muted" style="font-size: 0.8rem;">
              {{ row.item.joy_date }} <span class="d-sm-none" :class="listSelected == 'mine' ? 'mobile-cls' : '' ">| {{ row.item.user_id }}</span>
            </div>

          </template>
        </b-table>
      </div>

      <EventModal v-model="eventModal" :type="type" :board_id="board_id" @closeModal="close" />

      <div v-show="items.length == 0">작성된 게시물이 없습니다. Joy를 기록하세요! 🎮🍺⚾🎥 </div>
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
      maxDate: new Date(2026, 12, 31),
      fromDate: '',
      toDate: '',
      fields: [
        {
          key: 'id',
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
          sortable: true,
          thClass: "d-none d-md-table-cell", // 헤더 숨김
          tdClass: "d-none d-md-table-cell"  // 본문 숨김
        },
        {
          key: 'user_id',
          label: '작성자',
          sortable: true,
          thClass: "d-none d-md-table-cell", // 헤더 숨김
          tdClass: "d-none d-md-table-cell"  // 본문 숨김
        },
        {
          key: 'created_date',
          label: '작성일시',
          sortable: true,
          thClass: "d-none d-md-table-cell", // 헤더 숨김
          tdClass: "d-none d-md-table-cell"  // 본문 숨김
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
    this.fromDate = new Date(2025, 0, 1);
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
        this.fields = this.fields.map(e => {
          if (e.key === 'user_id') {
            return { ...e, thClass: 'd-none', tdClass: 'd-none' };
          }
          return e;
        });
      } else {
        // 모든 글 보기인 경우에만 작성자 표시
        this.fields = this.fields.map(e => {
          if (e.key === 'user_id') {
            return { ...e, thClass: 'd-md-table-cell mobile-cls', tdClass: 'd-md-table-cell mobile-cls' };
          }
          return e;
        });
      }

      this.axios.get("/board/selectBoardList", {
        params: param
      })
        .then((res) => {
          this.items = res.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });

    },
    openModal(item) {
      if (item === 'new') {
        this.type = 'write';
      } else {
        this.type = 'view';
        this.board_id = '';
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


.main-div {
  margin: 3vh 5em
}

.search-form {
  display: inline-block;
  margin-bottom: 5px;
}

.display-mobile {
  display: none;
}

.mobile-cls {
  display: contents
}


/* 화면 너비가 576px  이하일 때 (모바일/태블릿용) */
@media screen and (max-width: 576px) {
  .main-div {
    margin: 0;
    max-width: auto;
    max-height: 85vh;
    overflow-y: auto;
  }

  .main-div .form-inline {
    display: block;
    align-items: center;
  }

  .display-pc {
    display: none !important;
  }

  .display-mobile {
    display: contents;
  }

  #main-table {
    max-height: 67vh;
    overflow-y: auto;
  }

  .mobile-cls {
    display: none
  }

}
</style>