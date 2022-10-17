'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      logHistory.belongsTo(models.user, { foreignKey: 'userId' });
      logHistory.belongsTo(models.product, { foreignKey: 'productId' });
    }
  }
  logHistory.init(
    {
      historyId: {
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
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'productId',
        },
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      totalPrice: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: true,
        type: DataTypes.STRING(100),
      },
      status: DataTypes.ENUM('in', 'out'),
    },
    {
      sequelize,
      modelName: 'logHistory',
      tableName: 'logHistories',
    },
  );
  return logHistory;
};
