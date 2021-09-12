const express = require('express')
const router = express.Router()

const db = require('../config/db')

router.get('/', (req, res) => {
    res.render('hidden.ejs', {user:req.session})
})

module.exports = router