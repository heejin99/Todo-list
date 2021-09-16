const express = require('express')
const router = express.Router()

// db 보안
const bcrypt = require('bcrypt')
const saltRounds = 10

const smtpTransport = require('../config/email'); 
const db = require('../config/db')

//비밀번호 랜덤 함수
const createRandomPassword = (vari, passwordLength) => {
    var randomString = "";
    for (var j=0; j<passwordLength; j++)  {
        randomString += vari[Math.floor(Math.random()*vari.length)];
    }
    return randomString
}

// 임시 비밀번호 발급
var variable = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
var randomPW = createRandomPassword(variable, 8);

router.get('/', (req, res) => {
    res.render('forgot.ejs')
})

router.post('/id', (req, res) => {
    const param = [req.body.name, req.body.email]
    db.query('SELECT * FROM user WHERE email=?', param[1], (err, row) => {
        if(err) return res.json({success: false, err})
        if(row.length > 0) {
            res.render('forgot_id', {
                id: row[0].id
            })
        } else {
            res.send('<script>alert("아이디를 찾지 못했습니다. 다시 시도해주세요");location.href="/api/forgot/id"</script>')
        }
    })
})

router.post('/pw', (req, res) => {
    const param = [req.body.id, req.body.name, req.body.email]
    db.query('SELECT * FROM user WHERE id=? AND email=?', [param[0], param[2]], (err, row) => {
        if(err) return res.json({searchsuccess: false, err})
        if(row.length > 0) {
            const emailOptions = { 
                from: "wkdgmlwls18@gmail.com", 
                to: row[0].email, 
                subject: "[HeeTodo] 임시 비밀번호 재발급", 
                html: "<h1>HeeTodo에서 새로운 비밀번호를 알려드립니다.</h1> <h2> 비밀번호 : " + randomPW + "</h2>"
                +'<h3 style="color: crimson;">임시 비밀번호로 로그인 하신 후, 반드시 비밀번호를 수정해 주세요.</h3>'
            }
            bcrypt.hash(randomPW, saltRounds, (error, hash) => {
                randomPW = hash
                db.query('update user set password=? where id=?', [randomPW, row[0].id], (errorr) => {
                    if(err) return res.json({success:false, errorr})
                })
            })
            smtpTransport.sendMail(emailOptions, (error, response) => { 
                if (error) return res.json({success: false, err})
                else {
                    res.render('forgot_pw');
                } smtpTransport.close(); 
            })
        } else {
            res.send('<script>alert("아이디를 찾지 못했습니다. 다시 시도해주세요");location.href="/api/forgot/pw"</script>')
        }
    })
})


module.exports = router