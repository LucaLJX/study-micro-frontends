import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { registerApplication, start } from 'single-spa'

Vue.config.productionTip = false

// 动态获取标签
const loadScript = async url =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })

// 注册子
registerApplication(
  'childVue',
  async () => {
    console.log('加载子应用')
    await loadScript('http://localhost:3333/js/chunk-vendors.js')
    await loadScript('http://localhost:3333/js/app.js')
    console.log(window.singleChildVue)

    return window.singleChildVue // bootstrop  mount unmout
  },
  // 匹配"/vue"为开头
  location => location.pathname.startsWith('/vue'),
)

start()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
