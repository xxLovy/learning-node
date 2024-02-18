const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()


const parser = bodyParser.urlencoded({ extended: false })
router.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html')
})
router.post('/login', parser, (req, res) => {
    // 获取用户数据
    console.log(req.body)
    res.send('获取用户数据')
})

router.get('/home', (req, res) => {
    res.send('home')
})

module.exports = router