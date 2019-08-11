const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const config = require('config-lite')(__dirname)
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')

require('./db/mongo')

const routes = require('./routes')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// session 中间件
app.use(
  session({
    name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, //true mens force update session, false means don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: {
      maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({
      // 将 session 存储到 mongodb
      url: config.mongodb // mongodb
      //touchAfter: 24 * 3600 // time period in seconds
    })
  })
)
// flash 中间件，用来显示通知
app.use(flash())

// 处理表单及文件上传的中间件
app.use(
  require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
    keepExtensions: true // 保留后缀
  })
)

// 设置模板全局常量
app.locals.blog = {
  title: config.title,
  description: config.description
}

// 添加模板必需的三个变量
app.use(function(req, res, next) {
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})

// load routes
routes(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
