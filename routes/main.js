const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    if(req.session.loggedin){
        res.render('main',{
            loggedin : req.session.loggedin,
            name : req.session.name
        });
    }else{
        res.render('main',{
            loggedin : false
        });
    }
})


module.exports = router