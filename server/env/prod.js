// 生产要求配置
module.exports = {
  passport: {
    clientID: 'Y9MOAUEH7NC7',
    clientSecret: 'flzwRUo4sHmOQX0rkG1udrPpLVvsrn',
    // tokenUrl: 'http://172.31.100.36:9189/oauth/token',
    tokenUrl: 'http://172.31.100.157:9189/oauth/token',
    verifyUrl: 'http://172.31.100.36:8900/sys/common/auth/access/token/verify/'
  },
  apiUrl: 'http://172.31.100.36:8900',
  apiV0Url: 'http://172.31.100.36:8762',
  redis: {
    host: '172.31.100.36',
    port: 6389,
    db: 10,
    auth_pass: 'sybase12',
    secret: 'Gi6zDvtS5!AC4hV13Wv@H9kl5^@ItBl0',
    resave: false,
    saveUninitialized: false,
    prefix: 'ms_admin_'
  },
  session: {
    maxAge: 1000 * 60 * 60 * 15 // 15小时session
  }
}
