const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const cors = require('cors');

router.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
    methods:["GET","POST"],
}));


const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.send("We need a token, please give it to us next time");
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                console.log(err);
                res.json({ auth: false, message: "you are failed to authenticate"});
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
};


router.get('/', verifyJWT , (req, res) => {
    res.send("You are authenticated Congrats:")
})
module.exports = router;