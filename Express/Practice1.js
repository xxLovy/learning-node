const express = require('express')
const app = express()
const { singers } = require('./Singers')

app.get('/singer/:id.html', (req, res) => {

    let { id } = req.params
    let result = singers.find(item => {
        if (item.id === Number(id)) {
            return true
        }
    })

    // 判断是否合法
    if (!result) {
        res.statusCode = 404
        res.end('<h1>404 Not Found</h1>')
        return
    }

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>${result["singer_name"]}</h1>
        <img src="${result["singer_pic"]}" alt="">
        <h2>${result["other_name"]}</h2>
        <h2>把你的爱给${result["singer_id"]}号</h2>
    </body>
    </html>
    `
    res.end(html)
})

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})