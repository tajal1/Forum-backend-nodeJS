'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Questions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            body: {
                type: Sequelize.TEXT
            },
            tags: {
                type: Sequelize.ARRAY(Sequelize.STRING)
            },
            approval: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            viewCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            questionerId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Questions');
    }
};

// sequelize.define('model', {
//   uuid: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV1,
//     primaryKey: true
//   }
// })