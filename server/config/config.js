require('dotenv').config({path:__dirname + '/./../../hoodie/src/.env'});

const env = process.env;

module.exports = {
  development: {
    username: env.REACT_APP_USERNAME,
    password: env.REACT_APP_PASSWORD,
    database: env.REACT_APP_DATABASE,
    host: env.REACT_APP_HOST,
    dialect: 'mysql',
    operatorsAliases: false,
  },
};