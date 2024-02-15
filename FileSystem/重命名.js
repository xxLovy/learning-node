const fs = require('fs')

const data = fs.readdirSync("./FileSystem")

//重命名
for (let i = 0; i < data.length; i++) {
    const nowName = './FileSystem/' + data[i]
    const newName = './FileSystem/' + 'renamed_' + data[i]
    fs.rename(nowName, newName, err => {
        if (err) {
            console.log('\r\nfile    ' + nowName + '    renamed failed')
            return
        }
        console.log('\r\n' + nowName + '    \r\tis successfully renamed to    \r\t' + newName)
        return
    })
}


// // 删除重命名
// for (let i = 0; i < data.length; i++) {
//     const nowName = './FileSystem/' + data[i]
//     const newName = './FileSystem/' + data[i].slice(8)
//     fs.rename(nowName, newName, err => {
//         if (err) {
//             console.log('\r\nfile    ' + nowName + '    renamed failed')
//             return
//         }
//         console.log('\r\n' + nowName + '    \r\tis successfully renamed to    \r\t' + newName)
//         return
//     })
// }