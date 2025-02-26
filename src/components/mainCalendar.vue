<template>
  <div id="mainCalendar">
    <div id="calendar" ref="calendar" ></div>

    <!-- 글 상세보기 / 글쓰기 모달 -->
    <EventModal v-model="eventModal" :type="type" :board_id="board_id" :selectedDate="selectedDate"
      @closeModal="close" />


  </div>
</template>

<script>
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import EventModal from './modal/eventModal.vue';

export default {
  name: 'mainCalendar',
  components: {
    EventModal
  },
  data() {
    return {
      title: '메인화면',
      calendar: null,
      eventModal: false, // 모달의 표시 여부
      type: '',
      selectedDate: '', // 선택한 날짜를 저장할 변수
      events: [], // 캘린더에 바인딩될 이벤트(글) 리스트
      board_id: '',

    }


  },
  mounted() {
    this.selectList();

  },
  unmounted() {
    this.events = [];

  },
  methods: {
    /* 캘린더 생성 */
    initCalendar() {
      const calendarEl = document.getElementById('calendar');
      this.calendar = new Calendar(calendarEl, {
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5',
        locale: 'ko',
        events: this.events,
        eventContent: function (arg) {
          return { html: `<div class="fc-event-title" style="border-radius: 0.5em; background-color:${arg.event.backgroundColor}">${arg.event.title}</div>` };
        },
        customButtons: {
          mainList: {
            text: 'LIST',
            style: 'font-family : DungGeunMo',
            click: this.toMainList
          },
          today: {
            text: 'TODAY'
          },
        },
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'mainList'
        },
        dateClick: this.dateClick,
        eventClick: this.eventClick


      });

      this.calendar.render();

    },
    /* 캘린더 날짜 클릭시, 모달 출력 */
    dateClick(info) {
      this.selectedDate = '';

      this.selectedDate = info.dateStr;
      this.type = 'write'
      this.eventModal = true;

    },
    /* 등록되어 있는 이벤트 클릭시, 모달 출력  */
    eventClick(info) {
      this.type = 'view';
      this.eventModal = true;
      this.board_id = info.event.id;
    },

    /* 글(이벤트) 조회 */
    selectList() {
      const memberId = localStorage.member_id;
      this.axios.get("/board/selectBoardCalList", {
        params: {
          'del_yn': 'N',
          'member_id': memberId
        }
      }).then((res) => {
        this.items = res.data;

        this.events = this.items.map(event => ({
          title: event.title,
          start: event.joy_date,
          id: event.board_id,
          color: event.color ? event.color : '#B4D7C2'
        }));

      })
        .catch((error) => {
          console.error('Failed to fetch events:', error);
        })
        .finally(() => {
          // 캘린더 생성
          this.initCalendar();
        });

    },
    close() {
      this.eventModal = false;
      this.selectList();
    },
    toMainList() {
      this.$router.push({
        name: 'mainList'
      })
    }


  }
};
</script>
<style>
/* .fc-event-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

} */

/* 캘린더 상단 버튼 */
.fc .fc-button-primary {
  background-color: #FFD6B1;
  border-color: #FFD6B1;
  color: #ffffff;
  font-family: 'DungGeunMo';
}

.fc .fc-button-primary:hover {
  background-color: #fbc99d;
  border-color: #fbc99d;
  color: #ffffff;
}


.fc .fc-button-primary:disabled {
  background-color: #9a9a9a;
  border-color: #9a9a9a;
}

.fc .fc-button-primary:not(:disabled).fc-button-active,
.fc .fc-button-primary:not(:disabled):active {
  background-color: #f6ba86;
  border-color: #f6ba86;
  color: #ffffff;
}


#mainCalendar a {
  text-decoration: none;
  /* 링크의 밑줄 제거 */
  color: inherit;
  /* 링크의 색상 제거 */

}

/* 캘린더 배경  */
.fc-view-harness {
  background-color: rgba(255, 255, 255, 0.45);
}

/* 오늘 날짜 */
.fc-day-today {
  background-color: rgb(255, 214, 177, 0.4) !important;
}

.fc-toolbar-title {
  font-weight: 700;
  padding-right: 4em;
  font-family: DungGeunMo
}

/* .fc-daygrid-dot-event.fc-event-mirror,
.fc-daygrid-dot-event {
  background-color: #f6ba86
} */

#calendar{
  margin:0 auto; 
  max-height:80vh; 
  max-width:70vw
}

/* 화면 너비가 768px 이하일 때 (모바일/태블릿용) */
@media screen and (max-width: 768px) {

  #calendar{
    height:80vh; 
    max-height:80vh; 
    width:98vw; 
    max-width:99vw
  }

  .fc-toolbar-title {
    font-weight: 500;
    font-size: 1.5em;
    padding-right: 1em;
  }
    .fc .fc-button-primary {
    font-size : 1em;
  }

}

</style>