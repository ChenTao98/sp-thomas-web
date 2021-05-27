import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login/Login'
import Home from '@/views/home/Home'
import HomeSearch from '@/views/home/HomeSearch'
import Product from '@/views/product/Product'
import ShopCart from '@/views/shopcart/ShopCart'
import Pay from '@/views/shopcart/Pay'
import Order from '@/views/order/Order'
import OrderDetail from '@/views/order/OrderDetail'
import Mysale from '@/views/admin/Mysale'
import Adminorderdetail from '@/views/admin/Adminorderdetail'
import Myinfo from '@/views/user/Myinfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path:'/login',
      name:"login",
      component:Login
    },{
      path:'/product',
      name:"product",
      component:Product
    },{
      path:'/search',
      name:"search",
      component:HomeSearch
    }, {
      path: '/homepage',
      name: 'home',
      component: Home
    }, {
      path: '/shopcart',
      name: 'shopcart',
      component: ShopCart
    },{
      path: '/pay',
      name: 'pay',
      component: Pay
    },{
      path:'/order',
      name:'order',
      component:Order
    },{
      path:'/orderdetail',
      name:'orderdetail',
      component:OrderDetail
    },{
      path:'/mysale',
      name:'mysale',
      component:Mysale
    },{
      path:'/adminorderdetail',
      name:'adminorderdetail',
      component:Adminorderdetail
    },{
      path:'/myinfo',
      name:'myinfo',
      component:Myinfo
    }
  ]
})
