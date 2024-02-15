const fs = require('fs')

// write a motto to a text file
motto = 'To see the world, things dangerous to come to, to see behind walls, to draw closer, to find each other and to feel. That is the purpose of life'
fs.writeFile('./FileSystem/Motto.txt', motto, err => {
    // callback function
    if (err) {
        console.log('failed')
        return
    }
    console.log("succeeded")
})

console.log('this message goes first')
