import axios from 'axios'
import store from '@/store'
import { getToken } from '@/libs/util'
import Qs from 'qs'
const addErrorLog = errorInfo => {
  const { statusText, status, data, request: { responseURL }, config } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL,
    method: config.method,
    response: JSON.stringify(data),
    data: config.data
  }
  if (!responseURL.includes('sys/common/error/logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      timeout: 60000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      // if (!Object.keys(this.queue).length) {
      //   // Spin.show() // 不建议开启，因为界面不友好
      // }
      let token = getToken()
      if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.authorization = `Bearer ${token}` // 请求头加上token
      }
      if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        config.data = Qs.stringify(config.data)
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      // this.destroy(url)
      const { data, status } = res
      return { data, status }
    }, error => {
      // this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
