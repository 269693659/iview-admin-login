const express = require('express')
const path = require('path')
const proxys = require('./routes/proxys')
const user = require('./routes/user')
const passport = require('./passport')
const env = require('./env')
const history = require('connect-history-api-fallback')
const compression = require('compression')
const bodyParser = require('body-parser')
const session = require('./session')

const app = express()
// 使用gzip压缩
app.use(compression())

// 加载配置
env(app)

// 设置session
session(app)

app.use(history())
app.use(express.static(path.join(__dirname, 'public')))
// 转发不能解析body,否则会出现post 时出现
// "Resolved [org.springframework.http.converter.HttpMessageNotReadableException: I/O error while reading input message; nested exception is org.apache.catalina.connector.ClientAbortException: java.net.SocketTimeoutException]"
app.use(['/auth'], bodyParser.json())
app.use(['/auth'], bodyParser.urlencoded({ extended: false }))

// 设置passport
passport(app)

// 用户
app.use(['/auth'], user(app))

// api
app.use(['/api', '/md'], proxys(app))

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.exception = req.app.get('env') === 'dev' ? err : err.stack
  // render the error page
  res.status(err.status || 500)
  // next(err);
  res.json(res.locals)
})

app.listen(9899, () => console.log('start on 9899!'))
