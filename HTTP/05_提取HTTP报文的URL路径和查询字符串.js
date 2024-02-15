const http = require('http');
// 1. 导入URL模块
const url = require('url')

const server = http.createServer((request, response) => {
    // 2. 解析request.url
    let res = url.parse(request.url)
    // console.log(res)
    /*
    Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: null,
  pathname: '/',
  path: '/',
  href: '/'
}
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: null,
  pathname: '/favicon.ico',
  path: '/favicon.ico',
  href: '/favicon.ico'
}
    */

    // 路径
    let pathName = res.pathname
    // console.log(pathName)

    let res2 = url.parse(request.url, true)
    let keyword = res2.query.keyword
    console.log(keyword)

    response.end('url')
});

server.listen(9000, () => {
    console.log('服务已经启动, 端口 9000 监听中，运行在 http://127.0.0.1:9000 ...');
});
