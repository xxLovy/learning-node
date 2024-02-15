const fs = require('fs')

const data = fs.readdirSync("./FileSystem")
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

// for (let i = 0; i < data.length; i++) {
//     const nowName = './FileSystem' + 'renamed' + data[i]
//     const newName = './FileSystem' + data[i]
//     fs.rename(nowName, newName, err => {
//         if (err) {
//             console('file' + nowName + '    renamed failed')
//         }
//         console.log(nowName + '    is successfully renamed to    ' + newName)
//     })
// }