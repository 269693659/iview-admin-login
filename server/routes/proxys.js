const express = require('express')
const router = express.Router()
const proxy = require('http-proxy-middleware')

module.exports = (app) => {
  const env = app.getEnv()
  console.info(`api url:${env.apiUrl}`)
  console.info(`api v0 url:${env.apiV0Url}`)

  // 权限检查
  router.use('/', require('../connect-ensure-login').ensureLoggedIn())

  router.use('/v0', proxy({
    target: env.apiV0Url,
    pathRewrite: {
      '^/api/v0': ''
    },
    changeOrigin: true,
    onProxyReq (proxyReq, req) {
      let token = ''
      if (req.user && req.user.token.access_token) {
        token = `Bearer ${req.user.token.access_token}`
      }
      if (req.user && req.user.inst && req.user.inst.id) {
        token = `${token}|${req.user.inst.id}`
      }
      if (req.user && req.user.instUser && req.user.instUser.id) {
        token = `${token}|${req.user.instUser.id}`
      }
      console.info(token)
      proxyReq.setHeader(
        'authorization',
        `Bearer ${token}`
      )
    }
  }))

  router.use('/', proxy({
    target: env.apiUrl,
    pathRewrite: {
      '^/api': ''
    },
    changeOrigin: true,
    onProxyReq (proxyReq, req) {
      if (req.user && req.user.token.access_token) {
        console.info(req.user.token.access_token)
        proxyReq.setHeader(
          'authorization',
          `Bearer ${req.user.token.access_token}`
        )
      }

      console.info(`Y9UserId:${req.user.user.id}`)
      // 根据机构设置当前机构和机构用户
      if (req.user && req.user.inst && req.user.inst.id) {
        proxyReq.setHeader('Y9InstId', `${req.user.inst.id}`)
        console.info(`Y9InstId:${req.user.inst.id}`)
      }
      if (req.user && req.user.instUser && req.user.instUser.id) {
        proxyReq.setHeader('Y9InstUserId', `${req.user.instUser.id}`)
        console.info(`Y9InstUserId:${req.user.instUser.id}`)
      }
    }
  }))

  return router
}
