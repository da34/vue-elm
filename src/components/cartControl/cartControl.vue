<template>
  <div class='control-wrapper'>
    <transition name='fade'>
      <div class="decrease" @click.stop='decreaseCount' v-show='food.count>0'>
        <i class='icon-remove_circle_outline character'></i>
      </div>

    </transition>

    <div class="count" v-show='food.count>0'>{{food.count}}</div>
    <div class="add" @click.stop='addCount'>
      <i class='icon-add_circle'></i>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  const ADD_EVENT = 'add'
  export default {
    name: 'cart-control',
    props: ['food'],
    computed: {},
    methods: {
      addCount (event) {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit(ADD_EVENT, event.target)
      },
      decreaseCount () {
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .control-wrapper
    position absolute
    right 0
    bottom 2px
    font-size 24px
    color rgb(0, 160, 220)

    .fade-enter-active, .fade-leave-active
      transition all .8s

    .fade-enter, .fade-leave-to
      transform translate3d(100%, 0, 0)
      opacity 0

      .character
        transform rotate(180deg)

  .decrease
    display inline-block
    line-height 24px
    padding 3px
    transform translate3d(0, 0, 0)

    .character
      display inline-block
      transition all .8s
      transform rotate(0)

  .count
    display inline-block
    font-size 10px
    width 20px
    text-align center
    line-height 24px
    color rgb(147, 153, 159)
    padding-top 3px
    vertical-align top

  .add
    display inline-block
    line-height 24px
    padding 3px

</style>
