import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import JSEncrypt from 'jsencrypt'
import wx from 'weixin-js-sdk'
// 全局引入
import { globalRegister } from './global'

/* 引入config文件模块 */
import global_ from '@/global/config_global'

import { checkLogin } from '@/api/user'
// import { BASE_URL } from '@/global/config'

Vue.use(globalRegister)

Vue.config.productionTip = false

Vue.prototype.$http = axios
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

// axios.defaults.baseURL = 'http://www.paytunnel.cn/carRentalServerRH/'

//JSEncrypt加密方法
Vue.prototype.encryptedData = function (publicKey, password) {
  //new一个对象
  let encrypt = new JSEncrypt()
  //设置公钥
  encrypt.setPublicKey(publicKey)
  //password是要加密的数据,此处不用注意+号,因为rsa自己本身已经base64转码了,不存在+,全部是二进制数据
  let result = encrypt.encrypt(password)
  return result
}

//JSEncrypt解密方法
Vue.prototype.decryptData = function (privateKey, secretWord) {
  // 新建JSEncrypt对象
  let decrypt = new JSEncrypt()
  // 设置私钥
  decrypt.setPrivateKey(privateKey)
  // 解密数据
  let result = decrypt.decrypt(secretWord)
  return result
}
Vue.prototype.PrefixZero = function (num, n) {
  return (Array(n).join(0) + num).slice(-n)
}
Vue.prototype.stringToHex = function (str) {
  var val = ''
  for (var i = 0; i < str.length; i++) {
    var temp = str.charCodeAt(i).toString(16)
    if (temp.length == 1) {
      val += '0' + temp
    } else {
      val += temp
    }
  }
  return val.toUpperCase()
}
Vue.prototype.getPK = function () {
  var that = this
  this.$http
    .post('http://www.paytunnel.cn/carRentalServerRH/app/getPK')
    .then(function (response) {
      //请求成功
      var result = response.data
      that.pkbase64 = result.pkkey
    })
    .catch(function (error) {
      //请求失败
      console.log('error:' + error)
    })
}
Vue.prototype.PARAMETER = function () {
  let storage = window.sessionStorage
  if (global_.token == '' || global_.token == undefined) {
    global_.token = storage.getItem('token')
  }
  if (global_.memberID == '' || global_.memberID == undefined) {
    global_.memberID = storage.getItem('memberID')
  }
  if (global_.appId == '' || global_.appId == undefined) {
    global_.appId = storage.getItem('appId')
  }
  if (global_.nickName == '' || global_.nickName == undefined) {
    global_.nickName = storage.getItem('nickName')
  }
}
// 检测是否登陆。
Vue.prototype.checklogin = function (callback) {
  // this.dataLoading = true
  var that = this
  // let url = 'https://' + global_.domain + '/orderFoodServerRH/app/checkLogin'
  // $.ajax({
  //   url: url,
  //   type: 'get', // GET
  //   async: false, // 或false,是否异步
  //   data: {},
  //   timeout: 5000, // 超时时间
  //   dataType: 'json', // 返回的数据格式：
  //   success: function (response, textStatus, jqXHR) {

  checkLogin().then(function (response) {
    //请求成功
    console.log('checkLogin response:', response)
    var userName = response.data.memberID
    let storage = window.localStorage
    // that.dataLoading = false
    // if (userName != 'null') {
    // console.log('userName', userName)
    // var nickName = response.data.TELLERNAME
    // global_.userName = userName
    // global_.nickName = nickName
    // global_.TELLERCOMPANY = response.data.TELLERCOMPANY
    // global_.TELLERROLE = response.data.TELLERROLE
    // global_.token = response.data.token.token
    // storage.setItem('token', global_.token)
    // storage.setItem('memberID', global_.userName)
    // storage.setItem('TELLERROLE', response.data.TELLERROLE)
    // window.location.href = global_.clientUrl;
    // that.$router.go(0);
    // } else {
    // storage.removeItem('TELLERROLE')
    if (userName === 'null') {
      storage.removeItem('memberID')
      storage.removeItem('nickName')
      console.log('memberID', window.localStorage.getItem('memberID'))
    }

    that.isLoading = false
    // storage.removeItem('token')
    // window.location.href = global_.clientUrl+"#/loginSorterNew";

    // that.login();
    // }
    // },
    // error: function (xhr, textStatus) {},
    // complete: function () {},
  })
}
Vue.prototype.DialogAlert = function (title, message) {
  Dialog.alert({
    closeOnPopstate: true,
    title: title,
    message: message,
  }).then(() => {})
}
Vue.prototype.regSchool = function (schoolName) {
  var that = this
  this.$http
    .get('/schReg/register3rdPartyMmbID?companyName=' + schoolName)
    .then(function (response) {
      //请求成功
      that.schoolList = response.data.register3rdPartyMmbID
      var storage = window.localStorage
      var redirect =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
        storage.getItem('appid') +
        '&redirect_uri=http%3A%2F%2F' +
        global_.domain +
        '%2f' +
        global_.projectName +
        '%3fappid%3d' +
        storage.getItem('appid') +
        '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      window.location.href = redirect
    })
    .catch(function (error) {
      //请求失败
      console.log('error:' + error)
    })
}
//wxConfig的
Vue.prototype.wxConfig = function () {
  var url = encodeURIComponent(location.href.split('#')[0])
  var that = this
  this.$http
    .get(
      'http://www.paytunnel.cn/carRentalServerRH/getJSSDKSignature?url=' + url
    )
    .then(function (res) {
      var appId = res.data.appId
      var timestamp = res.data.timestamp
      var nonceStr = res.data.nonceStr
      var signature = res.data.signature
      console.log('wx.config', res)
      that.appId = appId
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名
        jsApiList: ['onMenuShareAppMessage', 'addCard', 'scanQRCode'], // 必填，需要使用的JS接口列表
      })
    })
    .catch(function (error) {
      alert(error)
    })
}

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
  this.$http
    .get(`http://www.paytunnel.cn/carRentalServerRH${url}`)
    .then(function (response) {
      console.log('response.status:::', response)
      console.log('response.data:::', response.data)
      var rs = JSON.stringify(response.data)
      if (rs.indexOf('-11419') != -1) {
        // 则是没有注册
        that.regSchool('广西德保县惠保投资发展有限公司')
      } else {
        var userName = response.data.userName
        global_.token = response.data.token.token
        global_.userName = userName
        global_.openid = response.data.openid
        global_.TELLERCOMPANY = response.data.TELLERCOMPANY
        appid = response.data.appid
        /* --当刷新页面导致token不存在时,使用sessionStorage中的token-- */
        storage.setItem('token', global_.token)
        storage.setItem('openid', global_.openid)
        storage.setItem('memberID', global_.userName)
        storage.setItem('appid', appid)
        storage.setItem('TELLERCOMPANY', response.data.TELLERCOMPANY)
        that.schoolName = storage.getItem('TELLERCOMPANY')
        that.dataLoading = false
        that.getShopList()
        that.getBannerImages()
        that.getNotice()
        that.wxConfig()
        callback(true)
      }
    })
    .catch(function (error) {
      console.log(error)
      callback(false)
    })
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
