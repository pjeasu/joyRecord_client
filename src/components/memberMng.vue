<template>
  <b-container class="mt-5" style="min-height:40em;">
    <div id="page-title">
      <h2>{{ title }}</h2>
    </div>
    <b-table hover class="align-middle" :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage">
      <template #cell(user_id)="row">
        <b-button variant="link" size="sm" @click="openModal(row.item)" class="mr-1"
          style="color:black; font-size:1rem;">
          {{ row.value }}
        </b-button>
      </template>
    </b-table>
    <b-pagination size="sm" :align="'center'" v-model="currentPage" :total-rows="rows" :per-page="perPage"
      aria-controls="my-table" first-text="<<" prev-text="<" next-text=">" last-text=">>" class="mt-4"></b-pagination>
  </b-container>

  <b-modal id="memberModal" title="회원 탈퇴" v-model="memberModal" centered hide-footer>
    <div>
      <h5>{{ memberData.user_id }}</h5>
      <p>해당 회원을 탈퇴 처리 하겠습니까?</p>
    </div>

    <div style="position:absolute; bottom:1em; right:1em">
      <b-button class="mt-2 modal-button" block @click="saveData()">예</b-button>
      <b-button class="mt-2 modal-button" block @click="closeModal()">아니오</b-button>
    </div>

  </b-modal>

</template>
<script>
export default {
  name: 'memberMng',
  components: {
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  data() {
    return {
      title: '회원관리',
      memberModal: false, // 모달의 표시 여부
      searchText: '',
      type: '',
      fields: [
        {
          key: 'member_id',
          label: '번호',
          sortable: true
        },
        {
          key: 'user_id',
          label: '아이디',
          sortable: false
        },
        {
          key: 'user_name',
          label: '이름',
          sortable: true
        },
        {
          key: 'email',
          label: '이메일',
          sortable: true
        },
        {
          key: 'del_yn',
          label: '탈퇴여부',
          sortable: true
        }

      ],
      perPage: 10, // 한 페이지당 글 개수
      currentPage: 1, // 현재 페이지 
      board_id: '',
      items: [],
      memberData: {}, // 모달로 전달할 데이터 
    }

  },
  mounted: function () {
    this.selectMemberList();
  },
  methods: {
    /* 회원 목록 조회  */
    selectMemberList() {
      this.axios.get("/admin/selectMemberList", {
        params: {}
      })
        .then((res) => {
          this.items = res.data;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    saveData() {
      const self = this;
      this.axios.put('/admin/deleteMember', { member_id: this.memberData.member_id }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (res) {
          if (res.data.result > 0) {
            alert('탈퇴처리가 완료되었습니다.');
            self.closeModal();
          }
        }).catch(function (error) {
          // 오류발생시 실행
          console.log(error)
        });

    },

    openModal(item) {
      this.memberData = item;
      console.log(item)
      this.memberModal = true;
    },
    closeModal() {
      this.memberModal = false;
      this.selectMemberList();
    },

  }
}

</script>
<style>
#memberModal .modal-body {
  min-height: 10em;
}

#memberModal.modal {
  --bs-modal-bg: #dedede;
  --bs-modal-border-color: none;

}
</style>