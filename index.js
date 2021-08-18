const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());


// view 경로
app.set('views', __dirname + '/views');
// 화면 engine - ejs
app.set('view engine', 'ejs');

// 기본 path
app.use(express.static(__dirname + '/public'))

// use routes
app.use("/", require('./routes/index'))

app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
});