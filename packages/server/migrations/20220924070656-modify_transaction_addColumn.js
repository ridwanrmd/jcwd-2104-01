'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('transactions', 'kurir', {
        type: Sequelize.STRING(50),
        allowNull: true,
      }),
      queryInterface.addColumn('transactions', 'biaya', {
        type: Sequelize.STRING(50),
        allowNull: true,
      }),
      queryInterface.addColumn('transactions', 'estimasi', {
        type: Sequelize.STRING(50),
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
      queryInterface.removeColumn('transactions', 'kurir'),
      queryInterface.removeColumn('transactions', 'biaya'),
      queryInterface.removeColumn('transactions', 'estimasi'),
    ]);
  },
};
