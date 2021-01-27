/**
 * 配置信息加载
 * @param {*} app
 */
// const path = require('path')
// const fs = require('fs')
const envDefault = require('./default.js')

const ENVKEY = 'env'

module.exports = (app) => {
  app.getEnv = () => {
    return app.get(ENVKEY) || {}
  }
  // 加载默认配置信息
  console.info(`process env:${process.env.NODE_ENV || 'dev'}`)
  const env = process.env.NODE_ENV || 'dev'
  const envConfig = require(`./${env}`)

  // 根据环境加载配置信息
  app.set(ENVKEY, { ...envDefault, ...envConfig })
}
