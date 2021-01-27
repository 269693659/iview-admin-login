const Redis = require('redis')
const ExpressSession = require('express-session')
const RedisStore = require('connect-redis')(ExpressSession)

module.exports = (app) => {
  const env = app.getEnv()
  const { host, db, auth_pass, port, secret, resave, saveUninitialized, prefix } = env.redis
  const { maxAge } = env.session
  console.info(`redis,host:${host},db:${db},port:${port},prefix:${prefix}`)
  app.use(ExpressSession({
    secret,
    resave,
    saveUninitialized,
    store: new RedisStore({
      client: Redis.createClient(port, host, { db, auth_pass, prefix })
    }),
    cookie: {
      maxAge// 设置 session 的有效时间，单位毫秒
    }
  }))
}
