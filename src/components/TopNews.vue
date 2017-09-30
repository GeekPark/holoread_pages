<template lang="jade">
section.top-views
  div TOP VIEWS
  ul
    li(v-for='(item, index) in display')
      .index {{index + 1}}
      a(:href='item.url', target='_blank')
        .title  {{isTranslate ? item.edited_title : item.origin_title}}
    .others
      //- span © 2017 GeekPark
      a(href='mailto:github@ericjj.com') Contact
      a(href='https://t.me/joinchat/ESfcUQ0wmwbE6rpwtfCx1g', target='_blank') Telegram Group
</template>

<script>
export default {
  name: 'topviews',
  props: ['list'],
  computed: {
    display () {
      if (this.list.length > 5) {
        return this.list.slice(0, 5)
      }
      return this.list
    },
    isTranslate () {
      return this.$store.state.isTranslate
    }
  },
  mounted() {
    // this.fetch()
  }
}
</script>
<style lang="stylus" scoped>
.top-views
  width calc(100% - 40px)
  padding 20px
  a
    color #000
    font-family medium-content-sans-serif-font,"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif
  ul
    list-style none
    padding 0
    li
      display flex
      padding 5px 0
      align-items center
      font-family medium-content-sans-serif-font,"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif
      font-size 14px
      line-height 22px
      .index
        margin-right 20px
        position relative
        z-index 2
        color #000
        width 20px
        height 20px
        background #fff
      .index:before
        width 20px
        height 20px
        content ''
        position absolute
        z-index -1
        top 0
        left 0
        background #fff
      .title
        border-bottom 1px solid rgb(240, 240, 240)
        padding 7px 0
        cursor pointer
    .others
      text-align center
      margin-top 50px
      color rgba(0,0,0,0.4)
      a
        color rgba(0,0,0,0.4)
      *
        margin 0 5px

</style>
