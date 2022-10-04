const express = require('express');
const slugify = require('slugify');
const router = express.Router();
const { product, detailProduct, sequelize } = require('../../../models');

const postObatRacikan = async (req, res, next) => {
  const { formula, productName, stock = 1 } = req.body;
  const t = await sequelize.transaction();

  try {
    // Checking product name
    const getExistingProduct = await product.findAll({
      where: { productName },
      transaction: t,
    });

    if (getExistingProduct.length)
      throw { code: 400, message: 'Nama product sudah digunakan' };

    let harga = 0;
    const getInitialStock = await Promise.all(
      formula.map(async (data) => {
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
        harga +=
          (existingProducts.dataValues.price /
            existingProducts.dataValues.detailProducts[0].dataValues.quantity) *
          data.quantity;

        for (i = 0; i < stock; i++) {
          const existingProduct = await product.findOne({
            where: {
              productName: data.productName,
            },
            include: [{ model: detailProduct }],
            transaction: t,
          });

          if (
            existingProduct.dataValues.detailProducts[0].dataValues
              .currentQuantity < data.quantity
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
                  existingProduct.dataValues.detailProducts[0].dataValues
                    .currentQuantity +
                  existingProduct.dataValues.detailProducts[0].dataValues
                    .quantity,
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
                  newDetailProduct.dataValues.currentQuantity - data.quantity,
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
                  existingProduct.dataValues.detailProducts[0].dataValues
                    .currentQuantity - data.quantity,
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

    const createNewProduct = await product.create(
      {
        productName,
        stock,
        formula,
        desc: 'Obat Racikan',
        price: harga,
        url: slugify(productName, { lower: true }),
        unit: 'Racikan',
        satuanUnit: 'Racikan',
        isRacikan: true,
      },
      { transaction: t },
    );
    if (!createNewProduct.dataValues)
      throw { code: 400, message: 'Gagal membuat obat racikan' };
    await t.commit();
    res.send({ message: 'Berhasil membuat obat racikan' });
  } catch (error) {
    next(error);
    await t.rollback();
  }
};

router.post('/racikan', postObatRacikan);
module.exports = router;
