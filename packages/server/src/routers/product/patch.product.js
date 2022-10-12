const express = require('express');
const router = express.Router();
const {
  product,
  detailProduct,
  productCategory,
  logHistory,
  sequelize,
} = require('../../../models');
const { auth } = require('../../helpers/auth');

const patchProduct = async (req, res, next) => {
  try {
    const {
      productId,
      productName,
      desc,
      productImage,
      price,
      unit,
      satuanUnit,
      quantity,
      categoryId,
    } = req.body;

    const result = await sequelize.transaction(async (t) => {
      const resUpdateProduct = await product.update(
        {
          productName,
          desc,
          productImage,
          price,
          unit,
          satuanUnit,
        },
        { where: { productId } },
        { transaction: t },
      );

      await detailProduct.update(
        { quantity },
        { where: { productId } },
        { transaction: t },
      );

      await productCategory.update(
        { categoryId },
        { where: { productId } },
        { transaction: t },
      );

      return resUpdateProduct;
    });

    if (!result) {
      throw { code: 400, message: 'Gagal update product' };
    }

    res.send({
      status: 'Berhasil',
      message: 'Berhasil Update Produk',
    });
  } catch (error) {
    next(error);
  }
};

const editProductStock = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { productId, updateStock, defaultStock, totalPrice } = req.body;

    const addStock = Number(updateStock) + defaultStock;
    console.log(addStock);
    // console.log(`ini updateStock: ${defaultStock}`);

    const result = await sequelize.transaction(async (t) => {
      const resUpdateStock = await product.update(
        { stock: addStock },
        { where: { productId } },
        { transaction: t },
      );

      await logHistory.create(
        { userId, productId, quantity: updateStock, totalPrice, status: 'in' },
        { transaction: t },
      );

      return resUpdateStock;
    });

    if (!result) {
      throw { code: 400, message: 'Gagal update stok produk' };
    }

    res.send({
      status: 'Berhasil',
      message: 'Berhasil Update Stok Produk',
    });
  } catch (error) {
    next(error);
  }
};

router.patch('/', auth, patchProduct);
router.patch('/stock', auth, editProductStock);

module.exports = router;
