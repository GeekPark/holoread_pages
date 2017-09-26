<template lang="jade">
section.test
  .container
    ul
      .logo(@click='cleanData') HoloRead Test Version
      li(v-for='item in list', :key='item._id', v-if='list.length')
        a(:href='item.url', target='_blank').title {{item.origin_title}}
        .abstract {{item.origin_content}}
        .bar
          span.source(@click='otherSource(item.source)') {{item.source}}
          span.published {{item.published}}
      p.warning(v-else) Loading ...
      .next(@click='next') Next
  p.copyright
    span © 2017 HoloRead, Inc. &nbsp
    a(href='mailto:github@ericjj.com') Feedback
</template>

<script>
import config from '../config.js'
import tool from '../js/tool.js'
import Sider from './Sider.vue'
import Right from './Right.vue'

const defaultParams = {
  start: 0,
  count: 30
}

export default {
  name: 'test',
  components: {
    'vsider': Sider,
    'vright': Right
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
      this.$router.push(`source/${s}`)
    },
    fetch (isConcat = true) {
      // config.host = 'http://127.0.0.1:4000'
      axios.get(`${config.host}/api/v1/fetures/test`, {params: this.params})
      .then(result => {
        localStorage.setItem('catch', result.data.data)
        result.data.data.map(el => {
          el.published = tool.timeSinceTest(new Date(el.published))
          return el
        })
        this.list = isConcat ? this.list.concat(result.data.data) : result.data.data
      }, error => {})
    },
    cleanData () {
      delete this.params.source
      this.params = defaultParams
      this.fetch(false)
    }
  },
  mounted() {
    this.fetch()
  }
}
</script>
<style lang="stylus" scoped>
.test
  background #f5f5f5
  overflow scroll
  -webkit-overflow-scrolling touch
  height 100%

  .copyright
    padding 40px 0 40px 0
    text-align center
  a
    color #2c3e50

  .container
    background #f5f5f5
    height calc(100% + 1px)


    .logo
      font-size 30px
      margin-bottom 40px
      cursor pointer
    ul
      background #f5f5f5
      flex 1
      list-style none
      margin 0 auto
      padding 30px 0 0 0
      width 60%
    li
      padding 10px
      margin-bottom 10px
      background #fff
      box-shadow 0px 1px 1px #d2d2d2
    .bar
      margin-top 3px
    .source
      font-size 15px
      margin-right 10px
      color rgba(0, 0, 0, .8) !important
      cursor pointer
    .abstract
      font-family medium-ui-sans-serif-text-font,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif
      color rgba(0, 0, 0, .4) !important
      font-size 14px
    .published
      font-size 13px
      color rgba(0, 0, 0, .4) !important
    .title
      font-size 20px
      margin-top 5px
      font-family medium-content-sans-serif-font,"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif!important
    .next
      text-align center
      font-size 17px
      padding 10px 0
      cursor pointer
      background #fff
      box-shadow 0px 1px 1px #d2d2d2
    a
      color #000
    .source:hover
      border-bottom 1px solid #7F7F7F

@media (max-width: 750px) {
  ul {
    width calc(100% - 10px) !important
  }
}
</style>
