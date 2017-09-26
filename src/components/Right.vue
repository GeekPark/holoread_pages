<template lang="jade">
section.ad
  //- ul
  //-   li(v-for='item in display')
  //-     a(:href='item[1]', target='_blank')
  //-       img(:src='item[0]')
  //-   p 广告
</template>

<script>
import config from '../config.js'
import tool from '../js/tool.js'
import ad from '../js/ad.js'
export default {
  name: 'ad',
  data () {
    return {
      display: ad
    }
  },
  mounted() {
    // this.fetch()
  }
}
</script>
<style lang="stylus" scoped>
.ad
  flex 1
  padding-top 110px
  margin-left 20px
  ul
    margin 0
    padding 0
    list-style none
  img
    width 100%
  p
    text-align center
</style>
