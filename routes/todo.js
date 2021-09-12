const express = require('express')
const router = express.Router()

const db = require('../config/db')

router.get('/list', (req, res) => {
    var sql = 'SELECT * FROM todo'
    db.query('SELECT * FROM user', (err, row) => {
        db.query(sql, (errr, rows) => {
            if(err) return res.json({success: false, errr})
            res.render('todo.ejs', {you: row, list: rows, user:req.session})
        })
    })
})

router.get('/write', (req, res) => {
    console.log('write')
    res.render('todo.ejs')
})

router.post('/writeTodo', (req,res) => {
    var param = [req.body.content]
    db.query('INSERT INTO todo (`content`, `status`) VALUES(?,0);', param, (err) => {
        if(err) return res.json({success: false, err})
        res.redirect('/api/list')
    })
})

router.get('/doneTodo/:todo_id', (req, res) => {
    var param = [1, req.params.todo_id]
    db.query('update todo set status=? where todo_id=?', param, (err) => {
        if (err) return res.json({success: false, err})
        res.redirect('/api/list')
    })
})
router.get('/deleteTodo/:todo_id', (req, res) => {
    var param = [req.params.todo_id]
    db.query('delete from todo where todo_id=?;', param , (err) => {
        if(err) return res.json({success: false, err})
        res.redirect('/api/list')
    })
})
module.exports = router