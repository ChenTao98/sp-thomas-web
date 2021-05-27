// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import '@/icons'
import instance from './api/instance'
import qs from 'qs'
import {setCookie,getCookie,delCookie} from '@/api/cookie'
Vue.prototype.$cookieStore = {setCookie,getCookie,delCookie}
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.prototype.$http=instance
Vue.prototype.$qs=qs
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App},
  template: '<App/>'
})
