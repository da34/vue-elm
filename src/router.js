import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'
import vHeader from './components/header/header'

Vue.use(VueRouter)
Vue.component('vHeader', vHeader)
export default new VueRouter({
  linkActiveClass:'active',
  routes: [
    // 动态路径参数 以冒号开头
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
})
