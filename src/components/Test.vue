<template lang="jade">
section.test
  ul
    h1 HoloRead Test Version
    li(v-for='item in list', :key='item._id', v-if='list.length')
      a(:href='item.url', target='_blank')
        .bar
          span.source {{item.source}}
          span.published {{item.published}}
        .title {{item.origin_title}}
    p.warning(b-else) Loading ...
    .next(@click='next') Next
  p.copyright © 2017 GitHub, Inc.
</template>

<script>
import config from '../config.js'
import tool from './tool'
export default {
  name: 'test',
  data () {
    return {
      params: {
        start: 0,
        count: 20
      },
      list: []
    }
  },
  methods: {
    next () {
      this.params.start += 1
      this.fetch()
    },
    fetch () {
      config.host = 'http://127.0.0.1:4000'
      axios.get(`${config.host}/api/v1/fetures/test`, {params: this.params})
      .then(result => {
        localStorage.setItem('catch', result.data.data)
        result.data.data.map(el => {
          el.published = tool.timeSinceTest(new Date(el.published))
          return el
        })
        this.list = this.list.concat(result.data.data)
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
  background #f5f5f5
  overflow-scrolling touch
  min-height 100%

  h1
    font-size 20px
  ul
    list-style none
    width 70%
    margin 0 auto
    padding 50px 0 0 0
  li
    padding 10px
    margin-bottom 20px
    background #fff
    box-shadow 0px 1px 1px #d2d2d2
  .source
    font-size 15px
    margin-right 10px
  .published
    color #7F7F7F
  .title
    font-size 17px
    margin-top 5px
  .next
    text-align center
    font-size 17px
    padding 10px 0
    cursor pointer
    background #fff
    box-shadow 0px 1px 1px #d2d2d2
  .copyright
    padding 40px 0 80px 0
    text-align center
  a
    color #000

@media (max-width: 750px) {
  ul {
    width calc(100% - 20px) !important
  }
}
</style>
