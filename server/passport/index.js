
const passport = require('passport')
const LocalStategy = require('passport-local').Strategy
const Auth = require('./auth')
const Token = require('./token')
const SysCommonAuthAppJumpToken = require('../service/SysCommonAuthAppJumpToken')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  // 读取环境配置
  const passportEnv = app.getEnv().passport
  const authFactory = Auth(passportEnv)
  const tokenFactory = Token(passportEnv)
  const sysCommonAuthAppJumpToken = SysCommonAuthAppJumpToken(app.getEnv())

  // 帐号密码登录
  passport.use(
    'accountLogin',
    new LocalStategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // 允许将请求传递给回调方法
      },
      async (req, username, password, done) => {
        console.info('开始登录', username, password)
        try {
          // 获取token
          const token = await authFactory.authAccountUser({
            username,
            password
          })

          console.info('获取到TOKEN', token)

          // 获取通过token获取用户数据
          const user = await tokenFactory.verifyToken({
            token: token.access_token
          })
          console.log(user)
          console.info('获取到用户信息：', user)

          // 返回结果
          done(null, {
            token,
            user
          })
        } catch (e) {
          done(e)
        }
      }
    )
  )

  // 跳转token登录
  passport.use(
    'jumpTokenLogin',
    new LocalStategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // 允许将请求传递给回调方法
      },
      async (req, username, password, done) => {
        try {
          // 验证跳转token
          const token = await sysCommonAuthAppJumpToken.verify({
            token: password
          })

          // 获取通过token获取用户数据
          const user = await tokenFactory.verifyToken({
            token: token.access_token
          })

          // 返回结果
          done(null, {
            token,
            user
          })
        } catch (e) {
          if (e && e.response && e.response.data && e.response.data.message) {
            let error = Error(e.response.data.message)
            error.status = e.response.status
            done(error)
          } else {
            e.status = 200
            done(e)
          }
        }
      }
    )
  )

  app.post(
    '/auth/login',
    passport.authenticate('accountLogin', {
      // successRedirect: "/app/home",
      // failureRedirect: "/common/auth/login", //验证方法中如果发生用户找不到，或者密码错误都是直接带异常回调，所以不会到达失败回调，而是直接抛出异常
      // failureFlash: true,
      // successFlash: true
    }),
    (req, res) => {
      res.json({
        message: '登录成功!',
        success: true,
        user: req.session.passport.user.user
      })
    }
  )

  app.post(
    '/auth/jump/token/login',
    passport.authenticate('jumpTokenLogin', {
      // successRedirect: "/app/home",
      // failureRedirect: "/common/auth/login", //验证方法中如果发生用户找不到，或者密码错误都是直接带异常回调，所以不会到达失败回调，而是直接抛出异常
      // failureFlash: true,
      // successFlash: true
    }),
    (req, res) => {
      res.json({
        message: '登录成功!',
        success: true,
        user: req.session.passport.user.user
      })
    }
  )

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    // 查询用户信息
    done(null, user)
  })
}
