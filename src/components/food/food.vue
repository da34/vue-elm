<template>
  <div>
    <transition name='food'>
      <div class="food-wrapper" v-show='show' ref='foodWrapper'>
        <div class="food-content">
          <div class="img-pic">
            <img :src="food.image" alt="">
          </div>
          <i class='icon-arrow_lift' @click='hide'></i>
          <div class="food-head">
            <span class='name'>{{food.name}}</span>
            <div class="sell">
              <span class='work'>月售{{food.sellCount}}份</span>
              <span>好评率{{food.rating}}%</span>
            </div>
            <div class="food-price">
              <span class='now'>￥{{food.price}}</span>
              <span class='old'>￥{{food.oldPrice}}</span>
            </div>
            <transition name='fade'>
              <div class="food-control-wrapper" v-show='!food.count||food.count===0' @click='reveal'>
                <span>加入购物车</span>
              </div>
            </transition>

            <div class="control" v-show='!food.count<=0'>
              <cart-control :foods='food' @add='addFoods'></cart-control>
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
            <evaluate-select @select='selectRating' :ratings='food.ratings' :haveContent='haveContent'
                             :selectType='selectType' @toggle='toggleText'></evaluate-select>
          </div>
          <div class="comment border-1px" v-if='food.ratings'>
            <ul v-show='isFilter.length&&isFilter'>
              <li v-for='(item,index) in isFilter' :key='index' class='comment-list'>
                <div class="user">
                  <span class='user-name'>{{item.username}}</span>
                  <img class='avatar' :src="item.avatar" alt="" width=12 height=12>
                </div>
                <div class='time'>{{timeOf(item.rateTime)}}</div>
                <p class='text'>
                  <i :class='{"icon-thumb_up":item.rateType===0,"icon-thumb_down":item.rateType===1,"active":item.rateType===0}' class='icon'></i>
                  <span>{{item.text===''?'此用户没有填写评价':item.text}}</span>
                </p>

              </li>
            </ul>
            <div class="content" v-show='!isFilter||!isFilter.length'>暂无评价</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import cartControl from '../../components/cartControl/cartControl'
  import Vue from 'vue'
  import split from '../../components/split/split'
  import evaluateSelect from '../../components/evaluateSelect/evaluateSelect'
  import BScroll from 'better-scroll'
  import { formatDate } from '../../common/js/date'

  const ALL = 2

  export default {
    props: ['food'],
    data () {
      return {
        show: false,
        haveContent: false,
        selectType: ALL
      }
    },
    computed: {
      isFilter () {
        let arr = []
        this.food.ratings.forEach(item => {
          if (this.haveContent && !item.text) {
            return
          } else if (this.selectType === ALL || this.selectType === item.rateType) {
            arr.push(item)
          }
        })
        return arr
      }
    },
    created () {
      this.$nextTick(() => {
        let scroll = new BScroll(this.$refs.foodWrapper, {
          click: true
        })
      })

    },
    methods: {
      hide () {
        this.show = false
      },
      reveal (event) {
        Vue.set(this.food, 'count', 1)
        this.$emit('add', event.target)
      },
      addFoods (target) {
        this.$emit('add', target)
      },
      selectRating (num) {
        this.selectType = num
      },
      toggleText () {
        this.haveContent = !this.haveContent
      },
      timeOf (time) {
        return formatDate(time, 'YYYY-MM-DD hh:mm')
      }
      // isShow (type, text) {
      //   if (this.haveContent && !text) {
      //     return false
      //   }
      //   if (this.selectType === ALL) {
      //     return true
      //   }
      //   return this.selectType === type
      //
      // }
    },
    components: {
      cartControl,
      split,
      evaluateSelect
    }
  }
</script>


<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .food-wrapper
    position fixed
    top 0
    left 0
    bottom 48px
    width 100%
    background #fff

    &.food-enter-active, &.food-leave-active
      transition all .5s

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

      .icon-arrow_lift
        position absolute
        top 10px
        left 5px
        font-size 20px
        padding 10px
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
