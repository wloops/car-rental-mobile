// 《车辆信息请求模块》
// 加载 request 模块
import { request } from '@/utils'
// export const hello = () => {
//   return requestHello({
//     method: 'GET',
//     url: '/hello/hello'
//   })
// }
// 获取价格信息
export const getPriceInfo = params => {
  return request({
    method: 'GET',
    url: '/shoppingCart/getPriceInfo',
    params,
  })
}
// 获取全部订单
export const getAllOrder = params => {
  return request({
    method: 'GET',
    url: '/search/queryMyAllCarOrders',
    params,
  })
}

// 获取未出行订单
export const getNotOutOrder = params => {
  return request({
    method: 'GET',
    url: '/search/queryMyCarOrdersOfNoTravel',
    params,
  })
}

// 创建订单
export const setCreatOrder = params => {
  return request({
    method: 'GET',
    url: '/shoppingCart/creatOrder',
    params,
  })
}

// (取消租车订单)ZCbtnCancelOrder
export const setCancelOrder = params => {
  return request({
    method: 'GET',
    url: '/insertReturn/ZCbtnCancelOrder',
    params,
  })
}

// (费用明细)queryMyCarOrderCostDtl
export const getOrderFeeDetailed = params => {
  return request({
    method: 'GET',
    url: '/search/queryMyCarOrderCostDtl',
    params,
  })
}

// (发送下单成功短信通知)ZCbtnsendSMSNotification
export const sendSMSNotification = data => {
  return request({
    method: 'POST',
    url: '/insertReturn/ZCbtnsendSMSNotification',
    data,
  })
}
