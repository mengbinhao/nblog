#### 1 解析参数
- req.query: 解析后的 url 中的 querystring，如 ?name=haha，req.query 的值为 {name: 'haha'}
- req.params: 解析 url 中的占位符，如 /:name，访问 /haha，req.params 的值为 {name: 'haha'}
- req.body: 解析后请求体，需使用相关的模块，如 body-parser，请求体为 {"name": "haha"}，则 - req.body 为 {name: 'haha'}

#### 2 ejs
- `<% code %>`: 运行 JavaScript 代码，不输出
- `<%= code %>`: 显示转义后的HTML内容
- `<%- code %>`: 显示原始HTML内容
- `<%- include('header') %>`

#### 3 express
```javascript
//middleware(注意顺序)
const express = require('express')
const app = express()

//next error不会继续向下执行中间件，除非如下定义错误处理中间件
app.use(function (req, res, next) {
  console.log('1')
  next(new Error('haha'))
})

app.use(function (req, res, next) {
  console.log('2')
  res.status(200).end()
})

//错误处理
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

#### 4 session/cookie/Token
- cookie 存储在浏览器（有大小限制），session 存储在服务端（没有大小限制）
- 通常 session 的实现是基于 cookie 的，session id 存储于 cookie 中
- session 更安全，cookie 可以直接在浏览器查看甚至编辑

> cookie由服务器生成，发送给浏览器，浏览器把cookie以kv形式保存到某个目录下的文本文件内，下一次请求同一网站时会把该cookie发送给服务器。由于cookie是存在客户端上的，所以浏览器加入了一些限制确保cookie不会被恶意使用，同时不会占据太多磁盘空间，所以每个域的cookie数量是有限的

> 服务器要知道当前发请求给自己的是谁。为了做这种区分，服务器就要给每个客户端分配不同的“身份标识”，然后客户端每次向服务器发请求的时候，都带上这个“身份标识”，服务器就知道这个请求来自于谁了。至于客户端怎么保存这个“身份标识”，可以有很多种方式，对于浏览器客户端，大家都默认采用 cookie 的方式
>
> 服务器使用session把用户的信息临时保存在了服务器上，用户离开网站后session会被销毁。这种用户信息存储方式相对cookie来说更安全，可是session有一个缺陷：如果web服务器做了负载均衡，那么下一个操作请求到了另一台服务器的时候session会丢失

- 基于服务器验证方式暴露的一些问题
  - Seesion：每次认证用户发起请求时，服务器需要去创建一个记录来存储信息。当越来越多的用户发请求时，内存的开销也会不断增加
  - 可扩展性：在服务端的内存中使用Seesion存储登录信息，伴随而来的是可扩展性问题
  - CORS(跨域资源共享)：当我们需要让数据跨多台移动设备上使用时，跨域资源的共享会是一个让人头疼的问题在使用Ajax抓取另一个域的资源，就可以会出现禁止请求的情况
  - SRF(跨站请求伪造)：用户在访

##### token
- 无状态、可扩展
- 支持移动设备
- 跨程序调用
- 安全

基于Token的身份验证的过程如下:

1. 用户通过用户名和密码发送请求
2. 程序验证
3. 程序返回一个签名的token 给客户端
4. 客户端储存token,并且每次用于每次发送请求
5. 服务端验证token并返回数据

#### 5. node
1. require
- 相对`require(./x.js)`
- 绝对`require(/x/y/z.js)`
- `require(x.js)` 加载核心模块
- 加载机制顺序`require(./2)`不加扩展名字 -> .js > .json > .node

2. module.exports and exports
- module.exports === exports
- require进来的其实就是module.exports
- 不要切断module.exports和exports之间的关系

3. __filename and __dirname(都是当前模块解析过后的绝对路径)
4. process
- provess.env
- process.argv
- process.stdin
- process.stdout
- process.chdir(directory)
- process.cwd()
- process.exit([code])
- process.kill(pid[, signal])
- process.abort()
5. buffer
- buf.write(string[, offset[, length]][, encoding])
- buf.toString([encoding[, start[, end]]])
- buf.toJSON()
- buf.slice([start[, end]])
- buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
- Buffer.concat(list[, totalLength])
- Buffer.isEncoding(encoding)
- Buffer.isBuffer(obj)
- Buffer.byteLength(string[, encoding]) 字符串长度 / 字节长度
6. File System(一般都有同步异步两种)
- fs.open(path[, flags[, mode]], callback)
- fs.read(fd, buffer, offset, length, position, callback)
- fs.write(fd, buffer[, offset[, length[, position]]], callback)
- fs.write(fd, string[, position[, encoding]], callback)
- fs.close(fd, callback)
- fs.writeFile(file, data[, options], callback)
- fs.appendFile(path, data[, options], callback)
- fs.readFile(path[, options], callback)
- fs.unlink(path, callback)
- fs.rename(oldPath, newPath, callback)
- fs.stat(path[, options], callback)
- fs.watch(filename[, options][, listener])
- fs.mkdir(path[, options], callback)
- fs.readdir(path[, options], callback)
- fs.rmdir(path, callback)
7. HTTP
- http.createServer([options][, requestListener])
- server.listen()
- request http.IncomingMessage的一个实例
  - httpVersion
  - headers
  - url
  - method
- response http.ServerResponse
  - response.setHeader(name, value)
  - response.writeHead(statusCode[, statusMessage][, headers]) //end之前调用,只能调用一次
  - response.write(chunk[, encoding][, callback])
  - response.statusCode
  - response.end([data][, encoding][, callback]) 必须最后调用
8. URL
- url.parse(urlString[, parseQueryString[, slashesDenoteHost]])
9. Query String(for post method)
- querystring.parse(urlStr.query)