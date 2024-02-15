const fs = require('fs')

fs.appendFile('./FileSystem/Motto.txt', '\r\nThis is the motto of life magazine', err => {
    if (err) {
        console.log("NotOK")
    }
    console.log("OK")
})



// fs.appendFileSync('./FileSystem/Motto.txt', '\r\nThis is the motto of life magazine')