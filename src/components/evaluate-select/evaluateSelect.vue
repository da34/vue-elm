<template>
  <div>
    <div class="comment-wrapper">
      <div class="comment-content" v-if='ratings'>
        <span class='positive' @click='select(2)' :class='{"active":selectType===2}'>{{desc.all}} {{ratings.length}}</span>
        <span class='positive' @click='select(0)' :class='{"active":selectType===0}'>{{desc.positive}} {{positive.length}}</span>
        <span class='negative' @click='select(1)' :class='{"active":selectType===1}'>{{desc.negative}} {{negative.length}}</span>
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
  const EVENT_TYPE = 'selectType'
  const EVENT_TEXT = 'selectText'
  export default {
    props: {
      ratings: Array,
      haveContent: {
        type: Boolean,
        default: true
      },
      selectType: {
        type: Number,
        default: 2
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '差评'
          }
        }
      }
    },
    computed: {
      positive () {
        return this.ratings.filter(item => item.rateType === recommend)
      }
      ,
      negative () {
        return this.ratings.filter(item => item.rateType === bad)
      }
    }
    ,
    created () {
    }
    ,
    methods: {
      selectText () {
        this.$emit(EVENT_TEXT)
      }
      ,
      select (num) {
        this.$emit(EVENT_TYPE, num)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin.styl"
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
