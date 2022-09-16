'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('addresses', 'province', {
        type: Sequelize.STRING(30),
        allowNull: true,
      }),
      queryInterface.addColumn('addresses', 'province_id', {
        type: Sequelize.STRING(5),
        allowNull: true,
      }),
      queryInterface.addColumn('addresses', 'city_name', {
        type: Sequelize.STRING(30),
        allowNull: true,
      }),
      queryInterface.addColumn('addresses', 'city_id', {
        type: Sequelize.STRING(5),
        allowNull: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('addresses', 'province'),
      queryInterface.removeColumn('addresses', 'province_id'),
      queryInterface.removeColumn('addresses', 'city_name'),
      queryInterface.removeColumn('addresses', 'city_id'),
    ]);
  },
};
