'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('categories', 'categoryImage', {
      type: Sequelize.STRING(250),
      defaultValue: '/public/category/category-default.svg',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('categories', 'categoryImage');
  },
};
