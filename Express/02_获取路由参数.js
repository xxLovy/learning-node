const express = require('express')

const app = express()

app.get('/:id.html', (req, res) => {
    // 获取URL路由参数
    console.log(req.params.id)
    req.end(req.params.id)

})


app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})