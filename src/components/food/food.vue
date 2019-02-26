<template>
  <div>
    <transition name='food' @after-leave='afterLeave'>
      <div class="food-wrapper" v-show='visible' ref='foodWrapper'>
        <cube-scroll
          ref='scroll'
          :data='selectRatings'>
          <div class="food-content">
            <div class="img-pic">
              <img :src="food.image" alt="">
            </div>

            <div class="leave">
              <i class='icon-arrow_lift' @click='hide'></i>
            </div>
            <div class="food-head">
              <span class='name'>{{food.name}}</span>
              <div class="sell">
                <span class='work'>月售{{food.sellCount}}份</span>
                <span>好评率{{food.rating}}%</span>
              </div>
              <div class="food-price">
                <span class='now'>￥{{food.price}}</span>
                <span class='old' v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
              </div>
              <transition name='fade'>
                <div class="food-control-wrapper" v-show='!food.count' @click='addFirst'>
                  <span>加入购物车</span>
                </div>
              </transition>

              <div class="control" v-show='food.count>0'>
                <cart-control :food='food' @add='addFood'></cart-control>
              </div>
            </div>
            <split></split>
            <div class="introduce" v-show='food.info'>
              <h1 class='title'>商品介绍</h1>
              <span class='info'>{{food.info}}</span>
            </div>
            <split v-show='food.info'></split>
            <div class="evaluate-wrapper">
              <h1 class='title'>商品评价</h1>
            </div>
            <evaluate-select
              :ratings='ratings'
              :selectType='selectType'
              :haveContent='haveContent'
              :desc='desc'
              @selectType='select'
              @selectText='text'
            ></evaluate-select>
            <div class="comment" v-if='food.ratings'>
              <ul v-show='selectRatings.length'>
                <li v-for='(item,index) in selectRatings' :key='index' class='comment-list'>
                  <div class="user">
                    <span class='user-name'>{{item.username}}</span>
                    <img class='avatar' :src="item.avatar" alt="" width=12 height=12>
                  </div>
                  <div class='time'>{{format(item.rateTime)}}</div>
                  <p class='text'>
                    <i :class='{"icon-thumb_up":item.rateType===0,"icon-thumb_down":item.rateType===1,"active":item.rateType===0}' class='icon'></i>
                    <span>{{item.text}}</span>
                  </p>

                </li>
              </ul>
              <div class="content" v-show='!selectRatings.length'>没有更多了哦！</div>
            </div>
          </div>
        </cube-scroll>

      </div>
    </transition>
  </div>
</template>

<script>
  import cartControl from '../../components/cartControl/cartControl'
  import split from '../../components/split/split'
  import popup from '../../common/mixins/popup'
  import EvaluateSelect from '../evaluate-select/evaluateSelect'
  import ratingsMixin from '../../common/mixins/ratings'
  const EVENT_SHOW = 'show'
  const AFTER_LEAVE = 'afterLeave'
  const EVENT_ADD = 'add'

  export default {
    name: 'food',
    props: ['food'],
    mixins: [popup,ratingsMixin],
    data () {
      return {
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    computed: {
      ratings () {
        return this.food.ratings
      }
    },
    created () {
      this.$on(EVENT_SHOW, () => {
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })

      })
    },
    methods: {
      afterLeave () {
        this.$emit(AFTER_LEAVE)
      },
      addFirst (el) {
        this.$set(this.food, 'count', 1)
        this.$emit(EVENT_ADD, el.target)
      },
      addFood (el) {
        this.$emit(EVENT_ADD, el)
      },
    },
    components: {
      EvaluateSelect,
      cartControl,
      split,
    }
  }
</script>


<style lang="stylus" scoped>
  @import '~common/stylus/mixin'
  .food-wrapper
    position fixed
    top 0
    left 0
    bottom 48px
    width 100%
    background #fff

    &.food-enter-active, &.food-leave-active
      transition all .4s

    &.food-enter, &.food-leave-to
      transform translate3d(100%, 0, 0)

    .food-content
      .img-pic
        position relative
        width 100%
        height 0
        padding-top 100%

        img
          position absolute
          top 0
          left 0
          width 100%
          height 100%

      .leave
        position absolute
        top 10px
        left 10px
        width 20px
        height 20px
        padding 5px
        border-radius 50%
        background-color: rgba(0, 0, 0, .3);

        .icon-arrow_lift
          line-height 20px
          font-size 16px
          color: #fff

      .food-head
        position relative
        padding 18px

        .name
          display inline-block
          font-size 14px
          font-weight 700
          color: rgb(7, 17, 27)
          line-height 14px
          margin-bottom 8px

        .sell
          font-size 10px
          line-height 10px
          color rgb(147, 153, 159)
          margin-bottom 18px

          .work
            padding-right 12px

        .food-price
          display inline-block
          line-height 24px

          .now
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
            padding-right 10px

          .old
            font-size 10px
            text-decoration line-through
            font-weight 700
            color rgb(147, 153, 159)

        .food-control-wrapper
          display inline-block
          float: right
          width 74px
          height 24px
          border-radius 24px
          background rgb(0, 160, 220)
          text-align center
          box-sizing border-box

          &.fade-enter-active, &.fade-leave-active
            transition all .5s

          &.fade-enter, &.fade-leave-to
            opacity 0

          span
            font-size 10px
            line-height 24px
            color: #fff

        .control
          position absolute
          width 100px
          height 50px
          bottom 10px
          right 18px

      .introduce
        padding 18px

        .title
          padding-bottom 6px
          font-size 14px
          color: #07111B

        .info
          padding 0 8px
          line-height 24px
          font-size 12px
          font-weight 200
          color: rgb(77, 85, 93)

      .evaluate-wrapper
        padding-top 18px

        .title
          padding-left 18px
          font-size 14px
          color: #07111B

      .comment
        padding 0 16px

        .comment-list
          position relative
          padding 16px 0
          border-1px(rgba(7, 17, 27, .1))

          &:last-child
            border-none()

          .time
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
            margin-bottom 6px

          .icon
            font-size 12px
            color rgb(147, 153, 159)
            padding-right 4px

            &.active
              color rgb(0, 160, 220)

          .text
            font-size 12px
            line-height 16px
            color rgb(7, 17, 27)

          .user
            position absolute
            top 16px
            right 0

            .user-name
              display inline-block
              vertical-align top
              line-height 12px
              font-size 10px
              color rgb(147, 153, 159)
              margin-right 6px

            .avatar
              display inline-block
              vertical-align top
              border-radius 50%

      .content
        color #999
        font-size 12px
        padding 16px 0
</style>
