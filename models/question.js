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
                // onDelete: 'CASCADE',
                foreignKey: 'questionerId'
            });

            Question.hasMany(models.Answer, {
                foreignKey: 'questionId'
            });
            Question.hasMany(models.Question_view_log, {
                foreignKey: 'questionId'
            });

            //polymorphic association
            Question.hasMany(models.Comment, {
                foreignKey: 'commentableId',
                constraints: false,
                scope: {
                    commentableType: 'question'
                }
            });
        }
    }

    Question.init({
        title: DataTypes.STRING,
        body: DataTypes.TEXT,
        tags: DataTypes.ARRAY(DataTypes.STRING),
        approval: DataTypes.BOOLEAN,
        viewCount: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Question',
    });

    return Question;
};