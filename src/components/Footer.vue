<template lang="jade">
footer.footer
  span © 2017 HoloNews, Inc. &nbsp
  a(href='mailto:github@ericjj.com') Feedback &nbsp
  a(href='https://t.me/joinchat/ESfcUQ0wmwbE6rpwtfCx1g') Telegram
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
    }
  },
  mounted() {
  }
}
</script>
<style lang="stylus" scoped>
.footer
  padding 30px 0 10px 0
  text-align center
  a
    color #2c3e50
</style>
