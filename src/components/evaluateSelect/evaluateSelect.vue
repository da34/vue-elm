<template>
  <div>
    <div class="comment-wrapper">
      <div class="comment-content" v-if='ratings'>
        <span class='positive' @click='select(2)' :class='{"active":selectType===2}'>全部 {{ratings.length}}</span>
        <span class='positive' @click='select(0)' :class='{"active":selectType===0}'>推荐 {{recommends.length}}</span>
        <span class='negative' @click='select(1)' :class='{"active":selectType===1}'>吐槽 {{bads.length}}</span>
      </div>
      <div class="switch">
        <i class='icon-check_circle' @click='selectText' :class="{'active':haveContent}"></i>
        <span class='text'>只看有内容评价</span>
      </div>
    </div>
  </div>
</template>

<script>
  const recommend = 0,
    bad = 1,
    ALL = 2
  export default {
    props: {
      ratings: Array,
      haveContent: Boolean,
      selectType: Number
    },
    computed: {
      recommends () {
        return this.ratings.filter(item => {
          return item.rateType === recommend
        })
      },
      bads () {
        return this.ratings.filter(item => {
          return item.rateType === bad
        })
      },
    },
    created () {
    },
    methods: {
      select (num) {
        // this.selectType = num
        this.$emit('select', num)
      },
      selectText () {
        this.$emit('toggle')
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .comment-wrapper
    .comment-content
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7, 17, 27, .1))

      span
        display inline-block
        line-height 16px
        font-size 12px
        color rgb(77, 85, 93)
        padding 8px 12px
        border-radius 2px
        margin-right 8px

        &.active
          background rgb(0, 160, 220)
          color #fff

      .positive
        background rgba(0, 160, 220, .2)

      .negative
        background rgba(77, 85, 93, .2)

        &.active
          background rgb(77, 85, 93)

    .switch
      padding 12px 18px
      color rgb(147, 153, 159)
      border-bottom 1px solid rgba(7, 17, 27, .1)

      .icon-check_circle
        display inline-block
        vertical-align top
        padding-right 4px
        font-size 24px
        line-height 24px

        &.active
          color #00B43C

      .text
        display inline-block
        vertical-align top
        font-size 12px
        line-height 24px
</style>
