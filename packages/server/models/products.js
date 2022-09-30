'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.hasMany(models.cart, { foreignKey: 'productId' });

      product.hasMany(models.detailTransaction, { foreignKey: 'productId' });
      product.hasMany(models.logHistory, { foreignKey: 'productId' });
      product.hasOne(models.detailProduct, { foreignKey: 'productId' });
      product.belongsToMany(models.Category, {
        through: models.productCategory,
        foreignKey: 'productId',
      });
    }
  }
  product.init(
    {
      productId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      productName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      satuanUnit: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      desc: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      productImage: {
        allowNull: false,
        type: DataTypes.STRING(100),
        defaultValue: '/public/product/product-default.png',
      },
      stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      unit: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING(150),
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'product',
      tableName: 'products',
      paranoid: true,
    },
  );
  return product;
};
