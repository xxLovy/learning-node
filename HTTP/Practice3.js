const http = require('http')
const fs = require('fs')

const server = http.createServer((req, rep) => {
    // 获取url路径
    let { pathname } = new URL(req.url, 'http://127.0.0.1')

    if (pathname === '/') {
        // 读取html文件内容
        fs.readFile(__dirname + '/p2.html', (err, html) => {
            if (err) {
                console.log('读取失败')
            }
            else {
                rep.writeHead(200, { 'Content-Type': 'text/html' })
                rep.write(html)
                console.log('读取成功')
                rep.end()
            }
            return
        })
    } else if (pathname === '/p2.css') {
        fs.readFile(__dirname + '/p2.css', (err, css) => {
            if (err) {
                console.log('读取失败')
            }
            else {
                rep.write(css)
                console.log('读取成功')
                rep.end()
            }
            return
        })
    } else {
        rep.statusCode = 404
        rep.end('<h1>404 Not Found</h1>')
    }


})

server.listen(9000, () => {
    console.log('http://127.0.0.1:9000')
})