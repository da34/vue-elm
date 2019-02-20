<template>
  <div class='goods-wrapper'>
    <div class="menu-wrapper" ref='menuWrapper'>
      <ul class='menu'>
        <li class='menu-item' v-for='(item,index) in goods' :key='index' :class='{"current":currentIndex===index}' @click='currentCilck(index,$event)'>
          <span class='text'> <span class='icon' v-show='item.type>=0' :class='classMap[item.type]'></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref='foodsWrapper'>
      <ul class='foods'>
        <li class='foods-item foodss-item-hook' v-for='(item,index) in goods' :key='index'>
          <h1 class='title'>{{item.name}}</h1>
          <ul>
            <li v-for='(item,index) in item.foods' :key='index' class='food-item' @click='transferFood(item)'>
              <carControl :foods='item' @add="transfer"></carControl>
              <div class="icon"><img :src="item.image" width='57' height='57' class='pic'></div>
              <div class="content">
                <p class='text'>{{item.name}}</p>
                <span class='desc'>{{item.description}}</span>
                <div class="info">
                  <span class='num'>月售{{item.sellCount}}份</span>
                  <span>好评率{{item.rating}}%</span>
                </div>
                <div class="single-price">
                  <span class='now'>￥{{item.price}}</span>
                  <span v-show='item.oldPrice' class='old'>￥{{item.oldPrice}}</span>
                </div>

              </div>
            </li>
          </ul>

        </li>
      </ul>
    </div>
    <shopCar :deliveryPrice='seller.deliveryPrice' :minPrice='seller.minPrice' :foods='rearFoods' ref='shopcart'></shopCar>
    <food :food='food' ref='food' @add='transfer'></food>
  </div>
</template>

<script>
  import shopCar from '../../components/shopCar/shopCar'
  import BScroll from 'better-scroll'
  import carControl from '../../components/cartControl/cartControl'
  import food from '../../components/food/food'

  export default {
    props: ['seller'],
    data () {
      return {
        goods: [],
        scrollY: 0,
        listHeight: [],
        foodsList: [],
        food: []
      }
    },
    computed: {
      currentIndex () {
        const scroll = this.scrollY
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i],
            height2 = this.listHeight[i + 1]
          if (!height2 || scroll >= height1 && scroll <= height2) {
            return i
          }
        }
        return 0
      },
      rearFoods () {
        let foods = []
        this.goods.forEach(item => {
          item.foods.forEach(food => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created () {

      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

      this.$ajax.get('/5lGQ5q58bc83eeba743beda75530bd3665cb7ade7e8c9d6?uri=goods')
        .then(response => {
          this.goods = response.data.goods
          this.foods = this.goods.foods

          this.$nextTick(function () {
            this.initscroll()
            this.calculateHeight()
          })
        })

    },
    methods: {
      transferFood (food) {
        this.$refs.food.show = true
        this.food = food
      },
      initscroll () {

        this.menuscroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodscroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })
        this.foodscroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      calculateHeight () {
        let height = 0,
          foodsList = this.$refs.foodsWrapper.getElementsByClassName('foodss-item-hook')
        this.listHeight.push(height)
        for (let i = 0; i < foodsList.length; i++) {
          let item = foodsList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      currentCilck (i, e) {
        let foodsList = this.$refs.foodsWrapper.getElementsByClassName('foodss-item-hook')
        let el = foodsList[i]
        this.foodscroll.scrollToElement(el, 300)
      },
      transfer (target) {
        this._drop(target)
      },
      _drop (target) {
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })

      }

    },
    components: {
      shopCar,
      carControl,
      food
    }
  }
</script>

<style lang='stylus'>
  @import "../../common/stylus/mixin.styl"
  .goods-wrapper
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow hidden

    .menu-wrapper
      flex 0 0 80px
      width 80px
      height 100%
      background #f3f5f7

      .menu
        .menu-item
          display table
          height 56px
          width 100%
          padding 0 12px
          box-sizing border-box
          border-1px(rgba(7, 17, 27, 0.1))

          &.current
            color: #00A0DC
            background #fff

          &:last-child
            border-none()

          .text
            display: table-cell
            vertical-align: middle
            font-size: 12px
            text-align center


          .icon
            display inline-block
            width: 12px
            height 12px
            background-size 12px 12px
            vertical-align top
            margin-right 2px
            position relative
            top -1px

            &.decrease
              bg-image(decrease_3)

            &.discount
              bg-image(discount_3)

            &.special
              bg-image(special_3)

            &.invoice
              bg-image(invoice_3)

            &.guarantee
              bg-image(guarantee_3)

  .foods-wrapper
    flex 1

    .foods
      .title
        background #f3f5f7
        height 26px
        font-size 12px
        line-height 26px
        color: rgb(147, 153, 159)
        padding-left 14px
        border-left 2px solid #dedde1

      .food-item
        display flex
        border-1px(rgba(7, 17, 27, 0.1))
        margin 18px
        padding-bottom 18px

        &:last-child
          border-none()
          padding-bottom 0

        .icon
          flex 0 0 57px
          margin-right 10px

        .content
          flex 1

          .single-price
            display inline-block

          .text
            font-size 14px
            color rgb(7, 17, 27)
            line-height 14px
            margin 2px 0 4px 0

          .now
            display inline-block
            font-size 14px
            line-height 20px
            font-weight 700
            color #F01414
            margin-right 8px

          .old
            text-decoration: line-through
            font-size 10px
            line-height 24px
            color: rgb(147, 153, 159)

          .desc, .info
            display block
            font-size 10px
            line-height 13px
            color rgb(147, 153, 159)
            margin-bottom 4px

            .num
              margin-right 6px

</style>
