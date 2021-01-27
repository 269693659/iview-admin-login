/**
 * 系统跳转token服务
 */
const axios = require('axios')

module.exports = ({ apiUrl }) => {
  return {
    async gen ({ targetAppid, token }) {
      if (!token) return
      try {
        const instance = axios.create({
          baseURL: apiUrl,
          method: 'post',
          timeout: 5000
        })
        const response = await instance.post(`/sys/common/auth/app/jump/token/${targetAppid}/${instId}`)
        return response.data
      } catch (err) {
        throw err
      }
    },
    async verify ({ token }) {
      if (!token) return
      try {
        const instance = axios.create({
          baseURL: apiUrl,
          method: 'put',
          timeout: 5000
        })
        const response = await instance.put(`/sys/common/auth/app/jump/token/verify/${token}`)
        return response.data
      } catch (err) {
        throw err
      }
    }
  }
}
