const express = require('express')
const router = express.Router()
const db = require('../config/db')

// db 보안
const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/signup', (req, res)=>{
    res.render('signup.ejs')
})
// 회원가입
router.post('/signup', (req, res) => {
    var param = [req.body.user_id, req.body.password, req.body.name]

    
        // 비밀번호 암호화
        bcrypt.hash(param[1], saltRounds, (error, hash) => {
            param[1] = hash
            // 아이디와 비밀번호 db에 추가
            db.query('INSERT INTO user(`user_id`,`password`,`name`) VALUES (?,?,?)', param, (err, row) => {
                if(err) return res.json({success: false, err})
                res.status(200).json({success: true})
                // console.log('회원가입 성공')
            })
        })
        
})

    
    // res.redirect('/api/login') // 임시 확인용



module.exports = router