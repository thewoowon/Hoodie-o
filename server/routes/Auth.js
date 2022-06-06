const router = express.Router();
const bcrypt = require('bcrypt');
const cors = require('cors');
const model = require("../models/index.js");
const sequelize = require('sequelize');
const Op = sequelize.Op;