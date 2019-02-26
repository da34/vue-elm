<template>
  <div class="shopCar">
    <div class="content" @click='toggleList'>
      <div class="shopCar-main">
        <div class="shopcart">
          <div class="icon" :class='{"active":totalCount>0}'>
            <i class='icon-shopping_cart logo'></i>
          </div>
          <bubble :num='totalCount'></bubble>
        </div>
        <div class="content-main">
          <span class="sum-price" :class='{"active":totalPrice>0}'>￥{{totalPrice}}</span>
          <span class="distribution-price">另需配送费￥{{deliveryPrice}}元</span>
        </div>
        <div class="price" :class="{'active':isnot}" @click='pay'>{{notDistribution}}</div>
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
    <shop-car-list
      :foods='foods'
    ></shop-car-list>
  </div>
</template>

<script>
  import bubble from '../bubble/bubble'
  import ShopCarList from '../shopCar-list/shopCar-list'
  //10个小球
  const BALL_LEN = 10
  const innerHook = 'inner-hook'

  function createBall () {
    let balls = []
    for (let i = 0; i < BALL_LEN; i++) {
      let obj = {
        show: false
      }
      balls.push(obj)
    }
    return balls
  }

  export default {
    name: 'shop-car',
    data () {
      return {
        balls: createBall(),
        listFood: this.food,
      }
    },
    props: {
      deliveryPrice: {
        type: Number,
        default: 2
      },
      minPrice: {
        type: Number,
        default: 1
      },
      foods: {
        type: Array,
        default () {
          return [{
            price: 0,
            count: 0
          }]
        }
      },
      food: {
        type: Boolean,
        default: true
      },
      list: {
        type: Object,
        default () {
          return {}
        }
      },
      clonal: {
        type: Boolean
      }
    },
    computed: {
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
      },
    },
    created () {
      this.dropBalls = []
    },
    methods: {

      addBall (target) {
        this._drop(target)
      },
      _drop (el) {
        for (let i = 0; i < BALL_LEN; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeEnter (el) {
        let ball = this.dropBalls[this.dropBalls.length - 1]
        let rect = ball.el.getBoundingClientRect()
        let x = rect.x - 37
        let y = -(window.innerHeight - rect.y - 22)
        el.style.display = ''
        el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`
        const inner = el.getElementsByClassName(innerHook)[0]
        inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
      },
      enter (el) {
        document.documentElement.offsetHeight
        el.style.transform = el.style.webkitTransform = 'translate3d(0,0,0)'
        const inner = el.getElementsByClassName(innerHook)[0]
        inner.style.transform = el.style.webkitTransform = 'translate3d(0,0,0)'
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'

        }
      },
      toggleList () {
        if (this.listFood) {
          if (!this.totalCount) {
            return
          }
          this.listFood = false
          console.log(1)
          this._showShop()
          this._showCopy()
        } else {
          console.log(2)
          this.listFood = true
          this._hideShop()
        }
      },
      _showShop () {
        this.shopCatListComp = this.shopCatListComp || this.$createShopCarList({
          $props: {
            foods: 'foods',
          },
          $events: {
            hide: () => {
              this.listFood = true
            },
            leave: () => {
              this._hideCopy()
            },
            add: (target) => {
              this.shopCatCopyComp.addBall(target)
            },
          }
        })
        this.shopCatListComp.show()
      },
      _showCopy () {
        this.shopCatCopyComp = this.shopCatCopyComp || this.$createShopCarCopy({
          $props: {
            foods: 'foods',
            minPrice: 'minPrice',
            deliveryPrice: 'deliveryPrice',
            food: 'listFood',
            comp: this.shopCatListComp
          }
        })
        this.shopCatCopyComp.show()
      },
      _hideShop () {
        const comp = this.clonal ? this.$parent.comp : this.shopCatListComp
        comp && comp.hide()
      },
      _hideCopy () {
        this.shopCatCopyComp && this.shopCatCopyComp.maskHide(true)
      },
      pay (el) {
        if (this.totalPrice < this.minPrice) {
          return
        }
        this.$createDialog({
          type: 'alert ',
          title: '支付',
          content: `您需要支付${this.totalPrice + this.deliveryPrice}元`
        }).show()
        //阻止冒泡，但不阻止默认行为
        el.stopPropagation()
      },
    },
    watch: {
      totalCount (count) {
        if (count === 0) {
          this.shopCatListComp && this.shopCatListComp.hide()
        }
      },
      food (newval) {
        this.listFood = newval
      },
    },
    components: {
      ShopCarList,
      bubble
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin"
  .shopCar
    position absolute
    left 0
    bottom 0
    height 48px
    width 100%
    z-index 999

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


  .ball-wrapper
    .ball
      position fixed
      left 37px
      bottom 22px
      z-index 200
      transition all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)

      .inner
        width 16px
        height 16px
        border-radius 50%
        background rgb(0, 160, 220)
        transition all .4s linear

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
