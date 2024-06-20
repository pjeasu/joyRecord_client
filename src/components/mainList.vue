<template>
  <div style="margin:5em">
    <b-container>
      <b-table striped hover :items="items" :fields="fields">
        <template #cell(title)="row">
          <b-button variant="link" size="sm" @click="openModal(row.item, row.index, $event.target)" class="mr-1">
            {{ row.value }}
          </b-button>

        </template>

      </b-table>

      <b-modal centered v-model="modalShow" size="xl" class="custom-modal">
        <pre>{{ titleModal.title }}</pre>
        <b-card>

          {{ titleModal.content }}

        </b-card>
      </b-modal>
      <div class="float-end">
        <b-button size="sm" type="button" variant="secondary">글쓰기</b-button>
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
export default {
  name: 'mainList',
  props: {
  },
  data() {
    return {
      title: 'mainList',
      fields: [
        {
          key: 'board_id',
          label: '번호',
          sortable: true
        },
        {
          key: 'name',
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
          key: 'created_date',
          label: '작성일',
          sortable: true
        }
      ],
      items: [],
      titleModal: {
        id: 'title-modal',
        title: '',
        content: ''
      },
      modalShow: false
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
    openModal(item, index) {
      this.titleModal.title = `Row index: ${index}`;
      this.titleModal.content = JSON.stringify(item, null, 2);
      this.modalShow = true;
    },
    resetTitleModal() {
      this.titleModal.title = ''
      this.titleModal.content = ''
    },
  }
}

</script>
<style>
.custom-modal .modal-body {
  height: 50vh;
}
</style>