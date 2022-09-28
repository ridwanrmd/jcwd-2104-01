const express = require('express');
const router = express.Router();
const { auth } = require('../../helpers/auth');
const { product, detailProduct, logHistory } = require('../../../models');

const t = await sequelize.transaction();

// create new product
const addNewProduct = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { productName, desc, stock, price, unit, satuanUnit, url } = req.body;

    const resGetProduct = await product.findOne({
      where: { productName },
    });

    if (!resGetProduct) {
      const resCreateProduct = await product.create(
        {
          productName,
          desc,
          stock,
          price,
          unit,
          satuanUnit,
          url,
        },
        { transaction: t },
      );

      await detailProduct.create(
        {
          productId: resCreateProduct.dataValues.productId,
          quantity,
          currentQuantity,
        },
        { transaction: t },
      );

      await logHistory.create(
        {
          productId: resCreateProduct.dataValues.productId,
          userId,
          quantity: stock,
          status: 'in',
        },
        { transaction: t },
      );

      await t.commit();

      res.send({
        status: 'Success',
        message: 'Berhasil menambahkan alamat',
      });
    } else {
      throw { message: 'Barang yang sama sudah ada dalam stock' };
    }
  } catch (error) {
    await t.rollback();
    next(error);
  }
};
