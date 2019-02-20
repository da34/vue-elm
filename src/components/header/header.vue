<template>
  <div class='header'>
    <div class="content">
      <div class="logo">
        <img width='64' height='64' :src='seller.avatar'>
      </div>
      <div class="sellmsg">
        <div class="title">
          <span class='brand'></span>
          <span class='name'>{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="concessions" v-if='seller.supports'>
          <span class='icon' :class='classMap[seller.supports[0].type]'></span>
          <span class='text'>{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="detail" v-if='seller.supports' @click='bdetailsShow'>
        <span class='detail-text'>{{seller.supports.length}}个</span>
        <span class='detail-icon icon-keyboard_arrow_right'></span>
      </div>
    </div>
    <div class="notice" @click='bdetailsShow'>
      <span class='notice-icon'></span>
      <span class='notice-text'>{{seller.bulletin}}</span>
      <span class='notice-pic icon-keyboard_arrow_right'></span>
    </div>
    <div class="background">
      <img width=100% height=100% :src='seller.avatar'>
    </div>
    <transition name='fade'>
      <div class="bdetails" v-show='bool'>
        <div class="bdetails-main">
          <p class='name'>{{seller.name}}</p>
          <star :score='seller.score' :size='48'></star>
          <notice :title='msg'></notice>
          <ul class='supports' v-if='seller.supports'>
            <li v-for='(item,index) in seller.supports' :key='index' class='supports-item'>
              <span class='icon' :class='classMap[seller.supports[index].type]'></span>
              <span class='text'>{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <notice :title="notice"></notice>
          <div class="info">
            <span text-bulletin>{{seller.bulletin}}</span>
          </div>
        </div>
        <div class="icon-close" @click='bdetailsHide'></div>
      </div>

    </transition>

  </div>

</template>

<script>
  import star from '../../components/star/star'
  import notice from '../../components/noticeHead/noticeHead'

  export default {
    props: ['seller'],
    data () {
      return {
        bool: false,
        msg: '优惠信息',
        notice: '商家公告'
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      bdetailsShow () {
        this.bool = true
      },
      bdetailsHide () {
        this.bool = false
      }
    },
    components: {
      star,
      notice
    }
  }


</script>

<style lang='stylus'>
  @import "../../common/stylus/mixin.styl"
  .header
    position relative
    color #fff
    overflow hidden
    background rgba(7, 17, 27, .5)

    .content
      position relative
      padding 24px 16px 16px 24px

      .logo
        display inline-block
        vertical-align top

        img
          border-radius 2px

      .sellmsg
        display inline-block
        margin-left 16px
        vertical-align top

        .title
          margin 2px 0 8px 0

          .brand
            display inline-block
            vertical-align top
            height 18px
            width 30px
            margin-right 6px
            bg-image(brand)
            background-size 30px 18px
            background-repeat no-repeat

          .name
            vertical-align top
            font-size 16px
            line-height 16px
            font-weight bold

      .description
        margin-bottom 10px
        font-size 12px
        line-height 12px
        font-weight 200

      .concessions
        .text
          font-size 10px
          font-weight 200
          line-height 12px
          vertical-align top

        .icon
          display inline-block
          width 12px
          height 12px
          vertical-align top
          margin-right 4px
          background-size 12px 12px

          &.decrease
            bg-image(decrease_1)

          &.discount
            bg-image(discount_1)

          &.special
            bg-image(special_1)

          &.invoice
            bg-image(invoice_1)

          &.guarantee
            bg-image(guarantee_1)

      .detail
        position absolute
        right 12px
        bottom 18px
        padding 7px 8px
        border-radius 15px
        font-size 10px
        text-align center
        background rgba(0, 0, 0, .2)

        .detail-icon
          padding-left 2px

        .detail-text
          line-height 12px
          font-weight 200

    .notice
      height 28px
      background rgba(7, 17, 27, .2)
      padding 0 16px 0 12px
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
      font-size 10px
      position relative
      line-height 28px

      .notice-icon
        vertical-align top
        margin-right 4px
        display inline-block
        width 22px
        height 12px
        bg-image('bulletin')
        background-size 22px 12px
        margin-top 8px

      .notice-text
        vertical-align top

      .notice-pic
        position absolute
        right 12px
        bottom 7px

    .background
      width 100%
      height 100%
      position absolute
      top 0
      left 0
      z-index -1
      filter blur(10px)

    .bdetails
      position fixed
      top 0
      left 0
      z-index 99
      display flex
      flex-flow column
      height 100%
      width 100%
      text-align center
      overflow-y auto
      background rgba(7, 17, 27, .8)

      .bdetails-main
        flex 1
        width 80%
        margin 69px 36px 32px
        .name
          font-size 16px
          font-weight 700
          line-height 16px


      .icon-close
        font-size 32px
        color rgba(255, 255, 255, .5)
        margin-bottom 32px

      .supports
        margin-top 24px

        .supports-item
          margin-bottom 12px
          text-align left

          &:last-child
            margin-bottom 28px

        .icon
          display inline-block
          width 16px
          height 16px
          background-size 16px 16px
          vertical-align top
          margin 0 6px 0 12px

          &.decrease
            bg-image(decrease_1)

          &.discount
            bg-image(discount_1)

          &.special
            bg-image(special_1)

          &.invoice
            bg-image(invoice_1)

          &.guarantee
            bg-image(guarantee_1)

        .text
          font-size 12px
          font-weight 200
          line-height 12px
          vertical-align center

      .text
        display inline-block
        vertical-align top
        font-size 12px
        font-weight 200
        line-height 24px
        padding 3px 3px 0
        text-align left
      .info
        font-size 12px
        line-height 24px
        padding 24px 12px 0
        text-align left
    .fade-enter-active, .fade-leave-active
      transition: opacity .5s;

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
      opacity: 0
</style>
