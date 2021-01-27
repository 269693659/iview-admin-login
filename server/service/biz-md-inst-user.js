/**
 * 机构用户服务
 */
const axios = require('axios')

module.exports = ({ apiUrl }) => {
  return {
    async select ({ instId, token }) {
      if (!instId) return
      try {
        const instance = axios.create({
          baseURL: apiUrl,
          method: 'put',
          timeout: 5000
        })
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const response = await instance.put(`/md/inst/user/select/${instId}`)
        return response.data
      } catch (err) {
        throw err
        // throw new Error(
        //   err && err.response && err.response.data
        //     ? err.response.data.error_description
        //     : err.message
        // )
      }
    }
  }
}
