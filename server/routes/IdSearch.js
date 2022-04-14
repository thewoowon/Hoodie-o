const express = require("express");
const model = require("../models/index.js");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const router = express.Router();

router.get("/:Id",(req,res,next)=>{

    let Id = req.params.Id
    model.User.findAll({
        where:{
            Id: {
                Id
            }, 
        }
    })
    .then( result => {
        res.json(result)
    })
    .catch( err => {
        console.log(err)
    })
});

module.exports = router;