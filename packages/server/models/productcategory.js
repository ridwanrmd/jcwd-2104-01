'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      productCategory.belongsTo(models.product, { foreignKey: 'productId' });
      productCategory.belongsTo(models.Category, { foreignKey: 'categoryId' });
    }
  }
  productCategory.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'products',
          key: 'productId',
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categories',
          key: 'categoryId',
        },
      },
    },
    {
      sequelize,
      modelName: 'productCategory',
      tableName: 'productCategories',
    },
  );
  return productCategory;
};
