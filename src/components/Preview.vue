<template lang="jade">
#preview(v-bind:class="{ darkTheme: $route.query.theme === 'dark' , fontSize1: $route.query.fontSize === '1' , fontSize2: $route.query.fontSize === '2' , fontSize3: $route.query.fontSize === '3' }")
  h1.title {{article.edited_title}} &nbsp
    img.status-icon(:src='combineQiniu("hot.png")', v-if='article.hot')
    img.status-icon(:src='combineQiniu("recommend.png")', v-if='article.order > 0')
  p.info
    span {{article.ago}}前 | {{article.source}}
    span.r.no-touch-bg(@click="isOrigin = !isOrigin")
      img.icon(:src='combineQiniu("origin.png")')
      | 原文
    span.line
    span.r.no-touch-bg(@click='handleShare')
      img.icon(:src='combineQiniu("share.png")')
      | 分享
    span.line
    span.r.no-touch-bg(@click='handleLike', v-bind:class="{like: article.is_like}")
      img.icon(:src='likeIcon')
      | {{likeText}}

  p.content(v-html='content')

</template>

<script>
import config from '../config.js'

export default {
  data () {
    return {
      article: {
        is_like: false
      },
      isOrigin: this.$route.query.isOrigin === true ? true : false,
    }
  },
  computed: {
    content () {
      return this.isOrigin ? this.article.origin_content : this.article.edited_content
    },
    likeIcon () {
      return this.article.is_like ? this.combineQiniu('liked.png') : this.combineQiniu('like.png')
    },
    likeText () {
      return this.article.is_like ? '取消收藏' : '收藏'
    }

  },
  methods: {
    combineQiniu (path) {
      return `http://osxjx70im.bkt.clouddn.com/${path}`
    },
    handleShare () {
      try {
        JSObject.share(this.article._id)
      } catch (e) {}
    },
    handleLike () {
      this.article.is_like = !this.article.is_like
      try {
        JSObject.like(this.article._id)
      } catch (e) {}
    },
    handleLink () {
      try {
        JSObject.link(this.article.url)
      } catch (e) {}
    }
  },
  mounted() {
    axios.get(`${config.host}/api/v1/articles/${this.$route.params.id}`, {params: {user: this.$route.query.user}})
    .then(result => {
      this.article = result.data.data
      try { JSObject.cancelLoading() } catch (e) {}

    }, error => {})

  },
  watch: {
    'article' (value) {
      value.ago = timeSince(new Date(value.published))
    }
  }
}

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + "y"; //years
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + "M"; // months
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + "d"; // days
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + "h"; // hours
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + "m"; //minutes
  }
  return Math.floor(seconds) + "s"; //seconds
}
</script>

<style lang="stylus">
#preview
  padding 12px
  width calc(100% - 24px)
  color rgba(51,51,51,1)
  overflow-y scroll
  overflow-x hidden
  height 100%
  -webkit-overflow-scrolling touch

  .title
    font-family 'PingFangSC-Medium'
    font-size 21px
    line-height 31px
    float none
    text-align left
  .info
    color rgba(153,153,153,1)
    font-family 'PingFangSC-Light'
    font-size 10px
  .content
    font-family 'PingFangSC-Regular'
    font-size 13px
    line-height 20px
    width 100%

    img, figure, iframe
      width 80% !important
      height auto

  a, .like
    color rgba(255,137,50,1)
  a
    margin 0 2px
  .r
    float right
    font-size 13px
    font-family 'PingFangSC-Regular'
  .icon
    width 15px
    height 13px
    margin-right 4px
    top 1px
    position relative
  .line
    width 1px
    height 10px
    margin 4px 10px
    float right
    background-color rgba(153,153,153,1)
  .status-icon
    width 15px
    height 16px
    margin-right 5px

  h3
    word-wrap: break-word;
    word-break: normal;
    font-size: 30px;

#preview::-webkit-scrollbar
  display:none

.darkTheme
  background-color #1e1e29
  .title, .content
    color #999999
  .info *
    color #666666
  .line
    background-color #666666

.fontSize1
  .title
    font-size 20px !important
  .content *, .info *
    font-size 12px !important

.fontSize2
  .title
    font-size 21px !important
  .content *, .info *
    font-size 13px !important

.fontSize3
  .title
    font-size 22px !important
  .content *, .info *
    font-size 14px !important


</style>
