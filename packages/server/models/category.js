'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsToMany(models.product, {
        through: models.productCategory,
        foreignKey: 'categoryId',
      });
    }
  }
  Category.init(
    {
      categoryId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      categoryImage: {
        type: DataTypes.STRING(250),
        defaultValue: '/public/category/category-default.svg',
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
    },
  );
  return Category;
};
