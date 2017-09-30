<template>
  <div id="app">
   <!-- <transition name="fade"> -->
      <vheader></vheader>
      <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus">
html, body
  width 100%
  height 100%
  margin 0
  padding 0
  overflow-x hidden

#app
  color #2c3e50
  background transparent
  height 100%
  width 100%
  font-family "Helvetica Neue", Helvetica, Arial, sans-serif

.no-touch-bg
  user-select none
  -webkit-tap-highlight-color transparent
  -webkit-touch-callout none
  -webkit-user-select none

html
  font-size 62.5%

a
  text-decoration none
  cursor pointer
.fade-enter-active, .fade-leave-active
  transition all .2s ease
.fade-enter, .fade-leave-active
  opacity 0
</style>
