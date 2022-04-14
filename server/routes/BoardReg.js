const express = require("express");
const model = require("../models/index.js");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const router = express.Router();

router.use((req,res,next) =>{
    console.log(req.body);
    next();
})

router.post("/", function(req, res, next){
    var dateTime = dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate();
    const  { body: { title, content }} = req;
    //res.send({title:title,content:content,id:id});


    models.Notice.create({
        title : title,
        content : content,
        wdate : dateTime,
        createAt : dateTime,
        User_code : "XX"
    })
    .then( result => {
        res.json(result)
    })
    .catch( err => {
        console.log(err)
    })
})

module.exports = router;