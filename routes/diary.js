const express = require('express')
const router = express.Router()

const db = require('../config/db')

router.get('/diary', (req, res) => {
    var sql = 'SELECT * FROM diary'
    db.query('SELECT * FROM user', (err, row) => {
        db.query(sql, (errr, rows) => {
            if(errr) return res.json({success: false, errr})
            res.render('diary.ejs', {you: row, list: rows, user:req.session})
        })
    })
})

router.get('/write', (req, res) => {
    console.log('write')
    res.render('diary.ejs')
})

router.post('/writeDiary', (req,res) => {
    var param = [req.body.title, req.body.content]
    db.query('INSERT INTO diary (`title`, `content`) VALUES(?,?);', param, (err) => {
        if(err) return res.json({success: false, err})
        res.redirect('/api/diary')
    })
})

module.exports = router