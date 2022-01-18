import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from './global'

// import { Loading, Overlay } from 'vant'
Vue.use(globalRegister)
// Vue.use(Loading)
// Vue.use(Overlay)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
