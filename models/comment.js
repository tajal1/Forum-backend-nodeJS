'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // define association here
            Comment.belongsTo(models.User, {foreignKey: 'UserId', constraints: false});
            Comment.belongsTo(models.Answer, {foreignKey: 'commentableId', constraints: false});
            Comment.belongsTo(models.Question, {foreignKey: 'commentableId', constraints: false});

            //eager loading
            Comment.addHook("afterFind", findResult => {
                if (!Array.isArray(findResult)) findResult = [findResult];
                for (const instance of findResult) {
                    if (instance.commentableType === "answer" && instance.answer !== undefined) {
                        instance.commentable = instance.answer;
                    } else if (instance.commentableType === "question" && instance.question !== undefined) {
                        instance.commentable = instance.question;
                    }
                    // To prevent mistakes:
                    delete instance.answer;
                    delete instance.dataValues.answer;
                    delete instance.question;
                    delete instance.dataValues.question;
                }
            });
        }
    };
    Comment.init({
        body: DataTypes.TEXT,
        commentableId: DataTypes.INTEGER,
        commentableType: DataTypes.STRING,
        UserId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};