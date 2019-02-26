<template>
  <div id="app">
    <v-header :seller='seller'></v-header>
    <div class="tab-wrapper">
      <tab :tabs=tabs></tab>
    </div>

  </div>
</template>

<script>
  import vHeader from 'components/header/v-header'
  import tab from 'components/tab/tab'
  import { getSeller } from 'api'
  import Goods from 'components/goods/goods'
  import Seller from 'components/seller/seller'
  import Evaluate from 'components/evaluate/evaluate'
  import { urlParse } from 'common/js/tool'

  export default {
    name: 'app',
    data () {
      return {
        seller: {
          id: urlParse().id
        }
      }
    },
    computed: {
      tabs () {
        return [
          {
            label: '商品',
            component: Goods,
            data: {
              seller: this.seller
            }
          },
          {
            label: '评价',
            component: Evaluate,
            data: {
              seller: this.seller
            }
          },
          {
            label: '商家',
            component: Seller,
            data: {
              seller: this.seller
            }
          },
        ]
      }
    },
    created () {
      this._getSeller()
    },
    methods: {
      _getSeller () {
        getSeller({
          id: this.seller.id
        }).then(res => {
          this.seller = Object.assign({}, this.seller, res.seller)
        })
      }
    },
    components: {
      vHeader,
      tab
    }
  }
</script>
<style lang="stylus">
  .tab-wrapper
    position fixed
    top 136px
    bottom 0
    left 0
    right 0
</style>
