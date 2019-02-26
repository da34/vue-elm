import { createAPI } from 'cube-ui'
import Vue from 'vue'
import HeaderDetail from 'components/header-detail/header-detail'
import shopCarList from 'components/shopCar-list/shopCar-list'
import shopCarCopy from 'components/shopCarCopy/shopCarCopy'
import food from 'components/food/food'

createAPI(Vue, HeaderDetail)
createAPI(Vue, shopCarList)
createAPI(Vue, shopCarCopy)
createAPI(Vue, food)
