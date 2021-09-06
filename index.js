const express = require('express')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
// const cors = require('cors')
// const cookieParser = require('cookie-parser')

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

// 기본 path
app.use(express.static(__dirname + '/public'))

// use routes
app.use("/api", require('./routes/main'))
app.use("/api", require('./routes/signup'))
app.use("/api", require('./routes/login'))

app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
});


