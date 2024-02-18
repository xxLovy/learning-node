const express = require('express')
const app = express()
const adminRouter = require('./routers/adminHomepage')
const homeRouter = require('./routers/frontHomepage')

app.use(adminRouter)
app.use(homeRouter)

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})