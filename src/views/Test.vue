<template lang="jade">
section.test
  vheader(:refresh='refresh')
  .container
    .left
    ul
      li(v-for='item in list', :key='item._id', v-if='list.length')
        .li-left
          a(:href='item.url', target='_blank').title {{item.origin_title}}
          .abstract {{item.origin_content}}
          .bar
            img(:src='item.avatar')
            .info
              .source(@click='otherSource(item.source)') {{item.source}}
              .published {{item.published}}
        .li-right
          img(:src='item.cover', onerror='this.parentNode.removeChild(this)')
      p.warning(v-else) Loading ...
      .next(@click='next') Next
    .right
      topnews(:list='list')
  //- vfooter
</template>

<script>
import config from '../config.js'
import tool from '../js/tool.js'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import TopNews from '@/components/TopNews.vue'
const defaultParams = {
  start: 0,
  count: 30
}

export default {
  name: 'test',
  components: {
    'vfooter': Footer,
    'vheader': Header,
    'topnews': TopNews
  },
  data () {
    return {
      params: defaultParams,
      list: []
    }
  },
  methods: {
    next () {
      this.params.start += 1
      this.fetch()
    },
    otherSource (s) {
      this.params.source = s
      this.fetch(false)
    },
    refresh () {
      delete this.params.source
      this.fetch(false)
    },
    fetch (isConcat = true) {
      axios.get(`${config.host}/api/v1/fetures/test`, {params: this.params})
      .then(result => {
        localStorage.setItem('catch', result.data.data)
        result.data.data.map(el => {
          el.published = tool.timeSinceTest(new Date(el.published))
          el.avatar = `${config.qiniu}/app/icon/${el.source}.png`
          el.origin_title = el.origin_title.replace('&#8217;', '\'')
          if (el.origin_content.startsWith('b\'')) {
            el.origin_content = el.origin_content.replace('b\'', '')
          }
          return el
        })
        this.list = isConcat ? this.list.concat(result.data.data) : result.data.data
      }, error => {})
    }
  },
  mounted() {
    this.fetch()
  }
}
</script>
<style lang="stylus" scoped>
.test
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
    li
      padding 20px 0 10px 0
      border-bottom 1px solid rgb(240, 240, 240)
      width 80%
      display flex
    .li-left
      flex 8
    .li-right
      flex 1
      img
        width 100%
        height auto
    .bar
      margin-top 3px
      display flex
    img
      width 30px
      height 30px
      // border-radius 15px
      margin 10px 10px 10px 0
    .abstract
      font-family medium-ui-sans-serif-text-font,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif
      color rgb(197, 197, 197)
      font-size 16px
      margin-top 8px
      line-height 20px
      letter-spacing 0.4px
    .info
      margin-top 6px
    .source
      font-size 15px
      color rgb(110, 192, 132)
      cursor pointer
      border-bottom 1px solid #fff
      margin 5px
      display inline
    .published
      font-size 13px
      color rgba(0, 0, 0, .4) !important
      margin 5px
    .title
      font-size 20px
      font-family medium-content-sans-serif-font,"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif!important
    .next
      text-align center
      font-size 17px
      padding 20px 0
      cursor pointer
    a
      color #000
    .source:hover
      border-bottom 1px solid rgb(110, 192, 132)

@media (max-width: 750px) {
  .test {
    overflow scroll
    -webkit-overflow-scrolling touch
    height 100%
  }
  .left, .right {
    display none
  }
  ul {
    width calc(100% - 20px) !important
    margin 0 auto
    li {
      margin-left 10px !important
      width calc(100% - 20px) !important
    }
  }
}
</style>
