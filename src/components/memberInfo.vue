<template>
  <div style="padding: 1em; font-weight: bolder; color: darkslategrey">
    {{ title }}
  </div>
  <div>

  </div>
</template>
<script>

export default {
  name: 'memberInfo',
  props: {},
  data() {
    return {
      title: 'memberInfo',
      user_id: '',
      password: '',
      param: {}
    }
  },
  mounted: function () {
    console.log(localStorage)
  },
  methods: {
  },
  computed: {

  }
}
</script>
