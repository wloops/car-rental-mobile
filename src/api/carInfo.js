// 《车辆信息请求模块》
// 加载 request 模块
import { request } from '@/utils'
// export const hello = () => {
//   return requestHello({
//     method: 'GET',
//     url: '/hello/hello'
//   })
// }

// 获取车型分类
export const getVehicleType = () => {
  return request({
    method: 'GET',
    url: '/search/queryVehicleType',
  })
}
// 获取车型分类下的汽车
export const getVehicleOfType = params => {
  return request({
    method: 'GET',
    url: '/search/queryVehicleOfType',
    // Headers 参数使用 Headers 设置
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    params,
  })
}
// 获取汽车的图片
export const queryVehicleImages = params => {
  return request({
    method: 'GET',
    url: '/search/queryVehicleImages',
    // Headers 参数使用 Headers 设置
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    params,
  })
}
