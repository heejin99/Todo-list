const express = require('express')
const router = express.Router()

const db = require('../config/db')

router.get('/main', (req, res) => {
    var sql = 'SELECT * FROM user'
    db.query(sql, (err, rows) => {
        if(err) return res.json({success: false, err})
        res.render('main.ejs', {list: rows, user:req.session})
    })
})


module.exports = router