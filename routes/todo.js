const express = require('express')
const router = express.Router()

const db = require('../config/db')

router.get('/list', (req, res) => {
    if(req.session.loggedin){
        db.query('SELECT * FROM user', (error, data) => {
  
            db.query('SELECT * FROM todo', (err, row) => {
                if(err) return res.json({success: false, err})
                res.render('todo',{
                    loggedin : req.session.loggedin,
                    name : req.session.name,
                    list: row
                });
            })

        })
    }else{
        res.render('main',{
            loggedin : false
        });
    }
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