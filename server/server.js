const express = require('express');
const app = express();
const PORT = 4000;

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const boardlist = require("./routes/BoardList.js");
const boardreg = require("./routes/BoardReg.js");
const boardread = require("./routes/BoardRead.js");

const signup = require("./routes/SignUp.js");
const login = require("./routes/LogIn.js");
const idsearch =  require('./routes/IdSearch.js');
const isuserauth =  require('./routes/IsUserAuth.js');

const model = require('./models/index.js');
const sequelize = require("sequelize");
const Op = sequelize.Op;

app.use(express.json());
app.use(cors({
    origin : 'http://localhost:3000',
    methods : ["POST","GET"],
    credentials : true,
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use(
    session ({
        key : "email",
        secret : "subscribe",
        resave : false,
        saveUninitialized : false,
        cookie : {
            expires:60*60*24,
        },
    })
);

app.use("/BoardList",boardlist);
app.use("/BoardRead",boardread);
app.use("/BoardReg",boardreg);
app.use("/SignUp",signup);
app.use("/Login",login);
app.use("/idSearch",idsearch);
app.use("/isUserAuth",isuserauth);

// DB 연결은 비동기 
model.sequelize.sync() 
.then(()=>{
    console.log('DB연결 성공');
})
.catch((err)=>{
    console.log('DB 연결 실패');
    console.log(err);
})

app.get('/',(req,res)=>{ // 메인 부분 글목록 들고 오기 가장 최근 20개
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

app.listen(PORT,()=>{
    console.log(`서버에 접속했습니다. 포트는 ${PORT}`);
})