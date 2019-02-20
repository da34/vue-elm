<template>
  <div class='seller-wrapper' ref='sellerWrapper'>
    <div class="seller">
      <div class="seller-head border-1px">
        <div class="monicker">
          <h1 class='title'>{{seller.name}}</h1>
          <star :size='36' :score='seller.score'></star>
          <span class='count'>({{seller.ratingCount}})</span>
          <span class='sell'>月售{{seller.sellCount}}单</span>
          <div class="collect">
            <i class='icon-favorite' @click='collect' :class='{"active":isFavorite}'></i>
            <p class='put'>{{isFavorite?isPut[1]:isPut[0]}}</p>
          </div>
        </div>
        <div class="promise-wrapper">
          <ul class='promise'>
            <li class='promise-item'>
              <p>起送价</p>
              <span class='seller'>{{seller.minPrice}}</span>
              元
            </li>
            <li class='promise-item'>
              <p>商家配送</p>
              <span class='seller'>{{seller.deliveryPrice}}</span>
              元
            </li>
            <li class='promise-item'>
              <p>平均配送时间</p>
              <span class='seller'>{{seller.deliveryTime}}</span>
              分钟
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="introduce">
        <h1 class='title'>公告与活动</h1>
        <p class='bulletin'>{{seller.bulletin}}</p>
        <ul class='notice'>
          <li v-for='(item,index) in seller.supports' :key='index' class='notice-item border-1px'>
            <span class='icon' :class='classMap[seller.supports[index].type]'></span>
            <span class='text'>{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="picture">
        <h1 class='title'>商家实景</h1>
        <div class="pictrue-wrapper" ref='pictrueWrapper'>
          <ul class='pictrue-content' ref='pictrueContent'>
            <li v-for='(item,index) in seller.pics' :key='index' class='pictrue-item'>
              <img :src="item" alt="" class='pic' width=120 height=90>
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="message">
        <h1 class='title'>商家信息</h1>
        <div class="info-wrapper">
          <ul class='infos'>
            <li class='info-item' v-for="(item,index) in seller.infos" :key='index'>
              <p class='info'>{{item}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import split from '../../components/split/split'
  import star from '../../components/star/star'
  import BScroll from 'better-scroll'
  import { saveTolocal, locdFromloca } from '../../common/js/storg'

  export default {
    props: {
      seller: Object
    },
    data () {
      return {
        isPut: ['收藏', '已收藏'],
        isFavorite: false
      }
    },
    watch: {
      'seller' () {
        this._initScrollX()
      }
    },
    created () {
      this.$nextTick(() => {
        let scroll = new BScroll(this.$refs.sellerWrapper, {
          click: true
        })
      })
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.isFavorite = locdFromloca(this.seller.id, 'favorite', false)
    },
    methods: {
      collect () {
        this.isFavorite = !this.isFavorite
        saveTolocal(this.seller.id, 'favorite', this.isFavorite)
      },
      _initScrollX () {
        if (this.seller.pics) {
          let picw = 120,
            m = 6,
            w = (picw + m) * this.seller.pics.length - m
          this.$refs.pictrueContent.style.width = w + 'px'
          this.$nextTick(() => {
            let picScroll = new BScroll(this.$refs.pictrueWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          })
        }
      }
    }
    ,
    components: {
      split,
      star
    }
  }
</script>

<style lang='stylus'>
  @import "../../common/stylus/mixin.styl"
  .seller-wrapper
    padding 18px 0
    position absolute
    top 174px
    bottom 0
    right 0
    left 0
    overflow hidden

    .seller
      .seller-head
        position relative
        margin 0 18px
        padding 18px 0

        .monicker
          border-1px(rgba(7, 17, 27, .1))

          .star
            display inline-block
            vertical-align center
            text-align left
            margin 9px 8px 17px 0

          .count, .sell
            display inline-block
            vertical-align top
            font-size 10px
            line-height 18px
            color rgb(77, 85, 93)

          .sell
            margin-top 8px

          .count
            margin 8px 12px 0 0

          .collect
            position absolute
            top 0
            right 0
            text-align center
            width 40px

            .icon-favorite
              font-size 24px
              line-height 24px
              color #ccc

              &.active
                color #F01414

            .put
              margin-top 8px
              font-size 10px
              line-height 10px
              color rgb(77, 85, 93)

        .promise-wrapper
          .promise
            display flex
            padding 18px 0 0 0

            .promise-item
              flex 1
              border-right 1px solid rgba(7, 17, 27, .1)
              font-size 10px
              text-align center

              &:last-child
                border-right 0

              p
                line-height 10px
                color rgb(147, 153, 159)
                margin-bottom 4px

              .seller
                font-size 24px
                line-height 24px
                font-weight 200px
                color rgb(7, 17, 27)

      .title
        font-size 14px
        line-height 14px
        color rgb(7, 17, 27)

      .introduce
        padding 18px 0
        margin 0 18px

        .bulletin
          line-height 24px
          font-size 12px
          font-weight 200
          padding 8px 12px 18px
          color rgb(240, 20, 20)
          border-1px(rgba(7, 17, 27, .1))

        .notice
          .notice-item
            padding 16px 12px
            border-1px(rgba(7, 17, 27, .1))

            &:last-child
              border-none()

            .icon
              display inline-block
              vertical-align top
              margin-right 6px
              width 16px
              height 16px
              background-size 16px 16px

              &.decrease
                bg-image(decrease_4)

              &.discount
                bg-image(discount_4)

              &.special
                bg-image(special_4)

              &.invoice
                bg-image(invoice_4)

              &.guarantee
                bg-image(guarantee_4)

            .text
              display inline-block
              vertical-align top
              font-size 12px
              font-weight 200
              line-height 16px
              color rgb(7, 17, 27)

      .picture
        padding 18px

        .pictrue-wrapper
          width 100%
          overflow hidden
          white-space nowrap

          .pictrue-item
            display inline-block
            margin 12px 6px 0 0
            border-radius 3px
            overflow hidden

            &:last-child
              margin 12px 0 0 0

      .message
        padding 18px 0
        margin 0 18px

        .title
          border-1px(rgba(7, 17, 27, .1))
          padding-bottom 12px

        .info-item
          padding 18px 12px
          border-1px(rgba(7, 17, 27, .1))

          &:last-child
            border-none()

          .info
            font-size 12px
            line-height 16px
            color rgb(7, 17, 27)
</style>
