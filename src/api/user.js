// 《用户请求模块》
// 加载 request 模块
import { request } from '@/utils'
// export const hello = () => {
//   return requestHello({
//     method: 'GET',
//     url: '/hello/hello'
//   })
// }
// 检查登录状态
export const checkLogin = () => {
  return request({
    method: 'GET',
    url: '/app/checkLogin',
  })
}
// 退出登录
// export const setLogout = () => {
//   return request({
//     method: 'GET',
//     url: '/app/appLogout',
//   })
// }
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
export const addMyAddress = params => {
  return request({
    method: 'GET',
    url: '/insertReturn/ZCbtnAddMemberAddr',
    params,
  })
}
// 修改我的地址
export const updateMyAddress = params => {
  return request({
    method: 'GET',
    url: '/insertReturn/ZCbtnModifyMemberAddr',
    params,
  })
}
// 删除我的地址
export const deleteMyAddress = params => {
  return request({
    method: 'GET',
    url: '/insertReturn/ZCbtnDeleteMemberAddr',
    params,
  })
}
