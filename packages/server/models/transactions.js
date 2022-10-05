'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.Address, { foreignKey: 'addressId' });
      transaction.belongsTo(models.user, { foreignKey: 'userId' });
      transaction.hasMany(models.detailTransaction, {
        foreignKey: 'transactionId',
      });
    }
  }
  transaction.init(
    {
      transactionId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'userId',
        },
      },

      addressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'addresses',
          key: 'addressId',
        },
      },
      total: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      transactionStatus: {
        type: DataTypes.ENUM(
          'Menuggu Pembayaran',
          'Menuggu Konfirmasi Pembayaran',
          'Menunggu Konfirmasi Resep',
          'Resep Ditolak',
          'Diproses',
          'Dibatalkan',
          'Dikirim',
          'Pesanan Dikonfirmasi',
        ),
      },
      kurir: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      biaya: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      estimasi: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      paymentProof: {
        type: DataTypes.STRING(100),
        defaultValue: '/public/user/default-avatar.png',
      },
    },
    {
      sequelize,
      modelName: 'transaction',
      tableName: 'transactions',
    },
  );
  return transaction;
};
