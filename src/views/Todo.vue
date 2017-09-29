<template lang="jade">
section.todo
  .container
    .left
    ul
      li(v-for='(item, index) in list') {{index + 1}}. {{item}}
    .right
</template>

<script>
import Footer from '@/components/Footer.vue'
import TopNews from '@/components/TopNews.vue'
export default {
  data () {
    return {
      list: ['[x] Abstract', 'Search']
    }
  },
  components: {
    'vfooter': Footer,
    'topnews': TopNews
  },
  mounted() {
  }
}
</script>
<style lang="stylus" scoped>
.todo
  background #fff
  width 100%
  height auto
  .container
    display flex
    background #fff
    height calc(100% + 1px)
    .left
      flex 1
    .right
      flex 2
      background rgb(250, 250, 250)
    ul
      flex 5
      list-style none
      margin 0 auto
      padding 30px 0 0 0
      border-right 1px solid rgb(240, 240, 240)
      font-size 20px
</style>
