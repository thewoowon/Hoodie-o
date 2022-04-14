const {smtpTransport} = require('../config/email');

let generateRandom = (min, max)=>{
    let ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
}

const auth = {
    SendEmail : async(req,res) =>{
        const number = generateRandom(111111,999999)
    
        const mailOption = {
            from : "Hoodie@hoodie-o.com",
            to : req.body.email,
            subject : "[Hoodie] 인증 관련 이메일입니다.",
            text : "오른쪽 숫자 6자리를 입력해주세요 : " + number ,
        };
        //console.log("여기부터 발송 전");

        const result  = await smtpTransport.sendMail(mailOption,(error,response) =>{
            if(error)
            {
                return console.log(error)
            }
            else{
                return number;
            }
            smtpTransport.close();
        });
    }
}
module.exports = {
    auth: auth,
  };