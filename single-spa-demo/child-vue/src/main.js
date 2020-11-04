import Vue from 'vue'
import App from './App.vue'
import router from './router'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

// 重新配置
const appOptions = {
  el: '#vue', // 父应用有个 #vue 来接收子应用
  router,
  render: h => h(App)
}

const vueLifeCycle = singleSpaVue({
  Vue,
  appOptions,
})

/**
 * 碰到的问题
 * 父应用成功加载子应用
 * 子应用跳转，请求资源走的是父端口 ==> 获取不到
 */
 if (window.singleSpaNavigate) {
   __webpack_public_path__ = 'http://localhost:3333/'
 }

 if (!window.singleSpaNavigate) {
   delete appOptions.el
  new Vue(appOptions).$mount('#app')
}

 /**
  * single-spa
  * 1、样式不隔离
  * 2、不能动态加载
  */

// 子应用暴露三个接口
// bootstrap  mount  unmount  --- 约定

// 定义好协议，供父调用
export const bootstrap = vueLifeCycle.bootstrap
export const mount = vueLifeCycle.mount
export const unmount = vueLifeCycle.unmount



