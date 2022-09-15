const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const { product, Category, productCategory } = require('../../../models');

router.get('/', async (req, res, next) => {
  const {
    category,
    productName,
    page = 1,
    pageSize = 12,
    orderBy = 'price',
    order = 'ASC',
  } = req.query;
  console.log(orderBy);
  console.log(order);
  const limit = Number(pageSize);
  const offset = (page - 1) * Number(pageSize);
  try {
    const { count, rows } = await product.findAndCountAll({
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
      order: Sequelize.literal(`${orderBy} ${order}`),
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
    res.send({
      status: 'Success',
      message: 'Success get product list',
      result: rows,
      totalPage: count,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
