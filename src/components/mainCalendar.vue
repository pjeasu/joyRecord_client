<template>
  <div>
    {{ title }}
  </div>
  <div id="calendar" style="margin:auto 20em 10em 20em"></div>

</template>

<script>

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

export default {
  name: 'mainCalendar',
  props: {
  },
  data() {
    return {
      title: '메인화면'
    }

  },
  mounted: function () {
    this.initCalendar();
  },
  methods: {
    /* 캘린더 생성 */
    initCalendar() {
      let calendarEl = document.getElementById('calendar');
      let calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5',
        locale: 'ko',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,listWeek'
        }
      });
      calendar.render();
    }

  }
}




</script>
