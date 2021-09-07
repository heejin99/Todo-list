const express = require('express')
const router = express.Router()

const db = require('../config/db')

router.get('/', (req, res) => {
    var sql = 'SELECT * FROM todo'
    db.query(sql, (err, rows, fields) => {
        if(err) return res.json({success: false, err})
        res.render('main.ejs', {list: rows})
    })
})

router.get('/write', (req, res) => {
    console.log('write')
    res.render('main.ejs')
})

router.post('/writeTodo', (req,res) => {
    var sql = 'INSERT INTO todo VALUES(?);'
    var param = [req.body.content]
    console.log(sql)
    db.query(sql, param, (err) => {
        if(err) return res.json({success: false, err})
        res.redirect('/')
    })
})

module.exports = router