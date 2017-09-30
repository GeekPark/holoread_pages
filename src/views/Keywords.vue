<template lang="jade">
section.keywords
  .container
    .left
    ul(v-if='list.length')
      .reminder
        .cn(v-if='isTranslate') 我们对最新的300篇新闻进行分析, 关键词结果如下:
        .en(v-else) We analyze the latest 300 news, keyword results are as follows:
      li.word-li(v-for='item in list', :key='item.word', v-if='list.length', @click='unwind(item)')
        span.word {{item.word}}
        img.upwown(src='../assets/down.svg', v-if='!item.display')
        img.upwown(src='../assets/up.svg', v-else)
        ul.articles(v-show='item.display')
          li(v-for='(url, index) in item.url')
            a(:href='url', target='_blank' v-html='createHtml(item.word, item.origin_title[index])')
    .warning(v-else)
      div wait a moment ....
      div training data ....
    .right
  //- vfooter
</template>

<script>
import config from '../config.js'
import tool from '../js/tool.js'
import Footer from '@/components/Footer.vue'
import TopNews from '@/components/TopNews.vue'
export default {
  name: 'keywords',
  components: {
    'vfooter': Footer,
    'topnews': TopNews
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    isTranslate () {
      return this.$store.state.isTranslate
    }
  },
  methods: {
    createHtml (word, dom) {
      return dom.replace(word, `<span style='color: rgb(110, 192, 132)'>${word}</span>`)
    },
    unwind (word) {
      word.display = !word.display
    },
    fetch (isConcat = true) {
      axios.get(`${config.host}/api/v1/fetures/holonewswords`)
      .then(result => {
        result.data = result.data.map(el => {
          el.display = false
          return el
        })
        // result.data[0].display = true
        this.list = result.data
      }, error => {})
    }
  },
  mounted() {
    this.fetch()
  }
}
</script>
<style lang="stylus" scoped>
.keywords
  background #fff
  width 100%
  height auto
  .warning
    font-size 20px !important
    flex 5
    margin-top 20px
  .container
    display flex
    background #fff
    height calc(100% + 1px)
    .left
      flex 1
    .right
      flex 1
    .reminder
      margin-top 20px
      font-size 15px
      color #969696
      letter-spacing 1px
      font-family medium-ui-sans-serif-text-font,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif
      .count-label
        color rgb(110, 192, 132)
      // margin-bottom 20px
    ul
      flex 6
      list-style none
      margin 0 auto
      padding 30px 0 0 0
      // border-right 1px solid rgb(240, 240, 240)
    li
      padding 15px 0
      border-bottom 1px solid rgb(240, 240, 240)
      width 80%
      cursor pointer
      position relative
    .upwown
      position absolute
      right 15px
      width 15px
      user-select none
      top 20px
    .word
      user-select none
      font-size 20px
      font-family medium-content-sans-serif-font,"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif!important
    .articles
      padding-top 10px

      li
        padding 5px
        width 80%
        cursor pointer
        border none
        position relative
        padding-left 15px
      li:before
        content " "
        position absolute
        left -4px
        margin-top 6px
        width 4px
        height 4px
        border 1.5px solid rgb(110, 192, 132)
        border-radius 50%
      a
        font-size 16px
        color rgb(150, 150, 150)
        font-family medium-ui-sans-serif-text-font,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif
        line-height 22px

@media (max-width: 750px) {
  .keywords {
    height 100%
  }
  .container {
    height 100%
    overflow scroll
    -webkit-overflow-scrolling touch
  }
  .left, .right {
    display none
  }
  .reminder, .warning {
    padding 0 10px
  }
  ul {
    width calc(100% - 20px) !important
    margin 0 auto
    li {
      margin-left 10px !important
      width calc(100% - 20px) !important
    }
  }
  .word-li:last-child {
    padding-bottom 80px !important
  }
  a, li, ul {
    -webkit-tap-highlight-color transparent
    -webkit-touch-callout none
  }
}
</style>
