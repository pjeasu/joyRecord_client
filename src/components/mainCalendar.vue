<template>
  <div>
    <div>
      {{ title }}
    </div>
    <div id="calendar" ref="calendar" style="margin:auto 20em 10em 20em"></div>

    <!-- 부트스트랩 모달 -->
    <b-modal v-model="modalVisible" title="날짜 선택">
      <p>선택한 날짜: {{ selectedDate }}</p>
    </b-modal>
  </div>
</template>

<script>
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

export default {
  name: 'mainCalendar',
  data() {
    return {
      title: '메인화면',
      calendar: null,
      modalVisible: false, // 모달의 표시 여부
      selectedDate: null // 선택한 날짜를 저장할 변수
    };
  },
  mounted() {
    this.initCalendar();
    console.log(this.$refs)
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
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,listWeek'
        },
        dateClick: this.dateClick


      });

      this.calendar.render();

    },
    /* 캘린더 날짜 클릭시, 모달 출력 */
    dateClick(info) {
      console.log(info)
      info.dayEl.style.backgroundColor = '#d8e6f9';

      this.modalVisible = true;
      this.selectedDate = info.dateStr;
    }

  }
};
</script>
<style scoped></style>