const fs = require('fs')

fs.readFile('./FileSystem/Motto.txt', (err, data) => {
    if (err) {
        console.log('读取失败')
        return
    }
    console.log(data.toString())
})

let data = fs.readFileSync("./FileSystem/Motto.txt", "utf-8")
console.log(data)