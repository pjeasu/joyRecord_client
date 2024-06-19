<template>
  <div id="mainCalendar">
    <div>
      {{ title }}
    </div>
    <div id="calendar" ref="calendar" style="margin:auto 20em 10em 20em"></div>

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
          return { html: `<div class="fc-event-title">${arg.event.title}</div>` };
        },
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,listWeek'
        },
        dateClick: this.dateClick,
        eventClick: this.eventClick


      });

      this.calendar.render();

    },
    /* 캘린더 날짜 클릭시, 모달 출력 */
    dateClick(info) {
      info.dayEl.style.backgroundColor = '#d8e6f9';
      this.selectedDate = info.dateStr;
      this.type = 'write'
      this.eventModal = true;
    },
    /* 등록되어 있는 이벤트 클릭시, 모달 출력  */
    eventClick(info) {
      this.type = 'view'
      this.eventModal = true;
      this.board_id = info.event.id;
    },

    /* 글(이벤트) 조회 */
    selectList() {
      this.axios.get("/board/selectBoardList", {
        params: {
          'del_yn': 'N'
        }
      }).then((res) => {
        this.items = res.data;

        this.events = this.items.map(event => ({
          title: event.title,
          start: event.joy_date,
          id: event.board_id,
          borderColor: ''
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
      console.log('child component');
      this.eventModal = false;
      this.selectList();
    }


  }
};
</script>
<style>
.fc-event-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

}

#mainCalendar a {
  text-decoration: none;
  /* 링크의 밑줄 제거 */
  color: inherit;
  /* 링크의 색상 제거 */

}
</style>