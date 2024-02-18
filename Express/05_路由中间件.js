const express = require('express')
const app = express()

app.get("/home", (req, res) => {

    res.send('front homepage')
});

let checkCodeMiddleware = (req, res, next) => {
    // 判断URL中code是否为521
    if (req.query.code === '521') {
        next()
    } else {
        res.send('暗号错误')
    }
}

app.get('/admin', checkCodeMiddleware, (req, res) => {
    if (res)
        res.send('end homepage')
})

app.get('/setting', checkCodeMiddleware, (req, res) => {
    res.send('setting page')
})

app.get('*', (req, res) => {
    res.send('<h1>404 NOT FOUND</h1>')
})


app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})