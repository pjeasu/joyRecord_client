<template>
  <div class="container mt-5">
    <div class="row">
      <!-- 첫 번째 차트 : 기간별 취미 갯수  -->
      <div class="col-md-6" style="min-height:70vh">
        <canvas ref="chart1"></canvas>
      </div>
      <!-- 두 번째 차트 : 월별 취미 갯수  -->
      <div class="col-md-6" style="height:70vh">
        <canvas ref="chart2"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  name: 'joyChart',
  data() {
    return {
      member_id: '',
      chart1: null,
      chart2: null,


      chartL_label: [],
      chartL_data: [],
      chartR_label: [],
      chartR_data: [],

    }
  },
  mounted: function () {
    //admin의 경우 멤버 전체의 분포를 볼 수 있도록
    this.member_id = localStorage.member_id == 1 ? '' : localStorage.member_id;
    this.selectListL();
  },

  methods: {
    selectListL() {
      const self = this;
      this.axios.get("/joy/selectJoyCount", {
        params: {
          'member_id': this.member_id
        }
      }).then((res) => {
        res.data.forEach((e) => {
          self.chartL_label.push(e.joy_name);
          self.chartL_data.push(e.count);
        })
      })
        .catch((error) => {
          console.error('Failed to fetch events:', error);
        })
        .finally(() => {
          this.selectListR();
        });
    },
    selectListR() {
      this.axios.get("/joy/selectJoyCountMonth", {
        params: {
          'member_id': this.member_id
        }
      }).then((res) => {
        res.data.forEach((e) => {
          this.chartR_label.push(e.month);
          this.chartR_data.push(e.count);
        })
      })
        .catch((error) => {
          console.error('Failed to fetch events:', error);
        })
        .finally(() => {
          this.initCharts();
        });
    },

    initCharts() {
      if (this.chart1) {
        this.chart1.destroy();
      }
      if (this.chart2) {
        this.chart2.destroy();
      }

      const self = this;
      const ctx1 = this.$refs.chart1.getContext("2d");
      const ctx2 = this.$refs.chart2.getContext("2d");

      this.chart1 = new Chart(ctx1, {
        type: "doughnut",
        data: {
          labels: self.chartL_label,
          datasets: [
            {
              data: self.chartL_data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: '올 한해 취미 분포',
              font: {
                weight: 700,
                size: 22,
              },
            }
          }
        },
      });

      this.chart2 = new Chart(ctx2, {
        type: "line",
        data: {
          labels: self.chartR_label,
          datasets: [
            {
              label: "조이(게시물) 갯수",
              data: self.chartR_data,
              backgroundColor: [
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: '올 한해 월별 게시글 분포',
              font: {
                weight: 700,
                size: 22,
              },
            }
          }
        },
      });
    }

  },





}

</script>