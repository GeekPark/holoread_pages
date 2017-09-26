<template lang="jade">
section.source
  .container
    vsider(:propsType='propsType')
    ul
      .logo(@click='cleanData')
        router-link(to='/test')
          p HoloRead Test Version
        div
          img(:src='qiniu(params.source)', v-if='params.source')
          span(v-if='params.source') {{params.source}}
      li(v-for='item in list', :key='item._id', v-if='list.length')
          a(:href='item.url', target='_blank').title {{item.origin_title}}
          .bar
            span.published {{item.published}}
      p.warning(v-else) Loading ...
      .next(@click='next') Next
    vright
  //- p.copyright © 2017 HoloRead, Inc.
</template>

<script>
import config from '../config.js'
import tool from '../js/tool.js'
import Sider from '@/components/Sider.vue'
import Right from '@/components/Right.vue'

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
    qiniu (item) {
      return `${config.qiniu}/app/icon/${item}.png`
    },
    fetch (isConcat = true) {
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
    this.params.source = this.$route.params.s
    this.fetch()
  }
}
</script>
<style lang="stylus" scoped>
.source
  background #f5f5f5
  overflow scroll
  -webkit-overflow-scrolling touch
  height 100%
  .copyright
    padding 40px 0 40px 0
    text-align center

  .container
    background #f5f5f5
    overflow-scrolling touch
    min-height 100%
    display flex
    height calc(100% + 1px)

    .logo
      font-size 30px
      margin-bottom 20px
      cursor pointer
      span
        line-height 30px
        vertical-align top
        margin-left 10px
        font-size 15px
      img
        width 30px
        height 30px
        border-radius 15px
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
      color rgba(0, 0, 0, .8) !important
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

@media (max-width: 750px) {
  ul {
    width calc(100% - 10px) !important
    flex 5
  }
}
</style>
