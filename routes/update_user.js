const express = require('express')
const router = express.Router()

// db 보안
const bcrypt = require('bcrypt')
const saltRounds = 10
const db = require('../config/db')

router.get('/', (req, res) => {
    db.query('SELECT * FROM user',(err, row) => {
        if(err) return res.json({success: false, err})
        console.log(req.session.id)
        res.render('update_user', {
            loggedin : req.session.loggedin,
            name : req.session.name,
            id: row[0].id
        })
    })
})

router.post('/', (req, res) => {
    const param = [req.body.originalpw, req.body.changepw, req.body.changepw_ok]
    db.query('SELECT * FROM user', (err, rows) => {
        db.query('SELECT * FROM user WHERE id=?', rows[0].id, (err, row) => {
            if(err) return res.json({success: false, err})
            bcrypt.compare(param[0], row[0].password, (error, result) => {
                // 비밀번호 불일치
                if(!result) return res.send('<script>alert("비밀번호가 틀렸습니다.다시 입력하세요");location.href="/api/update_user"</script>')
                if (param[1] == param[2]) {
                    bcrypt.hash(param[1], saltRounds, (error, hash) => {
                        param[1] = hash
                        db.query('update user set password=? where id=?', [param[1], row[0].id], (errorr) => {
                            if(err) return res.json({success:false, errorr})
                            req.session.loggedin = false
                            req.session.destroy((e) => {
                                console.log('세션삭제')
                            })
                            res.send('<script>alert("비밀번호가 정상적으로 변경되었습니다. 다시 로그인 해주세요.");location.href="/api/login"</script>')
                        })
                    })
                }
            })
        })
    })
    
})


module.exports = router