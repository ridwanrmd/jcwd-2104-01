'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('transactions', 'total', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('transactions', 'transactionStatus', {
      type: Sequelize.ENUM(
        'Menuggu Pembayaran',
        'Menuggu Konfirmasi Pembayaran',
        'Menunggu Konfirmasi Resep',
        'Resep Ditolak',
        'Diproses',
        'Dibatalkan',
        'Dikirim',
        'Pesanan Dikonfirmasi',
      ),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('transactions', 'total', {
      type: Sequelize.INT,
      allowNull: false,
    });
    await queryInterface.changeColumn('transactions', 'transactionStatus', {
      type: Sequelize.ENUM(
        'Menuggu Pembayaran',
        'Menuggu Konfirmasi Pembayaran',
        'Diproses',
        'Dibatalkan',
        'Dikirim',
        'Pesanan Dikonfirmasi',
      ),
      allowNull: true,
    });
  },
};
