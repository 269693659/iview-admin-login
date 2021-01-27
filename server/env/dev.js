// 单点登录正式的请求配置，测试的换取用户信息地址
// 生产要求配置
// module.exports = {
//   passport: {
//     clientID: 'Y9MOAUEH7NC7',
//     clientSecret: 'flzwRUo4sHmOQX0rkG1udrPpLVvsrn',
//     tokenUrl: 'http://172.31.100.36:9189/oauth/token',
//     verifyUrl: 'http://172.31.100.36:8900/sys/common/auth/access/token/verify/'
//   },
//   apiUrl: 'http://172.31.100.36:8900',
//   apiV0Url: 'http://172.31.100.36:8762',
//   redis: {
//     host: '172.31.100.36',
//     port: 6389,
//     db: 10,
//     auth_pass: 'sybase12',
//     secret: 'Gi6zDvtS5!AC4hV13Wv@H9kl5^@ItBl0',
//     resave: false,
//     saveUninitialized: false,
//     prefix: 'ms_admin_'
//   },
//   session: {
//     maxAge: 1000 * 60 * 60 * 15 // 15小时session
//   }
// }

module.exports = {
  passport: {
    clientID: 'Y9TA03PLU2X3',
    clientSecret: 'bVJLR369fT4JCZvj7F4KQElLzzEy52',
    tokenUrl: 'https://auth2-test.yun9.com/oauth/token',
    verifyUrl: 'https://api-test.yun9.com/sys/common/auth/access/token/verify/'
  },
  apiUrl: 'https://api-test.yun9.com',
  apiV0Url: 'http://172.31.100.36:8762',
  redis: {
    host: 'test01.yun9.com',
    port: 6379,
    db: 10,
    auth_pass: 'sybase12',
    secret: 'Gi6zDvtS5!AC4hV13Wv@H9kl5^@ItBl0',
    resave: false,
    saveUninitialized: false,
    prefix: 'dev_ms_admin_'
  },
  session: {
    maxAge: 1000 * 60 * 60 * 24 * 15 // 15天session
  }
}
