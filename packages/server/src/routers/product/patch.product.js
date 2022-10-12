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

//
//
//
//
//
//
//
//
//
//
//
//
//
//

const updateStockRacikan = async (req, res, next) => {
  const { productId, quantity } = req.body;
  let stocks = Number(quantity);
  const t = await sequelize.transaction();
  try {
    const getExistingProduct = await product.findOne({
      where: { productId },
      transaction: t,
    });
    // console.log(getExistingProduct.dataValues.formula);
    const { formula, stock } = getExistingProduct.dataValues;

    const getInitialStock = await Promise.all(
      formula.map(async (data) => {
        let quantities = Number(data.quantity);
        const existingProducts = await product.findOne({
          where: {
            productName: data.productName,
          },
          include: [{ model: detailProduct }],
          transaction: t,
        });

        if (!existingProducts)
          throw {
            code: 404,
            message: `Product ${data.productName} tidak ditemukan`,
          };

        for (i = 0; i < stocks; i++) {
          const existingProduct = await product.findOne({
            where: {
              productName: data.productName,
            },
            include: [{ model: detailProduct }],
            transaction: t,
          });

          if (
            existingProduct.dataValues.detailProduct.dataValues
              .currentQuantity < quantities
          ) {
            if (existingProduct.dataValues.stock == 0)
              throw {
                code: 404,
                message: `Stock ${data.productName} Habis`,
              };
            await product.update(
              {
                stock: existingProduct.dataValues.stock - 1,
              },
              { where: { productName: data.productName }, transaction: t },
            );
            await detailProduct.update(
              {
                currentQuantity:
                  existingProduct.dataValues.detailProduct.dataValues
                    .currentQuantity +
                  existingProduct.dataValues.detailProduct.dataValues.quantity,
              },
              {
                where: { productId: existingProduct.dataValues.productId },
                transaction: t,
              },
            );
            const newDetailProduct = await detailProduct.findOne({
              where: { productId: existingProduct.dataValues.productId },
              transaction: t,
            });
            await detailProduct.update(
              {
                currentQuantity:
                  newDetailProduct.dataValues.currentQuantity - quantities,
              },
              {
                where: { productId: newDetailProduct.dataValues.productId },
                transaction: t,
              },
            );
          } else {
            await detailProduct.update(
              {
                currentQuantity:
                  existingProduct.dataValues.detailProduct.dataValues
                    .currentQuantity - quantities,
              },
              {
                where: { productId: existingProduct.dataValues.productId },
                transaction: t,
              },
            );
          }
        }
        return existingProducts.dataValues.stock;
      }),
    );

    // digunakan buat masukin ke product history
    const getNewStock = await Promise.all(
      formula.map(async (data) => {
        const newProductStock = await product.findOne({
          where: { productName: data.productName },
          transaction: t,
        });
        return newProductStock.dataValues.stock;
      }),
    );

    // digunakan buat masukin ke product history
    const checkPengeluaranStock = getInitialStock.map(
      (data, index) => data - getNewStock[index],
    );
    console.log(checkPengeluaranStock);

    const [updateRacikanStock] = await product.update(
      {
        stock: stock + stocks,
      },
      {
        where: { productId },
        transaction: t,
      },
    );

    if (!updateRacikanStock)
      throw { code: 400, message: 'Gagal update product stock' };
    await t.commit();
    res.send({
      status: 'Success',
      message: 'Success update product racikan stock',
    });
  } catch (error) {
    next(error);
    await t.rollback();
  }
};

router.patch('/', auth, patchProduct);
router.patch('/racikan', updateStockRacikan);

module.exports = router;
