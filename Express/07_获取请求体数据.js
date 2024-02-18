const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const parser = bodyParser.urlencoded({ extended: false })

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html')
})

app.post('/login', parser, (req, res) => {
    // 获取用户数据
    console.log(req.body)

    res.send('获取用户数据')
})

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})