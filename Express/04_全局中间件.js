const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

function recordMiddleware(req, res, next) {
    // 获取url和ip
    let { url, ip } = req
    // 将文件保存在access.log
    fs.appendFileSync(path.resolve(__dirname, './access.log'), `${url} ${ip}\r\n`)
    // 调用next
    next()
}

// 谁用中间件函数
app.use(recordMiddleware)


app.get("/home", (req, res) => {

    res.send('front homepage')
});

app.get('/admin', (req, res) => {
    res.send('end homepage')
})

app.get('*', (req, res) => {
    res.send('<h1>404 NOT FOUND</h1>')
})



app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})