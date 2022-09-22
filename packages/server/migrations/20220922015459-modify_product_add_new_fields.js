'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'isRacikan', {
      type: Sequelize.TINYINT(1),
      defaultValue: '0',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'isRacikan');
  },
};
