const axios = require('axios')

module.exports = ({ tokenUrl, clientID, clientSecret }) => {
  console.log(`tokenUrl:${tokenUrl}`)
  console.log(`clientID:${clientID}`)
  console.log(`clientSecret:${clientSecret}`)

  return {
    authAccountUser: ({ username, password }) => {
      console.info(`执行认证：client_id:${clientID},client_secret:${clientSecret},username:${username},password:${password}`)
      return axios.post(tokenUrl, {
        client_id: clientID,
        client_secret: clientSecret,
        grant_type: 'password',
        username,
        password,
        scope: 'SCOPE'
      })
        .then(response => {
          console.info('认证用户成功，结果：', response)
          return response.data
        })
        .catch(err => {
          console.info('认证用户失败，错误内容：', err)
          if (err && err.response && err.response.data && err.response.data.error_description) {
            let errorObj = new Error(err.response.data.error_description)
            errorObj.status = 519
            throw errorObj
          } else {
            let errorObj = new Error(
              err.message
            )
            errorObj.status = 500
            throw errorObj
          }
        })
    }
  }
}
