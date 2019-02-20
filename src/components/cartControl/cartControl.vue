<template>
  <div class='control-wrapper'>
    <transition name='fade'>
      <div class="decrease" @click.stop='decreaseCount' v-show='this.foods.count>0'>
        <i class='icon-remove_circle_outline character'></i>
      </div>

    </transition>

    <div class="count" v-show='this.foods.count>0'>{{this.foods.count}}</div>
    <div class="add icon-add_circle" @click.stop='addCount'></div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    props: ['foods'],
    computed: {},
    methods: {
      addCount (event) {
        if (!this.foods.count) {
          Vue.set(this.foods, 'count', 1)
        } else {
          this.foods.count++
        }
        this.$emit('add', event.target)
      },
      decreaseCount () {
        if (this.foods.count) {
          this.foods.count--
        }
      }
    }
  }
</script>

<style lang="stylus">
  .control-wrapper
    position absolute
    right 0
    bottom 8px
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
    vertical-align top

  .add
    display inline-block
    line-height 24px

</style>
