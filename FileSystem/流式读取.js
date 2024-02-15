const fs = require('fs')

const filePath = ''
const rs = fs.createReadStream(filePath)


// 绑定data事件 chunk是从文件中读取的内容，为Buffer类型
rs.on('data', chunk => {
    console.log(chunk)
})

// end事件（可选）
rs.on('end', () => {
    console.log('读取完成')
})