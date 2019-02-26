<template>

  <cube-scroll ref="scroll" class="ratings-wrapper" :data='selectRatings' :options='options'>
    <div class="ratings-content">
      <div class="ratings-head">
        <div class="ratings-left">
          <p class='score'>{{seller.score}}</p>
          <p class='grade'>综合评分</p>
          <span class='ran'>高于周边商家{{seller.rankRate}}%</span>
        </div>
        <div class="ratings-right">
          <div class="ratings-inner">
            <p class='text'>服务态度</p>
            <star :size='36' :score='seller.serviceScore'></star>
            <span class='score'>{{seller.serviceScore}}</span>
          </div>
          <div class="ratings-inner">
            <p class='text'>商品评价</p>
            <star :size='36' :score='seller.foodScore'></star>
            <span class='score'>{{seller.foodScore}}</span>
          </div>
          <p class='text'>送达时间</p>
          <span class='deliverytime'>{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
      <split></split>
      <cube-loading :size="28" class='loading' v-show='!selectRatings.length'></cube-loading>
      <evaluate-select
        :ratings='ratings'
        :selectType='selectType'
        :haveContent='haveContent'
        @selectType='select'
        @selectText='text'
        v-show='selectRatings.length'
      >
      </evaluate-select>
      <div class="comment">
        <ul v-show='true'>
          <li v-for='(item,index) in selectRatings' :key='index' class='comment-item'>
            <div class="comment-head">
              <div class="avatar">
                <img :src="item.avatar" alt="" width=28 height=28>
              </div>
              <p class='username'>{{item.username}}</p>
              <span class='time'>{{format(item.rateTime)}}</span>
              <star :size='24' :score='item.score'></star>
              <p v-show='item.deliveryTime' class='delivery'>{{item.deliveryTime}}分钟送达</p>
            </div>
            <div class="comment-content">
              <p class='text'>{{item.text}}</p>
              <i :class='{"icon-thumb_up":item.rateType===0,"icon-thumb_down":item.rateType===1,"active":item.rateType===0}' class='icon'></i>
              <span v-for='(item,index) in item.recommend' :key='index' class='recommend'>{{item}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </cube-scroll>


</template>

<script>
  import split from 'components/split/split'
  import star from 'components/star/star'
  import { getRatings } from 'api'
  import ratingsMixins from 'common/mixins/ratings'
  import evaluateSelect from 'components/evaluate-select/evaluateSelect'

  export default {
    mixins: [ratingsMixins],
    props: {
      data: {
        type: Object,
        default () {
          return {}
        }
      },

    },
    data () {
      return {
        ratings: [],
        options: {
          click: false,
          directionLockThreshold: 0
        }
      }
    },
    computed: {
      seller () {
        return this.data.seller
      }
    },
    components: {
      split,
      star,
      evaluateSelect
    },
    created () {
    },
    methods: {
      fetch () {
        if (!this.once) {
          getRatings().then(res => {
            this.ratings = res.ratings
          })
          this.once = true
        }
      }
    }
  }
</script>

<style lang='stylus' scoped>
  @import "~common/stylus/mixin.styl"
  .ratings-wrapper
    position: relative
    text-align: left
    white-space: normal
    height: 100%

    .loading
      position absolute
      top 110%
      left 45%

    .ratings-content
      .ratings-head
        display flex
        padding 18px 0

        .ratings-left
          flex 0 0 137px
          width 137px
          text-align center
          border-right 1px solid rgba(7, 17, 27, .1)
          @media screen and (max-width 320px)
            flex 0 0 120px
            width 120px

          .score
            font-size 24px
            line-height 28px
            color rgb(255, 153, 0)
            margin-bottom 6px

          .grade
            font-size 12px
            line-height 12px
            color rgb(7, 17, 27)
            margin-bottom 8px

          .ran
            font-size 10px
            line-height 10px
            color rgb(147, 153, 159)
            margin-bottom 6px

        .ratings-right
          flex 1
          padding-left 24px
          font-size 12px
          @media screen and (max-width 320px)
            padding-left 12px

          .ratings-inner
            margin-bottom 8px

          .star
            display inline-block
            margin 0 6px 0 0
            vertical-align top
            @media screen and (max-width 320px)
              margin-right 0

          .text
            display inline-block
            vertical-align top
            line-height 18px
            color: rgb(7, 17, 27)
            margin-right 12px
            @media screen and (max-width 320px)
              margin-right 6px

          .deliverytime
            line-height 18px
            color rgb(147, 153, 159)

          .score
            display inline-block
            vertical-align top
            line-height 18px
            color rgb(255, 153, 0)

      .comment
        margin 0 18px

        .comment-item
          position relative
          padding 18px 0
          border-1px(rgba(7, 17, 27, .1))

          &:last-child
            border-none()

          .comment-head
            font-size 10px

            .avatar
              float: left
              margin-right 12px

              img
                border-radius 50%

            .username
              line-height 12px
              color rgb(7, 17, 27)
              margin-bottom 4px

            .time
              position absolute
              top 16px
              right 0
              line-height 12px
              font-weight 200
              color rgb(147, 153, 159)

            .star
              margin 0 6px 6px 0
              display inline-block

            .delivery
              display inline-block
              line-height 12px
              font-weight 200
              color rgb(147, 153, 159)

          .comment-content
            font-size 12px
            padding-left 40px

            .text
              line-height 18px
              color rgb(7, 17, 27)

            .icon
              display inline-block
              line-height 16px
              margin 6px 6px 6px 0

              &.active
                color rgb(0, 160, 220)

            .recommend
              display inline-block
              margin-right 6px
              border 1px solid rgba(7, 17, 27, .1)
              padding 0 6px
              border-radius 2px
              font-size 9px
              line-height 16px
              color rgb(147, 153, 159)
</style>
