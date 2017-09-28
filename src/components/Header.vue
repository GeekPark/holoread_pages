<template lang="jade">
header.header
  router-link(to='/test').logo
    span(@click='onClick') HoloNews
  .items
    router-link(to='/test').list
      span(@click='onClick') READING LIST
      span.bottom-line
    a.list
      span(@click='sogou') SOUGOU TRANSLATE
      span.bottom-line
    router-link(to='/todo').list
      span TODO
      span.bottom-line
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
    }
  },
  props: ['refresh'],
  methods: {
    onClick () {
      delete this.$route.query.translate
      this.refresh && this.refresh()
    },
    sogou () {
      this.$router.push('/test?translate=true')
    }
  },
  mounted() {
  }
}
</script>
<style lang="stylus" scoped>
.header
  display flex
  border-bottom 1px solid rgb(240, 240, 240)
  color rgb(58, 58, 58)
  background-color #fff
  .logo
    padding 10px 0
    padding-left 20px
    font-size 25px
    flex 1
    font-weight 800
  .items
    flex 7
    margin-left -20px
    display flex
    align-items center
    font-family medium-ui-sans-serif-text-font,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
    a
      margin-right 20px
      position relative
      .bottom-line
        display none
        width 100%
        height 1px
        background-color #3F3F3F
        position absolute
        bottom -18px
        left 0
    a:hover
      .bottom-line
        display block
  a
    cursor pointer
    color rgb(58, 58, 58)
@media (max-width: 750px) {
.header .items {
    flex 3
    margin-left 10px
  }
}
</style>
