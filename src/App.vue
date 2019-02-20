<template>
  <div id="app">
    <v-header :seller='seller'></v-header>
    <div class="tab border-1px">
      <router-link :to="{name:'goods'}">商品</router-link>
      <router-link :to="{name:'ratings'}">评价</router-link>
      <router-link :to="{name:'seller'}">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller='seller'></router-view>
    </keep-alive>

  </div>
</template>

<script>
  import { urlParse } from './common/js/util'
  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryUrl = urlParse()
            return queryUrl.id
          })()
        }
      }
    },
    created () {
      this.$ajax.get('/5lGQ5q58bc83eeba743beda75530bd3665cb7ade7e8c9d6?uri=seller&id=' + this.seller.id)
        .then(res => {
          if (res.status === 200) {
            this.seller = Object.assign({}, this.seller, res.data.seller)
          }
        })
    }
  }
</script>
<style lang="stylus">
  @import "common/stylus/mixin.styl"
  .tab
    display flex
    height 40px
    text-align center
    line-height 40px
    border-1px (rgba(7, 17, 27, 0.1))

    & > a
      flex 1
      color rgb(77, 85, 93)

      &.active
        color rgb(240, 20, 20)
</style>
