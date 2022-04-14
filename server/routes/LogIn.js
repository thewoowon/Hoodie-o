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


router.post("/",(req,res,next)=>{
    //여기서 이메일을 입력 받습니다.
    //body에는 이메일만 있습니다.
    const  { body: { email }} = req; // 회원가입을 위한 이메일
    //일치하는 이메일을 조사한다.
    model.User.findOne({
        where:{
            email: email
        }
    })
    .then( result => {
        if(result != null)
        {
            console.log("일치하는 이메일 확인");
            //여기서 인증 이메일 발솔하고 확인 된다면 토큰을 생성합니다.
            //let number = emailController.auth.SendEmail(req,res); 
                
            const email = result.dataValues.email;
            const token = jwt.sign({email :email}, secretKey, option)
            req.session.user=result.dataValues;
            res.json({
                auth: true,
                token: token,
                result:{
                    count : 1, 
                    email: result.dataValues.email,
                }
            });
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
module.exports = router;