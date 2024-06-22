<template>
  <div style="margin:1em 5em">
    <b-container style="min-height:40em">
      <b-input-group style="display:inline;">
        <div class="form-inline" style=" margin-bottom:1em">
          <b-col sm="1"> <label for="joy-combo"> 취미 : </label></b-col>
          <b-col sm="2">
            <b-form-select id="joy-combo" v-model="joySelected" :options="joyList" :disabled="state == 'view'"
              style="display:inline-block; margin-bottom :5px">
            </b-form-select>
          </b-col>

          <b-col sm="2">
            <b-form-input v-model="searchText" placeholder="검색" :readonly="state == 'view'" :value="title"
              style="margin-bottom:5px"></b-form-input>
          </b-col>
          <b-col sm="1">기간 : </b-col>
          <b-col sm="2">
            <Datepicker v-model="joy_date" locale="ko" :enable-time-picker="false" :min-date="minDate"
              :max-date="maxDate" style="display:inline-block; margin-bottom :5px" />

          </b-col>
          -
          <b-col sm="2">
            <Datepicker v-model="joy_date" locale="ko" :enable-time-picker="false" :min-date="minDate"
              :max-date="maxDate" style="display:inline-block; margin-bottom :5px" />

          </b-col>
          <b-col sm="">
            <b-button size="sm" type="button" variant="secondary">검색</b-button>

          </b-col>



        </div>
      </b-input-group>
      <b-table hover :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage">
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
      aria-controls="my-table"></b-pagination>

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
    }

  },
  mounted: function () {
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
      this.axios.get("/board/selectBoardList", {
        params: {
          'del_yn': 'N'
        }
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
      console.log('click!!!!!!!!!!!!!!!!!!!!!!!1')
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
<style scoped>
.custom-modal .modal-body {
  height: 50vh;
}

.table.b-table {
  --bs-table-bg: rgb(255 255 255 / 30%);
  --bs-table-border-color: #bed6d1;
}
</style>