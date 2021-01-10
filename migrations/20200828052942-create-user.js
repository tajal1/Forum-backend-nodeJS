'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING(100)
      },
      password: {
        type: Sequelize.STRING(100)
      },
      email: {
        type: Sequelize.STRING(100)
      },
      profile: {
        type: Sequelize.STRING(100)
      },
      firstName: {
        type: Sequelize.STRING(100)
      },
      lastName: {
        type: Sequelize.STRING(100)
      },
      phoneNo: {
        type: Sequelize.STRING(25)
      },
      status: {
        type: Sequelize.STRING(25)
      },
      about: {
        type: Sequelize.STRING(100)
      },
      is_superAdmin:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      banned:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      emailVerification:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      verifyToken:{
        // primaryKey: true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV1,
      },
      forgotCode:{
        type: Sequelize.STRING,
        defaultValue: null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};