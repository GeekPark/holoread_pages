<template lang="jade">
section.test
  .container
    vsider(:propsType='propsType')
    ul
      .logo(@click='cleanData') HoloRead Test Version
      li(v-for='item in list', :key='item._id', v-if='list.length')
        a(:href='item.url', target='_blank')
          .title {{item.origin_title}}
          .bar
            span.source {{item.source}}
            span.published {{item.published}}
      p.warning(v-else) Loading ...
      .next(@click='next') Next
    vright
  p.copyright © 2017 HoloRead, Inc.
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
    propsType (t) {
      this.params.start = 0
      this.params.source = t
      this.fetch(false)
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
  .copyright
    padding 40px 0 40px 0
    text-align center

.container
  background #f5f5f5
  overflow-scrolling touch
  min-height 100%
  display flex

  .logo
    font-size 30px
    margin-bottom 40px
    cursor pointer
  ul
    flex 3
    list-style none
    margin 0 auto
    padding 30px 0 0 0
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
  .published
    font-size 13px
  .published, .source
    color #7F7F7F
  .title
    font-size 20px
    margin-top 5px
  .next
    text-align center
    font-size 17px
    padding 10px 0
    cursor pointer
    background #fff
    box-shadow 0px 1px 1px #d2d2d2
  a
    color #000

@media (max-width: 750px) {
  ul {
    width calc(100% - 20px) !important
  }
}
</style>
