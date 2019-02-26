<template>
  <div class='star' :class='starSize'>
    <span v-for='(item,index) in star' :key=index :class='item' class='star-item'></span>
  </div>
</template>

<script>
  const LEN = 5
  const ON = 'on'
  const OFF = 'off'
  const HALF = 'half'

  export default {
    props: {
      score: Number,
      size: Number
    },
    computed: {
      starSize () {
        return 'star-' + this.size
      },
      star () {
        let result = [],
          score = Math.floor(this.score * 2) / 2,
          halfBo = score % 1 !== 0,
          len = Math.floor(score)

        for (var i = 0; i < len; i++) {
          result.push(ON)
        }
        if (halfBo) {
          result.push(HALF)
        }
        if (result.length < LEN) {
          let len = LEN - result.length
          while (len--) {
            result.push(OFF)
          }
        }
        return result
      }
    }
  }
</script>

<style lang='stylus'>
  @import "~common/stylus/mixin.styl"

  .star
    &.star-48
      text-align center

      .star-item
        display inline-block
        width 20px
        height 20px
        background-size 20px 20px
        margin-right 22px

        &:last-child
          margin-right 0

        &.on
          bg-image('star48_on')

        &.off
          bg-image('star48_off')

        &.half
          bg-image('star48_half')

    &.star-36
      text-align center

      .star-item
        display inline-block
        width 15px
        height 15px
        background-size 15px 15px
        margin-right 6px

        &.on
          bg-image('star36_on')

        &.off
          bg-image('star36_off')

        &.half
          bg-image('star36_half')

    &.star-24
      text-align center

      .star-item
        display inline-block
        width 10px
        height 10px
        background-size 10px 10px
        margin-right 3px

        &.on
          bg-image('star24_on')

        &.off
          bg-image('star24_off')

        &.half
          bg-image('star24_half')
</style>
