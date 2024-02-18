const express = require('express')
const app = express()

// 静态资源中间件设置
app.use(express.static(__dirname + '/public'))

app.get("/home", (req, res) => {
    res.send('front homepage')
});

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})