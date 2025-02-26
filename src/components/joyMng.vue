<template>
  <b-container class="mt-5" style="min-height:40em;">
    <div id="page-title">
      <h2>{{ title }}</h2>
    </div>
    <b-table hover class="align-middle" :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage">
      <template #cell(detail)="row">
        <b-button variant="link" size="sm" @click="openModal(row.item)" class="mr-1"
          style="color:black; font-size:1rem;">
          {{ row.value }}
        </b-button>

      </template>

    </b-table>
    <div class="float-end">
      <b-button @click="openModal('new')" size="sm" type="button" variant="secondary">취미 추가</b-button>
    </div>
    <b-pagination size="sm" :align="'center'" v-model="currentPage" :total-rows="rows" :per-page="perPage"
      aria-controls="my-table" first-text="<<" prev-text="<" next-text=">" last-text=">>" class="mt-4"></b-pagination>
  </b-container>

  <JoyModal v-model="joyModal" :type="type" :joyData="joyData" @closeModal="close" />

</template>
<script>
import JoyModal from './modal/joyModal.vue';
export default {
  name: 'joyMng',
  components: {
    JoyModal
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  data() {
    return {
      title: '취미관리',
      name: 'joyMng',
      joyModal: false, // 모달의 표시 여부
      searchText: '',
      type: '',
      fields: [
        {
          key: 'joy_id',
          label: '번호',
          sortable: true
        },
        {
          key: 'joy_name',
          label: '취미',
          sortable: false
        },
        {
          key: 'detail',
          label: '세부설명',
          tdAttr: { 'class': 'text-start' },
          sortable: true
        },
        {
          key: 'del_yn',
          label: '삭제여부',
          sortable: true
        }

      ],
      perPage: 10, // 한 페이지당 글 개수
      currentPage: 1, // 현재 페이지 
      board_id: '',
      items: [],
      joyData: {}, // 모달로 전달할 데이터 
    }

  },
  mounted: function () {
    this.selectJoyList();
  },
  methods: {
    /* 취미 목록 조회  */
    selectJoyList() {
      this.axios.get("/joy/selectJoyList", {
        params: {

        }
      })
        .then((res) => {
          this.items = res.data;

        })
        .catch((error) => {
          console.log(error);
        })
    },

    openModal(item) {
      this.joyData = item;
      if (item === 'new') {
        this.type = 'write';
      } else {
        this.type = 'edit';
      }
      this.joyModal = true;
    },
    close() {
      this.joyModal = false;
      this.selectJoyList();
    },

  }
}

</script>