<template lang="jade">
section.rss
  .container
    .left
    .content
      .form
        input.form__field(type='email', placeholder='Your E-Mail Address')
        button.btn.btn--primary.btn--inside.uppercase(type='button', @click.stop='sendEmail') Send
      .telegram
        p There is a robot in Telegram
        p Send '/news'  to
          a(href='https://telegram.me/HoloNewsBot', target='_blank') HoloNewsBot
        p Then you get the latest news:
        img(src='https://ws3.sinaimg.cn/large/006tKfTcly1fk1hpb63zuj30kf0pgq7a.jpg')
    .right
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    sendEmail () {
      console.log('send email')
      alert('success')
    }
  },
  mounted() {
  }
}
</script>
<style lang="stylus" scoped>
//** variables
$background=#f5f6fa
$text=#9c9c9c
$input-bg-color=#fff
$input-text-color=#a3a3a3
$button-bg-color=#6ec084
$button-text-color=#fff

//** button
.btn {
  display: inline-block;
  background: transparent;
  color: inherit;
  font: inherit;
  border: 0;
  outline: 0;
  padding: 0;
  transition: all 200ms ease-in;
  cursor: pointer;

  &--primary {
    background: $button-bg-color;
    color: $button-text-color;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, .1);
    border-radius: 2px;
    padding: 12px 36px;

    &:hover {
      background: darken($button-bg-color, 4%);
    }

    &:active {
      background: $button-bg-color;
      box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, .2);
    }
  }

  &--inside {
    margin-left: -96px;
  }
}

//** form
.form {
  &__field {
    width: 360px;
    background: #fff;
    color: $input-text-color;
    font: inherit;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0 , .1);
    border: 0;
    outline: 0;
    padding: 22px 18px;
  }
}
.rss
  background #fff
  width 100%
  height calc(100% - 60px)
  .container
    display flex
    background #fff
    height calc(100% + 1px)
    .left
      flex 1
    .right
      flex 2
    .content
      flex 5
      height 100%
      font-size 20px
      font-family font-family medium-ui-sans-serif-text-font,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif
      color #969696
      .form
        margin-top 50px
        font-family "PT Sans", sans-serif
      .telegram
        margin-top 40px
        letter-spacing 0.5px
        font-size 16px
        a
          color rgb(110, 192, 132)
          margin-left 10px
        img
          width 50%
          box-shadow: 2px 2px 1px 1px #E9E9E9
          margin 30px 0
</style>
