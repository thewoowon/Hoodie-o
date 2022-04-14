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
 
    await model.User.findAll({
        where:{
            email: {
                [Op.like]: "%" + email + "%"
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
    //let number = await emailController.auth.SendEmail(req,res);

    if(!dupleCheck)
    {
        model.User.create({
            email:email,
            role:"1",
            createAt : dateTime,
        })
        .then( result => {                                                                                                        
            res.json(result)
            console.log("회원가입이 완료되었습니다.");
        })
        .catch( err => {
            console.log(err)
        })
    }
});

module.exports = router;