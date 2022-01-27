// 《车辆信息请求模块》
// 加载 request 模块
import { request } from '@/utils'
// export const hello = () => {
//   return requestHello({
//     method: 'GET',
//     url: '/hello/hello'
//   })
// }

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
