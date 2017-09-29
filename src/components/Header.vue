<template lang="jade">
header.header
  a(@click='onClick("/test")').logo
    span Holo
    span News
  .items
    a.list(v-for='item in items', v-bind:class="{ active: isActive === item[0] }", v-on:click.stop='onClick(item[0])')
      span(v-on:click.stop='onClick(item[0])') {{item[1]}}
      span.bottom-line
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      isActive: '/test',
      items: [['/test', 'READING LIST'],
              ['/test?translate=true', 'SOUGOU TRANSLATE'],
              ['/keywords', 'KEYWORDS'],
              ['/todo', 'TODO']]
    }
  },
  methods: {
    onClick (url) {
      console.log(url)
      this.isActive = url
      this.$router.push(url)
    }
  },
  mounted() {
  }
}
</script>
<style lang="stylus" scoped>
@font-face {
  font-family "Caslon"
  src url("../assets/Adobe Caslon Pro Regular.ttf") format("truetype")
  font-style normal
  font-weight normal
}

.s
  color rgb(110, 192, 132)
.active
  .bottom-line
    background-color #3F3F3F
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
    font-family 'Caslon'
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
        width 100%
        height 1.5px
        background-color #fff
        position absolute
        bottom -18px
        left 0
        transition background-color 0.5s
    a:hover, .active
      .bottom-line
        background-color #3F3F3F
  a, .items
    cursor pointer
    color rgb(58, 58, 58)
@media (max-width: 750px) {
.header .items {
    flex 3
    margin-left 10px
  }
}
</style>
