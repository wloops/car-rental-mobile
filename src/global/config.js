// 1.方式一: 手动的切换不同的环境(不推荐)
// const BASE_URL = 'http://coderwhy.org/dev'
// const BASE_NAME = 'coderwhy'

// const BASE_URL = 'http://coderwhy.org/prod'
// const BASE_NAME = 'kobe'

// const BASE_URL = 'http://coderwhy.org/test'
// const BASE_NAME = 'james'

// 2.根据process.env.NODE_ENV区分
// 开发环境: development
// 生成环境: production
// 测试环境: test
let storage = window.localStorage
let param = decodeURI(location.search)
let appid = ''
let code = ''
let REALTERMTYPE = ''
let REALUSERNAME = ''
if (param.indexOf('appid') != -1) {
  let params = param.split('&')
  params.forEach((item, index, err) => {
    if (item.indexOf('appid') != -1) {
      appid = item.substring(item.indexOf('=') + 1)
    }
    if (item.indexOf('REALTERMTYPE') != -1) {
      REALTERMTYPE = item.substring(item.indexOf('=') + 1)
    }
    if (item.indexOf('REALUSERNAME') != -1) {
      REALUSERNAME = item.substring(item.indexOf('=') + 1)
    }
    if (item.indexOf('code') != -1) {
      code = item.substring(item.indexOf('=') + 1)
    }
  })
  storage.setItem('appid', appid)

  console.log('appid::' + appid)
  console.log('code::' + code)
  console.log('REALTERMTYPE::' + REALTERMTYPE)
  console.log('REALUSERNAME::' + REALUSERNAME)

  storage.setItem('REALUSERNAME', REALUSERNAME)
}

let BASE_URL = ''
let BASE_DOMAIN = ''
let BASE_COMNAME = ''
let BASE_TO_HREF = ''
const TIME_OUT = 10000

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://www.paytunnel.cn/carRentalServerRH'
  BASE_DOMAIN = 'http://www.paytunnel.cn'
  BASE_COMNAME = window.localStorage.getItem('REALUSERNAME')
} else if (process.env.NODE_ENV === 'production') {
  // 测试环境
  // BASE_URL = 'http://www.paytunnel.cn/carRentalServerRH'
  // BASE_DOMAIN = 'http://www.paytunnel.cn'
  // BASE_TO_HREF = 'http://www.paytunnel.cn/carRentalAdmin'
  // BASE_TO_HREF =
  //   'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx24b187addab6fbae&redirect_uri=http%3A%2F%2Fwww.paytunnel.cn%2FcarRentalAdmin%2F%3fappid%3dwx24b187addab6fbae%26free=no%26REALTERMTYPE=%e5%be%ae%e4%bf%a1%e9%a2%84%e7%ba%a6%e7%82%b9%e9%a4%90%e5%85%ac%e4%bc%97%e5%8f%b7%26REALUSERNAME=%E5%B9%BF%E5%B7%9E%E7%9D%BF%E9%A2%A2%E8%BD%AF%E4%BB%B6%E6%8A%80%E6%9C%AF%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect'
  // 生产环境
  BASE_URL = 'http://www.gxgscloud.cn/carRentalServerRH'
  BASE_DOMAIN = 'http://www.gxgscloud.cn'
  BASE_TO_HREF = 'http://www.gxgscloud.cn/carRentalAdmin'
  // BASE_TO_HREF =
  //   'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2bf86b9529a35b87&redirect_uri=http%3A%2F%2Fwww.gxgscloud.cn%2FcarRentalAdmin%2F%3fappid%3dwx2bf86b9529a35b87%26free=no%26REALTERMTYPE=%e5%be%ae%e4%bf%a1%e9%a2%84%e7%ba%a6%e7%82%b9%e9%a4%90%e5%85%ac%e4%bc%97%e5%8f%b7%26REALUSERNAME=%E5%B9%BF%E8%A5%BF%E5%BE%B7%E4%BF%9D%E6%99%9F%E8%8D%A3%E6%B1%BD%E8%BD%A6%E6%9C%8D%E5%8A%A1%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect'

  BASE_COMNAME = window.localStorage.getItem('REALUSERNAME')
} else {
  BASE_URL = 'http://www.paytunnel.cn/carRentalServerRH'
  BASE_DOMAIN = 'http://www.paytunnel.cn'
  BASE_COMNAME = window.localStorage.getItem('REALUSERNAME')
}

console.log('BASE_COMNAME::' + BASE_COMNAME)

export { BASE_URL, BASE_DOMAIN, BASE_COMNAME, BASE_TO_HREF, TIME_OUT }
