<template lang="jade">
.download
  .inner
    .imgs
      img(src='https://ws1.sinaimg.cn/large/006tNc79ly1fjs5xjcai4j30yi1pcdxx.jpg')
      img(src='https://ws2.sinaimg.cn/large/006tNc79ly1fjs5xr91fqj30yi1pcwrg.jpg')
      img(src='https://ws2.sinaimg.cn/large/006tNc79ly1fjs5xy4ekqj30yi1pc4fq.jpg')
    .buttons
      a.button(href='https://itunes.apple.com/app/id1254313928') iOS
      a.button(href='http://osxjx70im.bkt.clouddn.com/holoread-app-release.apk?attname=') Andriod
      a.button.test(href='/test') HoloNews
    .bottom-bar
</template>

<script>

export default {
  name: 'download',
  mounted () {
    try {
      const header = document.querySelectorAll('header')[0]
      header.parentNode.removeChild(header)
    } catch(e) {
      console.log(e)
    }
  }
}
</script>
<style lang="stylus" scoped>
.download
  padding 20px
  overflow scroll
  -webkit-overflow-scrolling touch
  height 100%
.inner
  height calc(100% + 1px)
.imgs
  text-align center
  -webkit-overflow-scrolling touch
  img
    width 15%
    margin 20px
.buttons
  text-align center
.button
  position relative
  display inline-block
  padding 0 10px
  margin 10px
  height 43px
  width 115px
  line-height 40px
  color #000
  background rgba(255,255,255,0.08)
  border 2px solid #3F3F3F
  box-sizing border-box
  border-radius 4px
  font-size 14px
  text-decoration none
  cursor default
  text-align center
  cursor pointer
.test
  color rgb(110, 192, 132)
  border-color rgb(110, 192, 132)
@media (max-width: 745px) {
  .imgs img {
    width 100%
    margin 0
  }
  .button {
    width 25%
  }
  .bottom-bar {
    height 100px
    content ""
  }
}
</style>
