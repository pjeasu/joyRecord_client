<template>
  <div>
    <h1>
      {{ title }}
    </h1>
  </div>
</template>


<script>
export default {
  name: 'notFound',
  props: {
  },
  data() {
    return {
      title: '페이지를 찾을 수 없습니다.'
    }

  },
  mounted: function () {
  },
  methods: {

  }
}
</script>