<template>

  <div class="ratings-wrapper" ref='ratingsWrapper'>
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
      <evaluate-select
        :ratings='ratings'
        :selectType='selectType'
        :haveContent='haveContent'
        @select='select'
        @toggle='toggle'
      >
      </evaluate-select>
      <div class="comment">
        <ul v-show='isFilter&&isFilter.length'>
          <li v-for='(item,index) in isFilter' :key='index' class='comment-item'>
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
              <p class='text'>{{!item.text?'此用户没有填写评论':item.text}}</p>
              <i :class='{"icon-thumb_up":item.rateType===0,"icon-thumb_down":item.rateType===1,"active":item.rateType===0}' class='icon'></i>
              <span v-for='(item,index) in item.recommend' :key='index' class='recommend'>{{item}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>

</template>

<script>
  import split from '../../components/split/split'
  import star from '../../components/star/star'
  import evaluateSelect from '../../components/evaluateSelect/evaluateSelect'
  import BScroll from 'better-scroll'
  import { formatDate } from '../../common/js/date'

  const recommend = 0,
    bad = 1,
    ALL = 2
  export default {
    props: ['seller'],
    data () {
      return {
        ratings: [],
        selectType: ALL,
        haveContent: false
      }
    },
    computed: {
      isFilter () {
        let arr = []
        this.ratings.forEach(item => {
          if (this.haveContent && !item.text) {
            return
          } else if (this.selectType === ALL || this.selectType === item.rateType) {
            arr.push(item)
          }
        })
        return arr
      }
    },
    components: {
      split,
      star,
      evaluateSelect
    },
    created () {
      this.$ajax.get('5lGQ5q58bc83eeba743beda75530bd3665cb7ade7e8c9d6?uri=ratings')
        .then(response => {
          this.ratings = response.data.ratings
          this.$nextTick(() => {
            let scroll = new BScroll(this.$refs.ratingsWrapper, {
              click: true
            })
          })
        })
    },
    methods: {
      select (num) {
        this.selectType = num
      },
      toggle () {
        this.haveContent = !this.haveContent
      },
      format (data) {
        return formatDate(data, 'YYYY-MM-DD hh:mm')
      }
    }
  }
</script>

<style lang='stylus'>
  @import "../../common/stylus/mixin.styl"
  .ratings-wrapper
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden

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
