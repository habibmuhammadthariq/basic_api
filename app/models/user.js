'use strict';
const {
  Model
} = require('sequelize');
const { getHash } = require('../helpers/auth');
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
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(value) { this.setDataValue('password', getHash(value)) }
    }
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
  });

  return User;
};