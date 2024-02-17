/**
 * 创建一个 HTTP 服务，端口为 9000，满足如下需求
 * GET  /index.html        响应  page/index.html 的文件内容
 * GET  /css/app.css       响应  page/css/app.css 的文件内容
 * GET  /images/BlackholeCat.jpg   响应  page/images/BlackholeCat.jpg 的文件内容
 */
const http = require('http')
const fs = require('fs')
const path = require('path')
let mimes = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  png: 'image/png',
  jpg: 'image/jpeg',
  gif: 'image/gif',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg',
  json: 'application/json'
}

const server = http.createServer((req, rep) => {
  let { pathname } = new URL(req.url, 'http://127.0.0.1')
  let { method } = req

  const root = __dirname + '/page'
  let filePath = root + pathname
  fs.readFile(filePath, (err, data) => {
    if (req.method !== 'GET') {
      rep.statusCode = 405
      rep.end('<h1>405 METHOD NOT ALLOWED</h1>')
      return
    }
    if (err) {
      switch (err.code) {
        case 'ENOENT':
          rep.statusCode = 404
          rep.end('<h1>404 NOT FOUND</h1>')
          break
        case 'EPERM':
          rep.statusCode = 403
          rep.end('<h1>403 FORBIDDEN</h1>')
          break
      }
      return
    }
    // 获取文件后缀
    let ext = path.extname(filePath).slice(1)
    // 获取对应的类型
    let type = mimes[ext]
    if (type) {
      rep.setHeader('content-type', type)
    } else {
      rep.setHeader('content-type', 'application/octet-stream')
    }

    rep.end(data)
  })

})

server.listen(9000, () => {
  console.log('http://127.0.0.1:9000')
})