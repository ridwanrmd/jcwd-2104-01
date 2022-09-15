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

  const limit = Number(pageSize);
  const offset = (Number(page) - 1) * Number(pageSize);
  try {
    const amount = await product.count({
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
    });

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
      result: result,
      totalPage: amount,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
