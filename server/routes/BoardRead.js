const express = require("express");
const model = require("../models/index.js");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const router = express.Router();

router.get("/:boardId", function(req, res, next){
    let boardId = req.params.boardId
    model.Notice.findAll({
        where:{
            tlte: {
                boardId
            }, 
        }
    })
        .then( result => {
            res.json(result)
        })
        .catch( err => {
            console.log(err)
        })
})

module.exports = router;