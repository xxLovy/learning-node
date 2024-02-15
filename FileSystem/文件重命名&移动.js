const fs = require('fs')


// 重命名
fs.rename('./FileSystem/观书有感.txt', './FileSystem/guanshuyougan.txt', err => {
    if (err) {
        console.log('操作失败')
        return
    }
    console.log("操作成功")
})

// // 移动
// fs.rename('./FileSystem/观书有感.txt', './guanshuyougan.txt', err => {
//     if (err) {
//         console.log('操作失败')
//         return
//     }
//     console.log("操作成功")
// })