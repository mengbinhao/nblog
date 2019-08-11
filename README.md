### nblog

#### dev env
- Node.js
- MongoDB
- [Express-generate](https://github.com/expressjs/generator)
- jQuery + Semantic-UI


#### libs
- express: web 框架
- express-session: session 中间件(session 中间件会在 req 上添加 session 对象，即 req.session 初始值为 {}，当我们登录后设置 req.session.user = 用户信息，返回浏览器的头信息中会带上 set-cookie 将 session id 写到浏览器 cookie 中，那么该用户下次请求时，通过带上来的 cookie 中的 session id 我们就可以查找到该用户，并将用户信息保存到 req.session.user)
- connect-mongo: 将 session 存储于 mongodb，结合 express-session 使用
- connect-flash: 页面通知的中间件(connect-flash 是基于 session 实现的，它的原理很简单：设置初始值 req.session.flash={}，通过 req.flash(name, value) 设置这个对象下的字段和值，通过 req.flash(name) 获取这个对象下的值，同时删除这个字段，实现了只显示一次刷新后消失的功能)
- ejs: 模板
- express-formidable: 接收表单及文件上传的中间件
- config-lite: 读取配置文件
- marked: markdown 解析
- moment: 时间格式化
- objectid-to-timestamp: 根据 ObjectId 生成时间戳
- sha1: sha1 加密，用于密码加密
- winston: 日志
- express-winston: express 的 winston
- pm2? cookies? markdown?

> express-session: 会话（session）支持中间件
>
> connect-mongo: 将 session 存储于 mongodb，需结合 express-session 使用，我们也可以将 session 存储于 redis，如 connect-redis
>
> connect-flash: 基于 session 实现的用于通知功能的中间件，需结合 express-session 使用


#### 功能及路由设计

- 注册
  - 注册页：GET /signup
  - 注册（包含上传头像）：POST /signup
- 登录
  - 登录页：GET /signin
  - 登录：POST /signin
- 登出：GET /signout
- 查看文章
  - 主页：GET /posts
  - 个人主页：GET /posts?author=xxx
  - 查看一篇文章（包含留言）：GET /posts/:postId
- 发表文章
  - 发表文章页：GET /posts/create
  - 发表文章：POST /posts/create
- 修改文章
  - 修改文章页：GET /posts/:postId/edit
  - 修改文章：POST /posts/:postId/edit
- 删除文章：GET /posts/:postId/remove
- 留言
  - 创建留言：POST /comments
  - 删除留言：GET /comments/:commentId/remove