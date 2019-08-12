import Vue from 'vue'
import App from './App'
import router from './router'// 引入路由配置
import './element'// 引入样式
import store from './vuex'// 引入全局数据控制
import './axios'// 引入后端接口

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,// 等价于 router: router
  store,//
  components: { App },
  template: '<App/>'
})
