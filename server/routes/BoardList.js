const express = require("express");
const model = require("../models/index.js");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const router = express.Router();

router.get("/:searchhWord", function(req, res, next){
    let searchWord = req.params.searchhWord
    model.Notice.findAll({
        where:{
            [Op.or]: [
                {
                    tlte: {
                        [Op.like]: "%" + searchWord + "%"
                    },
                },
                {
                    content: {
                        [Op.like]: "%" + searchWord + "%"
                    }
                }
            ]   
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