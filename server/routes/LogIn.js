const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const cors = require('cors');
const emailController = require('../controller/user.ctrl');
const model = require("../models/index.js");
const sequelize = require('sequelize');
const Op = sequelize.Op;
const secretKey = require('../config/secretKey').secretKey;
const option = require('../config/secretKey').option;


router.use((req,res,next) =>{
    console.log(req.body);
    next();
})

router.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
    methods:["GET","POST"],
}));


router.get("/",(req,res)=>{
    if(req.session.user)
    {
        res.send({loggedIn:true,user:req.session.user});
    }
    else{
        res.send({loggedIn:false});
    }
})


router.post("/",async (req,res,next)=>{
    //여기서 이메일을 입력 받습니다.
    //body에는 이메일만 있습니다.
    const  { body: { email }} = req; // 회원가입을 위한 이메일
    // 일치하는 이메일을 조사한다.
    // 여기서 해쉬된 이메일을 복호화 하는 것보다 해당 이메일을 암호화 한후 비교하는 것이 낫다.
    const saltRounds = 10
    let emailHash = '';

    await bcrypt.genSalt(saltRounds,async function(err,salt){
        if(err) return next(err);
        bcrypt.hash(email,salt, async function(err,hash){
            if(err) return next(err);
            emailHash = hash;
            
            console.log(hash);

            model.User.findOne({
                where:{
                    user_id: email
                }
            })
            .then( async result =>  {
                if(result != null)
                {
                    //여기서 인증 이메일 발송하고 확인 된다면 토큰을 생성합니다.
                    //let number = emailController.auth.SendEmail(req,res); 
                    // 유효기간이 짧은 토큰 + 리프레시 토큰 두개 발급
                    await bcrypt.compare(email,result.dataValues.email,(err,match)=>{
                        if(err) return next(err);
                        if(match){
                            const token = jwt.sign({email :email}, secretKey, option);
                            res.json({
                                token: token,
                            });
                        }
                    })
                }
                else
                {
                    console.log("가입되지 않은 이메일 주소입니다.");
                    res.send({auth:false,message:"No User Exists",count: -1});
                }
            })
            .catch( err => {
                console.log(err);
            })
        })
    })

    
})
module.exports = router;