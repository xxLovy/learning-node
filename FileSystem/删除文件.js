const fs = require('fs')
path = ''

// unlink方法
fs.unlink(path, err => {
    if (err) {
        console.log("删除失败")
    }
    console.log("删除成功")
})

// rm方法默认递归删除目录
fs.rm(path, err => {
    if (err) {
        console.log("删除失败")
    }
    console.log("删除成功")
})

