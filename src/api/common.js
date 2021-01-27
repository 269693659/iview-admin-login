import axios from '@/libs/api.request'

// 获取控制编码
export const findCtrlCodeByDefSn = data => {
  return axios.request({
    url: '/core/admin/admin-user/login.do',
    data,
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

