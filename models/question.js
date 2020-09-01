'use strict';
const {
  Model
} = require('sequelize');
// const User = require('../models/user');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.User, {
        foreignKey:'userId'
      })
    }
  }
  Question.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    tags: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Question',
  });

  return Question;
};