// 《车辆信息请求模块》
// 加载 request 模块
import { request } from '@/utils'
// export const hello = () => {
//   return requestHello({
//     method: 'GET',
//     url: '/hello/hello'
//   })
// }
// 退出登录
export const setLogout = () => {
  return request({
    method: 'GET',
    url: '/app/appLogout',
  })
}
// 获取我的地址
export const getMyAddress = () => {
  return request({
    method: 'GET',
    url: '/search/queryMyAddr',
  })
}
// 获取我的默认地址
export const getMyDefaultAddress = () => {
  return request({
    method: 'GET',
    url: '/search/queryMyDefaultAddr',
  })
}
// 新增我的地址
export const setAddMyAddress = params => {
  return request({
    method: 'GET',
    url: '/insertReturn/ZCbtnAddMemberAddr',
    params,
  })
}
// 修改我的地址
// 删除我的地址
