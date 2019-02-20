<template>
  <div class="shopCar">
    <div class="content" @click.stop='_rise'>
      <div class="shopCar-main">
        <div class="shopcart">
          <div class="icon" :class='{"active":totalCount>0}'>
            <i class='icon-shopping_cart logo'></i>
          </div>
          <div class="bubble" v-if='totalCount>0'>{{totalCount}}</div>
        </div>
        <div class="content-main">
          <span class="sum-price" :class='{"active":totalPrice>0}'>￥{{totalPrice}}</span>
          <span class="distribution-price">另需配送费￥{{deliveryPrice}}元</span>
        </div>
        <div class="price" :class="{'active':isnot}" @click.stop='pay'>{{notDistribution}}</div>

      </div>

    </div>

    <div class="ball-wrapper">
      <div class="ball-content" v-for='item in balls'>
        <transition
          @before-enter="beforeEnter"
          @enter="enter"
          @afterEnter="afterEnter"
        >
          <div class="ball" v-show='item.show'>
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name='cart'>
      <div class="cart-wrapper" v-show='cartListShow&&isfood'>
        <span>{{isfood}}-{{cartListShow}}</span>
        <div class="cart-head">
          <span class='title'>购物车</span>
          <span class='del' @click='del'>清空</span>
        </div>
        <div class="cart-inner" ref='inner'>
          <ul>
            <li v-for='item in foods' class='cart-list'>
              <span class='name'>{{item.name}}</span>
              <span class='cart-list-price'>￥{{item.price}}</span>
              <div class='cart-control-wrapper'>
                <cart-control :foods='item' @add='addFood'></cart-control>
              </div>

            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name='fade'>
      <div class="bg" v-show='cartListShow&&isfood' @click='hide'></div>
    </transition>

  </div>
</template>

<script>


  import CartControl from '../cartControl/cartControl'
  import Bscroll from 'better-scroll'

  export default {
    components: { CartControl },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        cartListShow: false
      }
    },
    props: {
      deliveryPrice: Number,
      minPrice: Number,
      foods: {
        type: Array,
        default () {
          return [{
            price: 0,
            count: 0
          }]
        }
      }
    },
    computed: {
      isfood () {
        let len = 0
        this.foods.forEach(item => {
          if (item.count !== 0) {
            len++
          }
        })
        if (len === 0) {
          this.cartListShow = false
          return false
        }
        return true
      },
      totalCount () {
        let sum = 0
        this.foods.forEach(item => {
          sum += item.count
        })
        return sum
      },
      totalPrice () {
        let price = 0
        this.foods.forEach(item => {
          price += item.price * item.count
        })
        return price
      },
      notDistribution () {
        let diff = this.minPrice - this.totalPrice
        if (!diff && diff < 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差￥${diff}元起送`
        } else {
          return `去结算`
        }
      },
      isnot () {
        if (this.totalPrice >= this.minPrice) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      hide () {
        this.cartListShow = false
      },
      del () {
        this.foods.forEach(item => {
          item.count = 0
        })
        this.cartListShow = false
      },
      addFood (target) {
        this.drop(target)
      },
      _rise () {
        if (!this.totalCount) {
          return false
        }
        this.cartListShow = !this.cartListShow
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new Bscroll(this.$refs.inner, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }

        })

      },
      drop (e) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.e = e
            this.dropBalls.push(ball)
            return
          }

        }
      },
      beforeEnter (el) {

        let len = this.balls.length
        while (len--) {
          let ball = this.balls[len]
          if (ball.show) {
            let rect = ball.e.getBoundingClientRect(),
              x = rect.x - 30,
              y = -(window.innerHeight - rect.y - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter (el) {
        //触发浏览器重绘
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        })

      },
      afterEnter (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      pay () {
        if (this.totalPrice >= 20) {
          alert(`您需要支付${this.totalPrice + 4}元`)
        } else if (this.totalCount > 0) {
          this.cartListShow = !this.cartListShow
        }

      }
    },

  }
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .shopCar
    position fixed
    left 0
    bottom 0
    height 48px
    width 100%
    z-index 30

  .cart-wrapper
    position absolute
    top 0
    left 0
    width 100%
    z-index -1
    transform translate3d(0, -100%, 0)

    &.cart-enter-active, &.cart-leave-active
      transition all .4s

    &.cart-enter, &.cart-leave-to
      transform translate3d(0, 0, 0)

    .cart-head
      height 40px
      padding 0 18px
      background #f3f5f7
      line-height 40px
      border-bottom 1px solid rgba(7, 17, 27, .1)

      .title
        float: left
        font-size 14px
        color: rgb(7, 17, 27)
        font-weight 200

      .del
        float: right
        font-size 10px
        color: rgb(0, 160, 220)

    .cart-inner

      max-height 240px
      background #fff
      overflow hidden
      position relative

      .cart-list
        height 48px
        padding 12px 18px
        box-sizing border-box
        border-1px(rgba(7, 17, 27, .1))

        .name
          font-size 14px
          color rgb(7, 17, 27)
          line-height 24px

        .cart-list-price
          position absolute
          bottom 9px
          right 100px
          font-size 14px
          font-weight 700
          color rgb(240, 20, 20)
          line-height 24px

        .cart-control-wrapper
          position absolute
          bottom 0px
          right 18px
          width 100px

  .bg
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background rgba(7, 17, 27, .6)
    z-index -2

    &.fade-enter-active, &.fade-leave-active
      transition all .5s

    &.fade-enter, &.fade-leave-to
      opacity 0

  .content
    .shopCar-main
      display flex
      background #141D27

    .shopcart
      display inline-block
      width: 56px
      height: 56px
      position relative
      left 18px
      top -10px
      padding 6px
      box-sizing border-box
      background #141D27
      border-radius 50%

      .icon
        width 44px
        height 44px
        background #2B343C
        border-radius 50%
        font-size 24px
        color: rgba(255, 255, 255, .4)
        text-align center
        line-height 44px

        &.active
          background #00A0DC
          color: #fff

      .bubble
        position absolute
        bottom 40px
        left 38px
        height 16px
        z-index 100
        border-radius 16px
        color: #fff
        font-size 10px
        text-align center
        line-height 15px
        padding 0 5px
        background: linear-gradient(90deg, #fc9153, #f01414);

  .ball-wrapper
    .ball
      position fixed
      left 35px
      bottom 22px
      z-index 200
      transition all .5s cubic-bezier(0.49, -0.29, 0.75, 0.41)

      .inner
        width 16px
        height 16px
        border-radius 50%
        background rgb(0, 160, 220)
        transition all .5s linear

  .content-main
    display inline-block
    flex 1
    margin 11px 0 0 30px
    vertical-align top
    @media screen and (max-width 320px)
      margin 11px 0 0 20px

    .sum-price
      font-size 16px
      display inline-block
      color: rgba(255, 255, 255, .4)
      font-weight 700
      line-height 24px
      padding-right 10px
      width 38px
      border-right: 1px solid rgba(255, 255, 255, 0.1)
      @media screen and (max-width 320px)
        padding-right 2px
        width 30px

      &.active
        color: #fff

    .distribution-price
      display inline-block
      font-size 10px
      line-height 24px
      padding-left 16px
      color: rgba(255, 255, 255, .4)
      @media screen and (max-width 320px)
        padding-left 6px

  .price
    display inline-block
    flex 0 0 105px
    width 105px
    font-size 12px
    color: rgba(255, 255, 255, .4)
    font-weight 700
    line-height 24px
    background #2B333B
    padding 11px 8px 0
    box-sizing border-box
    text-align center

    &.active
      background #00B43C
      color #fff


</style>
