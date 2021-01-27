import axios from '@/libs/api.request'

export const login = data => {
  return axios.request({
    url: '/core/admin/admin-user/login.do',
    data,
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

// 验证码获取
export const validate = params => {
  return axios.request({
    url: `/validcode`,
    params,
    method: 'get',
    responseType: 'blob'
  })
}

export const loginJump = data => {
  return axios.request({
    url: '/auth/jump/token/login',
    data,
    method: 'post'
  })
}

// export const logout = () => {
//   return axios.request({
//     url: '/auth/logout',
//     method: 'post'
//   })
// }

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
