const express = require('express')
const router = express.Router()
const db = require('../config/db')

// db 보안
const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/login', (req, res)=>{
    res.render('login.ejs', {user:req.session})
})
// 로그인
router.post('/login', (req, res) => {
    const param = [req.body.id, req.body.password]
    
    db.query('SELECT * FROM user WHERE id=?', param[0], (err, row) => {
        if(err) return res.json({success: false, err})
        if(row.length > 0) { // ID exists
            bcrypt.compare(param[1], row[0].password, (error, result) => {
                // 비밀번호 불일치
                if(!result) {
                    return res.send('<script>alert("비밀번호가 틀렸습니다.다시 입력하세요");location.href="/api/login"</script>')
                    
                }
                // 비밀번호 일치
                req.session.loggedin = true;
                req.session.id = param[0]
                req.session.name = row[0].name
                req.session.save(() => {
                    res.render('main', {
                        name: row[0].name,
                        id: row[0].id,
                        loggedin: true
                    })
                })
            })
        } else { // ID not exists
            return res.send('<script>alert("아이디가 존재하지 않습니다.회원가입을 먼저 진행해주세요.");location.href="/api/signup"</script>')
        }
    })
})

router.get('/logout', (req, res) => {
    req.session.loggedin = false
    req.session.destroy((err) => {
        // req.session
        console.log('세션삭제')
    })
    // res.status(200).json({logoutSucess: true})
    res.redirect('/api')
})

module.exports = router