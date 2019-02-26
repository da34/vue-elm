<template>
  <div class='copy-wrapper' v-show='visible'>
    <shop-car
      ref='shopCar'
      :foods='foods'
      :deliveryPrice='deliveryPrice'
      :minPrice='minPrice'
      :food='food'
      :clonal=true
    >
    </shop-car>
  </div>
</template>

<script>


  import ShopCar from '../shopCar/shopCar'
  import popup from 'common/mixins/popup'

  export default {
    name: 'shopCarCopy',
    components: { ShopCar },
    mixins: [popup],
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
        type: Boolean
      },
      comp: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    created () {
    },
    methods: {
      addBall (el) {
        this.$refs.shopCar.addBall(el)
      },
      maskHide () {
        this.hide()
      },
    }
  }
</script>

<style lang=stylus scoped>
  .copy-wrapper
    position fixed
    bottom 0
    left 0
    right 0
    z-index 100
</style>
