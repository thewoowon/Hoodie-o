'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    user_id: DataTypes.STRING,
    user_pw: DataTypes.STRING,
    wdate: DataTypes.DATE,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    sex: DataTypes.STRING,
    birth: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};