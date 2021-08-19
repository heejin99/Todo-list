const express = require('express')
const router = express.Router()
const heeSql = require('../config/db')

var connect = heeSql.init()
heeSql.connect(connect)

router.get('/', (req, res) => {
    var sql = 'SELECT * FROM todo'
    connect.query(sql, (err, rows, fields) => {
        if(err) return res.json({success: false, err})
        res.render('index.ejs', {list: rows})
    })
})

router.get('/write', (req, res) => {
    console.log('write')
    res.render('index.ejs')
})

router.post('/writeTodo', (req,res) => {
    var sql = 'INSERT INTO todo VALUES(?);'
    var param = [req.body.content]
    console.log(sql)
    connect.query(sql, param, (err) => {
        if(err) return res.json({success: false, err})
        res.redirect('/')
    })
})
module.exports = router