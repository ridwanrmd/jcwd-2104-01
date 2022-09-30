const express = require('express');
const router = express.Router();
const {
  product,
  detailProduct,
  productCategory,
  sequelize,
} = require('../../../models');
const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');

const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const postPath = path.join(appRoot.path, 'packages', 'server');
    const resGetProduct = await product.findOne({ where: { productId } });

    const result = await sequelize.transaction(async (t) => {
      await detailProduct.destroy({ where: { productId } }, { transaction: t });

      await productCategory.destroy(
        { where: { productId } },
        { transaction: t },
      );

      const resDeleteProduct = await product.destroy(
        { where: { productId } },
        { transaction: t },
      );

      return resDeleteProduct;
    });

    if (!result) {
      throw { code: 400, message: 'Gagal hapus produk' };
    }

    const { dataValues } = resGetProduct;

    const paths = postPath + dataValues.productImage;

    if (dataValues.productImage.split('/')[3] != 'product-default.png') {
      fs.unlink(paths, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }

    res.send({
      status: 'Berhasil',
      message: 'Berhasil hapus produk',
    });
  } catch (error) {
    next(error);
  }
};

router.delete('/:productId', deleteProduct);

module.exports = router;
