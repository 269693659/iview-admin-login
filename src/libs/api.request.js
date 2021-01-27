import HttpRequest from '@/libs/axios'
const baseUrl = process.env.VUE_APP_BASEURL

const axios = new HttpRequest(baseUrl)
export default axios
