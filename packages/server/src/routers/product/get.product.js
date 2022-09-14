const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const { product, Category, productCategory } = require('../../../models');

router.get('/', async (req, res, next) => {
  const {
    category,
    productName,
    page = 1,
    pageSize = 15,
    order = 'ASC',
  } = req.query;
  const limit = pageSize;
  const offset = (page - 1) * pageSize;
  try {
    const result = await product.findAll({
      attributes: [
        'productId',
        'productName',
        'price',
        'desc',
        'productImage',
        'stock',
        'unit',
        'url',
      ],
      order: Sequelize.literal(`price ${order}`),
      where: {
        productName: productName
          ? { [Op.substring]: productName }
          : { [Op.ne]: null },
      },
      include: [
        {
          model: Category,
          attributes: ['category'],
          where: { category: category ? category : { [Op.ne]: null } },
        },
      ],

      offset,
      limit,
    });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
