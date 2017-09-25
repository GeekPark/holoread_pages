<template lang="jade">
section.sider
  ul
    li(v-for='item in display', @click='changeType(item)')
      img(:src='qiniu(item)')
      span {{item}}
    span.more(@click='moreSource') more
</template>

<script>
import config from '../config.js'
import tool from '../js/tool.js'
import sources from '../js/sources.js'
export default {
  name: 'sider',
  data () {
    return {
      display: sources.slice(0, 10)
    }
  },
  props: ['propsType'],
  methods: {
    moreSource () {
      this.display = sources
    },
    qiniu (item) {
      return `http://osxjx70im.bkt.clouddn.com/app/icon/${item}.png`
    },
    changeType (t) {
      this.propsType(t)
    }
  },
  mounted() {
    // this.fetch()
  }
}
</script>
<style lang="stylus" scoped>
.sider
  flex 1
  padding-top 100px
  ul
    list-style none
    li
      margin 10px 0
      cursor pointer
      span
        line-height 30px
        vertical-align top
        margin-left 10px
        font-size 14px
      img
        width 30px
        height 30px
        border-radius 15px
    .more
      cursor pointer
      margin-left 40px
      padding-bottom 2px
    .more:hover
      border-bottom 1px solid #BFBFBF
</style>
