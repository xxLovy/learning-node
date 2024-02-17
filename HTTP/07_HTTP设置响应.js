const http = require('http')

// 响应头
/*
HTTP/1.1 200 OK
Date: Sat, 17 Feb 2024 01:04:28 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Content-Length: 2
 */

const server = http.createServer((res, rep) => {
    // 1. 设置响应状态码    200
    // rep.statusCode = 404

    // 2. 响应状态描述      OK
    rep.statusMessage = 'hi'

    // 3. 响应头
    // rep.setHeader(headerName, content)
    rep.setHeader('content-type', 'text/html;charset=utf-8')

    // 4. 响应体
    rep.write('write  ')
    rep.write('write  ')
    rep.write('write  ')
    rep.write('write  ')


    rep.end()
})

server.listen(9000, () => {
    console.log('http://127.0.0.1:9000')
})