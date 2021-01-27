const axios = require('axios')

module.exports = ({ verifyUrl }) => {
  return {
    verifyToken: async ({ token }) => {
      const response = await axios.get(`${verifyUrl}/${token}`)
      return response.data
    }
  }
}
