<template>
  <div class="tab">
    <cube-tab-bar
      v-model="selectedLabel"
      :data="tabs"
      :showSlider=true
      :useTransition=false
      ref="tabBar"
      class="border-bottom-1px"
    >
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        :loop=false
        :auto-play=false
        :show-dots=false
        :initial-index="index"
        :options="options"
        @change='change'
        @scroll='scroll'
        ref="slide"
      >
        <cube-slide-item v-for="(item,index) in tabs" :key="index">
          <component ref='component' :is="item.component" :data="item.data"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'tab',
    props: {
      tabs: {
        type: Array,
        default () {
          return []
        }
      },
      initialIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        index: 0,
        options: {
          listenScroll: true,
          probeType: 3,
          directionLockThreshold: 0
        }
      }
    },
    computed: {
      selectedLabel: {
        get () {
          return this.tabs[this.index].label
        },
        set (newVal) {
          this.index = this.tabs.findIndex((value) => {
            return value.label === newVal
          })
        }
      }
    },
    mounted () {
      this.change(this.index)
    },
    methods: {
      scroll ({ x }) {
        let tabBarWidth = this.$refs.tabBar.$el.clientWidth
        let slideWidth = this.$refs.slide.slide.scrollerWidth
        let rollingWidth = -x / slideWidth * tabBarWidth
        this.$refs.tabBar.setSliderTransform(rollingWidth)
      },
      change (index) {
        this.index = index
        const instance = this.$refs.component[index]
        if(instance&&instance.fetch){
          instance.fetch()
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .tab
    display: flex
    flex-direction: column
    height: 100%

    >>> .cube-tab
      padding: 10px 0

    .slide-wrapper
      flex: 1
      overflow: hidden
</style>
