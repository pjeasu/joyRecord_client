<template>
  <div id="app">
    <mainHeader></mainHeader>




    <router-view></router-view>
  </div>
</template>

<script>

import mainHeader from './components/mainHeader.vue'
export default {
  name: 'App',
  components: {
    mainHeader
  },
  methods: {

  }
}
</script>

<style>
#app {
  height: 100vh;
  font-family: NanumGothic !important;
  text-align: center;
  color: #2c3e50;
  background-color: #FAF7EB
}

a {
  text-decoration-line: none !important;
  color: #2c3e50 !important;
}

.header {
  font-size: 20px
}

@font-face {
  font-family: 'NanumGothic';
  src: local(※),
    url('./assets/fonts/NanumGothic.otf') format('opentype'),
    url('./assets/fonts/NanumGothic.ttf') format('truetype');
  font-weight: 400;

}

@font-face {
  font-family: 'NanumGothicBold';
  src: url('./assets/fonts/NanumGothicBold.otf') format('opentype'),
    url('./assets/fonts/NanumGothicBold.ttf') format('truetype');
  font-weight: 500;
}

@font-face {
  font-family: 'NanumGothicExtraBold';
  src: url('./assets/fonts/NanumGothicExtraBold.ttf') format('truetype');
  font-weight: 700;
}

@font-face {
  font-family: 'DungGeunMo';
  src: url('./assets/fonts/DungGeunMo.otf') format('opentype');
}
</style>
