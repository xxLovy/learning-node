const http = require('http')
const fs = require('fs')

const server = http.createServer((req, rep) => {
    fs.readFile('./p2.html', (err, data) => {
        if (err) {
            console.log('读取失败')
        }
        else {
            rep.writeHead(200, { 'Content-Type': 'text/html' })
            rep.write(data)
            console.log('读取成功')
            rep.end()
        }
        return
    })



})

server.listen(9000, () => {
    console.log('http://127.0.0.1:9000')
})