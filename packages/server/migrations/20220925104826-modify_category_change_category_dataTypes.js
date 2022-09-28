'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('categories', 'category', {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('catetgories', 'category', {
      allowNull: false,
      type: Sequelize.STRING(30),
    });
  },
};
