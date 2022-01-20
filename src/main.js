import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// 全局引入
import { globalRegister } from './global'

/* 引入config文件模块 */
import global_ from '@/global/config_global'

Vue.use(globalRegister)

Vue.config.productionTip = false

Vue.prototype.$http = axios
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

Vue.prototype.login = function (callback) {
  console.log('login:::')
  this.dataLoading = true
  let storage = window.localStorage
  let param = decodeURI(location.search)
  if (param == '') {
    let redirect =
      'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
      storage.getItem('appid') +
      '&redirect_uri=http%3A%2F%2F' +
      global_.domain +
      '%2f' +
      global_.clientName +
      '%3fappid%3d' +
      storage.getItem('appid') +
      '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    window.location.href = redirect
    console.log('redirect:::' + redirect)
    return
  } else {
    storage.setItem('codeAppID', param)
  }
  var REALTERMTYPE = ''
  let appid = ''
  let url = '/currencyLogin/login'
  console.log('param::' + param)
  if (param.indexOf('appid') != -1) {
    appid = param.substring(param.indexOf('=') + 1, param.indexOf('code') - 1)
    let code = param.substring(
      param.indexOf('code') + 5,
      param.indexOf('state') - 1
    )
    console.log('code::' + code)
    REALTERMTYPE = '微信预约点餐公众号'
    url =
      url +
      '?code=' +
      code +
      '&appid=' +
      appid +
      '&REALTERMTYPE=' +
      REALTERMTYPE
    storage.setItem('appid', appid)
  }
  if (appid.length < 18) {
    // 解决分享过来时获取不到appid的问题,从分享登录时存入sessionStorage中重新获取
    appid = storage.getItem('appid')
  }
  var that = this
  console.log('url:::' + url)
  // this.$http
  //   .get(`http://www.paytunnel.cn/orderFoodServerRH${url}`)
  //   .then(function (response) {
  //     console.log('response:::' + response.data)
  //     var rs = JSON.stringify(response.data)
  //     if (rs.indexOf('-11419') != -1) {
  //       // 则是没有注册
  //       that.regSchool('广西德保县惠保投资发展有限公司')
  //     } else {
  //       var userName = response.data.userName
  //       global_.token = response.data.token.token
  //       global_.userName = userName
  //       global_.openid = response.data.openid
  //       global_.TELLERCOMPANY = response.data.TELLERCOMPANY
  //       appid = response.data.appid
  //       /* --当刷新页面导致token不存在时,使用sessionStorage中的token-- */
  //       storage.setItem('token', global_.token)
  //       storage.setItem('openid', global_.openid)
  //       storage.setItem('memberID', global_.userName)
  //       storage.setItem('appid', appid)
  //       storage.setItem('TELLERCOMPANY', response.data.TELLERCOMPANY)
  //       that.schoolName = storage.getItem('TELLERCOMPANY')
  //       that.dataLoading = false
  //       that.getShopList()
  //       that.getBannerImages()
  //       that.getNotice()
  //       that.wxConfig()
  //       callback(true)
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error)
  //     callback(false)
  //   })
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
