require('dotenv').config()

var mysql = require('mysql')
const db = mysql.createConnection({
    host: process.env.DB_HOST, // 호스트의 ip
    port: process.env.DB_PORT, // db 설치 시 사용자가 지정한 포트번호(기본값: 3306)
    user: process.env.DB_USER, // db user 이름
    password: process.env.DB_PW, // db 사용자 지정 비밀번호
    database: process.env.DB_NAME // 데이터베이스 이름
})

db.connect()
module.exports = db