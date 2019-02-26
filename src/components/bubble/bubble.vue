<template>
  <div class='bubble-wrapper' v-show='num>0'>
    <div class="bubble">{{num}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      num: {
        type: Number
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .bubble-wrapper
    position absolute
    bottom 40px
    left 38px
    z-index 100
    color: #fff

    .bubble
      height 16px
      border-radius 16px
      font-size 10px
      text-align center
      line-height 15px
      padding 0 5px
      background: linear-gradient(90deg, #fc9153, #f01414);
</style>
