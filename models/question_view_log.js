'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Question_view_log extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Question_view_log.belongsTo(models.Question, {
                foreignKey: 'questionId'
            });

        }
    }

    Question_view_log.init({
        data: DataTypes.JSON
    }, {
        sequelize,
        modelName: 'Question_view_log',
    });
    return Question_view_log;
};