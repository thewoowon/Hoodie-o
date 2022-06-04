const express = require("express");
const router = express.Router();
const cors = require('cors');
const model = require("../models/index.js");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const bcrypt = require('bcrypt');
const emailController = require('../controller/user.ctrl');

router.use((req,res,next) =>{
    console.log(req.body);
    next();
})

router.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
    methods:["GET","POST"],
}));

router.get('/',(req,res)=>{ // 메인 부분 글목록 들고 오기 가장 최근 20개
    model.Notice.findAll({
        order: [["createdAt", "desc"]],
        limit: 20,
    })
    .then( result => {
        res.json(result)
    })
    .catch( err => {
        console.log(err)
    })
})

router.post("/",async (req,res,next)=>{
    const  { body: {email }} = req;
    var dt = new Date();
    var dateTime = dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
    let dupleCheck = false;
    const saltRounds = 10
    let emailHash = '';

    await bcrypt.genSalt(saltRounds,async function(err,salt){
        if(err) return next(err);
        bcrypt.hash(email,salt, async function(err,hash){
            if(err) 
            {
                console.log('에러발생')
                return next(err);
            }
            emailHash = hash;

            await model.User.findAll({
                where:{
                    email: {
                        [Op.like]: "%" + emailHash + "%"
                    }
                }
            })
            .then( result => {
                if(result.length > 0)
                    dupleCheck = true;
            })
            .catch( err => {
                console.log(err);
            })
            if(!dupleCheck) // 중복되는 이메일이 존재하지 않는다면
            {
                model.User.create({
                    email:emailHash,
                    user_id:email,
                    role:"1",
                    createAt : dateTime,
                })
                .then( result => {                                                                                                        
                    res.json({result:true})
                    console.log("회원가입이 완료되었습니다.");
                })
                .catch( err => {
                    console.log(err)
                })
            }
            else{
                res.json({result : false});
                console.log('이미 가입이 완료된 이메일입니다.');
                console.log('다른 이메일 주소를 입력하세요.')
            }
        })
    })
    
    //let number = await emailController.auth.SendEmail(req,res);
});

module.exports = router;