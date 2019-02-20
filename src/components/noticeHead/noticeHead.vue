<template>
  <div class='msg'>
    <div class="line"></div>
    <div class="text-msg">{{title}}</div>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    props: ['title']

  }
</script>

<style lang=stylus>
  @import "../../common/stylus/mixin.styl"
  .msg
    display flex
    width 100%
    text-align center

    .text-msg
      display inline-block
      font-size 15px
      margin 0 12px
    .line
      display inline-block
      flex 1
      position relative
      top -6px
      border-1px (rgba(255, 255, 255, .2))

</style>
