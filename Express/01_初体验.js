const express = require('express')

const app = express()

app.get('/request', (req, res) => {
    // 原生操作
    console.log(req.method)
    console.log(req.url)
    console.log(req.httpVersion)
    console.log(req.headers)

    // express
    console.log(req.path)
    console.log(req.query)
    // 获取IP
    console.log(req.ip)
    // 获取请求头
    console.log(req.get('host'))


    res.end('Hi this is OMEN')
})


app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})