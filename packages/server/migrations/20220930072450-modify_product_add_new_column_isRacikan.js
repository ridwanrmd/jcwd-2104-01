'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.addColumn('products', 'isRacikan', {
        type: Sequelize.TINYINT(1),
        defaultValue: '0',
      }),
      await queryInterface.addColumn('products', 'formula', {
        type: Sequelize.JSON,
        allowNull: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.removeColumn('products', 'isRacikan'),
      await queryInterface.removeColumn('products', 'formula'),
    ]);
  },
};
