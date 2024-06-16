<template>
  <div>
    {{ title }}
  </div>


  <div class="container">
    <h1 style="line-height:200%; ">JoyRecord</h1>
    <div class="section">
      <h3>사이트 개요</h3>
      <p>JoyRecord는 사용자가 감상한 영화, 드라마, 플레이한 게임, 시청 혹은 단관한 스포츠 경기를 손쉽게 기록하고, 이를 되돌아보며 추억할 수 있는 플랫폼입니다.</p>
    </div>
    <div class="section">
      <h2>주요 기능</h2>
      <ul style="list-style: none; ">
        <li>
          <h3>1. 기록하기</h3>
          <ul>
            <li><strong>영화 및 드라마:</strong> 제목, 감독/프로듀서, 장르, 감상 날짜, 별점, 리뷰 등을 기록.</li>
            <li><strong>게임:</strong> 제목, 개발사, 장르, 플레이 기간, 별점, 리뷰 등을 기록.</li>
            <li><strong>스포츠 경기:</strong> 경기명, 팀/선수, 경기 날짜, 경기 장소, 결과, 별점, 감상평 등을 기록.</li>
          </ul>
        </li>
        <li>
          <h3>2. 분석 및 통계</h3>
          <p>사용자의 기록을 시각화하여 통계 자료 제공 (예: 감상한 영화 수, 평점 분포 등).</p>
        </li>
        <li>
          <h3>3. 일정 관리</h3>
          <ul>
            <li>감상 예정인 영화, 드라마, 게임, 스포츠 경기를 등록하고, 리마인더 설정.</li>
            <li>캘린더 기능을 통해 감상 일정을 한눈에 확인.</li>
          </ul>
        </li>
        <li>
          <h3>4. 개인화된 프로필</h3>
          <ul>
            <li>사용자는 자신의 프로필 페이지에 감상 기록을 정리하고, 자신만의 취향을 표현할 수 있음.</li>
            <li>개인화된 다이어리 기능을 통해 특정 기간의 감상 기록을 모아볼 수 있음.</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="section">
      <h2>추가 기능</h2>
      <ul>
        <li>다양한 플랫폼 지원: 웹과 모바일 앱을 통해 언제 어디서나 기록 가능.</li>
        <li>관리자 페이지</li>
      </ul>
    </div>
    <div class="section">
      <h2>사이트의 장점</h2>
      <ul>
        <li>편리한 인터페이스: 직관적이고 사용하기 쉬운 인터페이스를 통해 빠르고 쉽게 기록할 수 있음.</li>
        <li>데이터 시각화: 사용자의 감상 기록을 다양한 차트와 그래프로 시각화하여 쉽게 이해할 수 있음.</li>
      </ul>
    </div>
    <br />
    <p>JoyRecord는 사용자 개개인의 감상 경험을 체계적으로 관리하고, 이를 통해 더 풍부한 문화생활을 누릴 수 있도록 돕는 플랫폼입니다.</p>
  </div>

</template>
<script>
export default {
  name: 'joyRecordInfo',
  props: {
  },
  data() {
    return {
      title: 'joyRecordInfo'
    }

  },
  mounted: function () {
  },
  methods: {

  }
}

</script>
<style scoped>
.container {
  font-family: NanumGothic;
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
  line-height: 3em;


}

h1,
h2,
h3 {
  color: #333;
  font-weight: 700;
}

h1 {
  font-family: NanumGothicBold;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
}

.section {
  margin-bottom: 20px;
}
</style>