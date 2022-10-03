const express = require('express');
const router = express.Router();
const {
  product,
  detailProduct,
  productCategory,
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
          productId,
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

router.patch('/', auth, patchProduct);

module.exports = router;
