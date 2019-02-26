<template>
  <div class="popup">
    <transition
      name="fade"
      @after-leave='afterLeave'
    >
      <cube-popup
        v-show="visible"
        :mask="true"
        @mask-click="hide"
        type="shop-car-list"
        position="bottom"
        ref="myPopup"
      >
        <transition name="move">
          <div class="cart-wrapper" v-show="visible">
            <div class="cart-head">
              <span class="title">购物车</span>
              <span class="del" @click="del">清空</span>
            </div>
            <cube-scroll class="cart-inner" ref="scroll">
              <ul>
                <li v-for="item in foods" class="cart-list">
                  <span class="name">{{item.name}}</span>
                  <span class="cart-list-price">￥{{item.price*item.count}}</span>
                  <div class="cart-control-wrapper">
                    <cart-control :food="item" @add="addFood"></cart-control>
                  </div>
                </li>
              </ul>
            </cube-scroll>
          </div>
        </transition>
      </cube-popup>
    </transition>
  </div>
</template>

<script>
  import CartControl from '../cartControl/cartControl'
  import shopCar from '../shopCar/shopCar'
  import popup from 'common/mixins/popup'

  const EVENT_SHOW = 'show'
  const LEAVE = 'leave'
  const EVENT_ADD = 'add'
  export default {
    name: 'shop-car-list',
    mixins: [popup],
    components: { CartControl },
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
          return [
            {
              price: 0,
              count: 0
            }
          ]
        }
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
      del () {
        this.dialogComp =
          this.dialogComp ||
          this.$createDialog({
            type: 'confirm',
            content: '是否清空购物车？',
            onConfirm: () => {
              this.foods.forEach(food => {
                food.count = 0
              })
              this.toastComp =
                this.toastComp ||
                this.$createToast({
                  type: 'correct',
                  time: 800,
                  txt: '已清空！'
                })
              this.toastComp.show()
              this.hide()
            }
          })
        this.dialogComp.show()
      },
      addFood (target) {
        this.$emit(EVENT_ADD, target)
      },
      afterLeave () {
        this.$emit(LEAVE)
      },
    },
    components: {
      shopCar,
      CartControl
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin"

  .cube-shop-car-list
    bottom: 48px

    &.fade-enter, &.fade-leave-to
      opacity: 0


    &.fade-enter-active, &.fade-leave-active
      transition: all 0.4s


    .move-enter, .move-leave-to
      transform: translate3d(0, 100%, 0)


    .move-enter-active, .move-leave-active
      transition: all 0.4s


  .cart-wrapper
    .cart-head
      height: 40px
      padding: 0 18px
      background: #f3f5f7
      line-height: 40px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)

      .title
        float: left
        font-size: 14px
        color: rgb(7, 17, 27)
        font-weight: 200


      .del
        float: right
        font-size: 10px
        color: rgb(0, 160, 220)


    .cart-inner
      max-height: 240px
      background: #fff
      overflow: hidden
      position: relative

      .cart-list
        height: 48px
        padding: 12px 18px
        box-sizing: border-box
        border-1px(rgba(7, 17, 27, 0.1))

        .name
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 24px

        .cart-list-price
          position: absolute
          bottom: 9px
          right: 100px
          font-size: 14px
          font-weight: 700
          color: rgb(240, 20, 20)
          line-height: 24px


        .cart-control-wrapper
          position: absolute
          bottom: 0px
          right: 18px
          width: 100px


</style>
