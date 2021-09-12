const express = require('express')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());


app.set('view engine', 'ejs'); //'ejs'탬플릿을 엔진으로 한다.
app.set('views', path.join(__dirname, 'views')); //폴더, 폴더경로 지정
// 기본 path
app.use(express.static(path.join(__dirname, '/public')));

// 쿠키 추출
app.use(cookieParser())
app.use(session({
    key: "user", // 저장될 키 값
    secret: "secret", // 서명에 필요한 값
    resave: false, // 수정이 되지 않아도 재저장 여부
    saveUninitialized: false, 
    cookie: { // 쿠키 지속
        maxAge: 600000
        // 60*60*24
    },
}))
// use routes
app.use("/api", require('./routes/todo'))
app.use("/api", require('./routes/signup'))
app.use("/api", require('./routes/login'))
app.use("/api", require('./routes/hidden'))
app.use("/api", require('./routes/main'))

app.use("/api", require('./routes/diary'))
app.use('/images', express.static('images'));

app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
});


