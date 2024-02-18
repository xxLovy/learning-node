const express = require('express')
const router = express.Router()


router.get('/admin', (req, res) => {
    res.send('admin page')
})

router.get('/setting', (req, res) => {
    res.send('setting')
})

module.exports = router