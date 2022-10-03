const express = require('express');
const router = express.Router();
const { auth } = require('../../helpers/auth');
const {
  product,
  detailProduct,
  logHistory,
  sequelize,
  productCategory,
} = require('../../../models');
const { uploadProduct } = require('../../lib/multer');
const slugify = require('slugify');

// create new product
const addNewProduct = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const {
      productName,
      desc,
      imageName,
      stock,
      price,
      unit,
      satuanUnit,
      categoryId,
      detailQuantity,
      // userId,
    } = req.body;

    const resGetProduct = await product.findAll({
      where: { productName },
    });

    if (resGetProduct.length) {
      throw { code: 400, message: 'Produk serupa sudah ada dalam stock' };
    }

    const result = await sequelize.transaction(async (t) => {
      const resCreateProduct = await product.create(
        {
          productName,
          desc,
          productImage: imageName,
          stock,
          price,
          unit,
          satuanUnit,
          url: slugify(productName, { lower: true }),
        },
        { transaction: t },
      );

      await detailProduct.create(
        {
          productId: resCreateProduct.dataValues.productId,
          quantity: detailQuantity,
          currentQuantity: 0,
        },
        { transaction: t },
      );

      await productCategory.create(
        { productId: resCreateProduct.dataValues.productId, categoryId },
        { transaction: t },
      );

      await logHistory.create(
        {
          userId,
          productId: resCreateProduct.dataValues.productId,
          quantity: stock,
          totalPrice: stock * price,
          status: 'in',
        },
        { transaction: t },
      );

      return resCreateProduct;
    });
    if (!result) {
      throw { code: 400, message: 'Gagal menambahkan produk' };
    }

    res.send({
      status: 'Success',
      message: 'Berhasil menambahkan produk',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const uploadImage = async (req, res, next) => {
  try {
    return res.send({
      status: 'Success',
      message: 'Success upload product image',
    });
  } catch (error) {
    console.log(error);
  }
};

router.post('/', auth, addNewProduct);
router.post('/upload', auth, uploadProduct.single('gambar'), uploadImage);

module.exports = router;
