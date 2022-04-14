const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    service : "Naver",
    auth:{
        user : "thewoowon@naver.com",
        pass : "Ww940706!!"
    },
    tls : {
        rejectUnauthorized : false
    },
    secure : true,
    host : "smtp.naver.com",
    post : "587",
});

module.exports = {
    smtpTransport
}