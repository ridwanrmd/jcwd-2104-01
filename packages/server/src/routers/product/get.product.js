const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const {
  product,
  Category,
  productCategory,
  detailProduct,
} = require('../../../models');

const getAllProduct = async (req, res, next) => {
  const {
    category,
    productName,
    page = 1,
    pageSize = 12,
    orderBy = 'price',
    order = 'ASC',
    isRacikan = false,
  } = req.query;

  const limit = Number(pageSize);
  const offset = (Number(page) - 1) * Number(pageSize);
  try {
    const amount = await product.findAll({
      order: Sequelize.literal(`${orderBy} ${order}`),
      where: {
        productName: productName
          ? { [Op.substring]: productName }
          : { [Op.ne]: null },
        isRacikan,
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
        'satuanUnit',
        'createdAt',
      ],
      order: Sequelize.literal(`${orderBy} ${order}`),
      where: {
        productName: productName
          ? { [Op.substring]: productName }
          : { [Op.ne]: null },
        isRacikan,
      },
      include: [
        {
          model: Category,
          attributes: ['category'],
          where: { category: category ? category : { [Op.ne]: null } },
        },
        {
          model: detailProduct,
          attributes: ['quantity'],
        },
      ],
      offset,
      limit,
    });

    // if (!amount.length) {
    //   return res.status(404).send({
    //     message: 'Not Found',
    //     result: result,
    //     totalPage: amount.length,
    //   });
    // }

    res.send({
      status: 'Success',
      message: 'Success get product list',
      result: result,
      totalPage: amount.length,
    });
  } catch (error) {
    next(error);
  }
};

const getDetailProduct = async (req, res, next) => {
  const { url } = req.params;
  try {
    const result = await product.findOne({
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
      where: {
        url,
      },
      include: [
        {
          model: Category,
          attributes: ['category'],
        },
      ],
    });

    res.send({
      status: 'Success',
      message: 'Success get product list',
      result: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllProductNoLimit = async (req, res, next) => {
  const getAllProduct = await product.findAll({
    attributes: ['productId', 'productName', 'unit', 'satuanUnit'],
    where: {
      isRacikan: false,
    },
  });
  res.send({ status: 'Success', message: 'bismillah', result: getAllProduct });
};
const getQuantityDetailProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const result = await detailProduct.findOne({
      attributes: ['quantity'],
      where: { productId },
    });
    res.send({
      status: 'Success',
      message: 'Success get quantity detail product',
      result: result.dataValues,
    });
  } catch (error) {
    next(error);
  }
};

router.get('/', getAllProduct);
router.get('/all', getAllProductNoLimit);
router.get('/:url', getDetailProduct);
router.get('/quantity/:productId', getQuantityDetailProduct);

module.exports = router;
