<template>
  <div style="margin:5em">
    <b-container>
      <b-table striped hover :items="items" :fields="fields">
        <template #cell(title)="row">
          <b-button variant="link" size="sm" @click="openModal(row.item)" class="mr-1">
            {{ row.value }}
          </b-button>

        </template>

      </b-table>

      <EventModal v-model="eventModal" :type="type" :board_id="board_id" @closeModal="close" />



      <div class="float-end">
        <b-button @click="openModal()" size="sm" type="button" variant="secondary">글쓰기</b-button>
      </div>
    </b-container>
    <br><br>
    <!-- todo:동적으로 불러오도록 수정 -->
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center ">
        <li class="page-item"><a class="page-link text-secondary" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link text-secondary" href="#">1</a></li>
        <li class="page-item"><a class="page-link text-secondary" href="#">2</a></li>
        <li class="page-item"><a class="page-link text-secondary" href="#">3</a></li>
        <li class="page-item"><a class="page-link text-secondary" href="#">4</a></li>
        <li class="page-item"><a class="page-link text-secondary" href="#">5</a></li>
        <li class="page-item"><a class="page-link text-secondary" href="#">Next</a></li>
      </ul>
    </nav>
  </div>
</template>
<script>

import EventModal from './modal/eventModal.vue';
export default {
  name: 'mainList',
  components: {
    EventModal
  },
  props: {
  },
  data() {
    return {
      title: 'mainList',
      eventModal: false, // 모달의 표시 여부
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
          label: '작성일',
          sortable: true
        }
      ],
      items: [],
      board_id: '',
      type: 'view',
    }

  },
  mounted: function () {
    this.selectList();
  },
  methods: {

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
      if (item) {
        this.type = 'view';
        this.board_id = item.board_id;
      } else {
        this.type = 'write';
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
</style>