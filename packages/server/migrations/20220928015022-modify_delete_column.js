'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.removeColumn('products', 'isRacikan'),
      await queryInterface.removeColumn('detailProducts', 'isOpen'),
      await queryInterface.removeColumn('detailProducts', 'isAvailable'),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.addColumn(
        'products', // table name
        'isRacikan', // new field name
        {
          type: Sequelize.TINYINT(1),
          defaultValue: '0',
        },
      ),
      await queryInterface.addColumn('detailProducts', 'isOpen', {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: '0',
      }),
      await queryInterface.addColumn('detailProducts', 'isAvailable', {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: '0',
      }),
    ]);
  },
};
