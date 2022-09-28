'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('products', 'productName', {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    });
    await queryInterface.addColumn('products', 'satuanUnit', {
      type: Sequelize.STRING(100),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('products', 'productName', {
      allowNull: false,
      type: Sequelize.STRING(50),
    });
    await queryInterface.removeColumn('products', 'satuanUnit');
  },
};
