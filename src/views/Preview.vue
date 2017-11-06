<template lang="jade">
#preview(v-bind:class="{ darkTheme: $route.query.theme === 'dark', fontSize1: $route.query.fontSize === '1', fontSize2: $route.query.fontSize === '2', fontSize3: $route.query.fontSize === '3' }")
  //- img.logo(src='https://ws2.sinaimg.cn/large/006tNc79ly1fl2qcrextxj308d08dmyo.jpg')
  .translate_warning(v-if='isOrigin && article.is_cn === false', @click='isOrigin = false')
    span.try 点击试试机器翻译！
    span.msg 水平有限，小心食用~
  h1.title {{isOrigin ? article.origin_title : article.edited_title}} &nbsp
    img.status-icon(:src='combineQiniu("hot.png")', v-if='article.hot')
    img.status-icon(:src='combineQiniu("recommend.png")', v-if='article.order > 0')

  p.info
    span.ago {{article.ago}}
    span |
    span.source(@click='handleSource') {{article.source}}
    span.actions
      span.r.no-touch-bg(@click="isOrigin = !isOrigin", v-if='!article.is_cn')
        img.icon(:src='originIcon')
        | {{isOrigin ? "翻译" : "原文"}}
      span.line(v-if='!article.is_cn')
      span.r.no-touch-bg(@click='handleShare', v-if='!isWechat')
        img.icon(:src='combineQiniu("share.png")')
        | 分享
      span.line(v-if='!isWechat')
      span.r.no-touch-bg(@click='handleLike', v-bind:class="{like: article.like}")
        img.icon(:src='likeIcon')
        | {{article.like ? "取消收藏" : "收藏" }}

  p
    .content(v-html='content')
    img.sougou(:src='sougouIcon')

</template>

<script>
import config from '../config.js'
import tool from '../js/tool.js'
export default {
  data () {
    return {
      article: {
        like: false,
        is_cn: false
      },
      isWechat: false,
      imgUrl: '',
      isOrigin: this.$route.query.isOrigin === 'true' ? true : false
    }
  },
  computed: {
    content () {
      return this.isOrigin ? this.article.origin_content : this.article.edited_content
    },
    likeIcon () {
      return this.article.like ? this.combineQiniu('liked.svg') : this.combineQiniu('like.png')
    },
    originIcon () {
      return this.isOrigin ? this.combineQiniu('translate.svg') : this.combineQiniu('origin.svg')
    },
    sougouIcon () {
      const {theme = 'light'} = this.$route.query
      return this.combineQiniu(`${theme}-sougou.png`)
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
      if (this.$route.query.user === undefined) {
        return
      }
      this.article.like = !this.article.like
      try {
        JSObject.like(this.article._id, this.article.like)
      } catch (e) {}
    },
    handleSource () {
      try {
        JSObject.link(this.article.url)
      } catch (e) {}
    },
    cancelTouch () {
      this.imgUrl = ''
    }
  },
  mounted() {
    function setupWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge) }
      if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
      window.WVJBCallbacks = [callback]
      var WVJBIframe = document.createElement('iframe')
      WVJBIframe.style.display = 'none'
      WVJBIframe.src = 'https://__bridge_loaded__'
      document.documentElement.appendChild(WVJBIframe)
      setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
    setupWebViewJavascriptBridge(function(bridge) {
       //注册处理
        bridge.registerHandler('JS Echo', function(data, responseCallback) {
            console.log("JS Echo called with:", data)
            responseCallback(data)
        })
        //调用处理
        bridge.callHandler('ObjC Echo', {'key':'value'}, function responseCallback(responseData) {
            console.log("JS received response:", responseData)
        })
    })
    try {
      const header = document.querySelectorAll('header')[0]
      header.parentNode.removeChild(header)
    } catch(e) {
      console.log(e)
    }
    const linkFunc = (event) => {
      if (event.target.href) {
        try {
          JSObject.link(event.target.href)
        } catch (e) {}
      }
    }

    const touchImg = (event) => {
      this.imgUrl = event.target.currentSrc
    }

    axios.get(`${config.host}/api/v1/articles/${this.$route.params.id}`, {params: {userid: this.$route.query.user}})
    .then(result => {
      console.log(result.data)
      this.article = result.data
      try { JSObject.cancelLoading() } catch (e) {}
      try { JSObject.fetch(this.article.edited_title) } catch (e) {}
      setTimeout(() => {
        Array.from(document.querySelectorAll('a')).forEach(el => {
          el.onclick = linkFunc
        })
        hiddenElements(this)
        document.title = `HOLOREAD - ${this.article.edited_title}`
      })
    }, error => {})
    this.isWechat = isWeixinBrowser()
  },
  watch: {
    'article' (value) {
      value.ago = tool.timeSince(new Date(value.published))
    },
    'isOrigin' (value) {
      try { JSObject.languageChange() } catch (e) {}
    }
  }
}

function isWeixinBrowser(){
  return /micromessenger/.test(navigator.userAgent.toLowerCase())
}

function hiddenElements(_this) {
  if (_this.article.source === 'businessinsider') {
    const el = document.querySelectorAll('#preview .content .content div')
    // el[0].style.display = 'none'
    el[el.length - 1].style.display = 'none'
    el[el.length - 4].style.display = 'none'
    console.log(el)
  }
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

  .logo
    position relative
    z-index -1
    height 0

  .tpl
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    z-index 2
    background-color white

  .img-preview
    height 100%
    position fixed
    z-index 3
    img
      width 100%
      height 100%

  .translate_warning
    width calc(100% + 24px)
    height 26px
    line-height 26px
    margin-left -12px
    margin-top -12px
    text-align center
    background-color rgba(161,221,191,1)
    font-family 'PingFangSC-Regular'
    font-size 13px
    color #fff

    .try
      margin-left -12px
      color rgba(44,181,115,1)


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
    position -webkit-sticky
    position sticky
    top -12px
    background-color #fff

  .content
    font-family 'PingFangSC-Regular'
    font-size 13px
    line-height 20px
    width 100%

    img, figure, iframe
      width 80% !important
      height auto
  .sougou
    width 50%
    margin-left 25%
    margin-top 50px
    margin-bottom 45px


  .like
    color rgba(255,137,50,1)
  a, .source
    margin 0 2px
    color rgba(44,181,115,1)
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
  .ago
    margin-right 5px
  .source
    margin-left 5px

  h3
    word-wrap: break-word;
    word-break: normal;
    font-size: 30px;

// #preview::-webkit-scrollbar
//   display:none

.darkTheme
  background-color #1e1e29
  .title
    color #8C96B4
  .content
    color #6E82A0
  .info *
    color #606476
  .info
    background-color #1e1e29 !important
  .line
    background-color rgba(96, 100, 188, 1) !important
  .translate_warning
    background-color rgba(33,80,62,1) !important

.fontSize1
  .title
    font-size 22px !important
  .content *, .info *
    font-size 15px !important
    line-height 27px
  .line
    margin 8px !important

.fontSize2
  .title
    font-size 23px !important
  .content *, .info *
    font-size 17px !important
    line-height 29px
  .line
    margin 8px !important
    height 12px !important

.fontSize3
  .title
    font-size 24px !important
  .content *, .info *
    font-size 19px !important
    line-height 31px
  .line
    margin 9px !important
    height 14px !important
@media (max-width: 640px) {
   .fontSize2 .info *, .fontSize3 .info * {
     font-size 15px !important
   }
}
</style>
