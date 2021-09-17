const nodemailer = require('nodemailer'); 
require('dotenv').config()

const smtpTransport = nodemailer.createTransport({
    service: "Gmail", 
    auth: { 
        user: "process.env.Mail_USER", 
        pass: "process.env.Mail_PW" 
    }, 
    tls: {
        rejectUnauthorized: false 
    } 
}); 

module.exports = smtpTransport;
