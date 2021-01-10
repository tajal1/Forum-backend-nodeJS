'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserRoles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: { model: 'Roles', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
          uniqueKeys: {
            Items_unique: {
              fields: ['userId', 'roleId']
            }
          }
        }

        );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserRoles');
  }
};

