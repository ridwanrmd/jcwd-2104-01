const express = require('express');
const router = express.Router();
const { logHistory, product } = require('../../../models');
const { auth } = require('../../helpers/auth');
const { Op, Sequelize } = require('sequelize');

const getProductStockHistory = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const {
      sorting = 'createdAt',
      order = 'ASC',
      formStart,
      formEnd,
    } = req.query;

    const resGetProductStockHistory = await logHistory.findAll({
      order: Sequelize.literal(`${sorting} ${order}`),
      where: {
        productId,
        createdAt: formStart
          ? { [Op.between]: [formStart, formEnd] }
          : { [Op.ne]: null },
      },
      attributes: ['createdAt', 'status', 'quantity', 'historyId', 'type'],
      include: [
        {
          model: product,
          attributes: ['productId', 'productName', 'unit'],
          where: { productId },
        },
      ],
    });
    if (!resGetProductStockHistory)
      throw { message: 'Riwayat stok produk tidak ditemukan' };

    res.send({
      status: 'Berhasil',
      message: 'Berhasil mendapatkan riwayat stok produk',
      data: resGetProductStockHistory,
    });
  } catch (error) {
    next(error);
  }
};

const getProductStockHistoryNoFilter = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const {
      sorting = 'createdAt',
      order = 'ASC',
      formStart,
      formEnd,
    } = req.query;

    const resGetProductStockHistory = await logHistory.findAll({
      order: Sequelize.literal(`${sorting} ${order}`),
      where: {
        productId,
      },
      attributes: ['createdAt', 'status', 'quantity', 'historyId', 'type'],
      include: [
        {
          model: product,
          attributes: ['productId', 'productName', 'unit'],
          where: { productId },
        },
      ],
    });
    if (!resGetProductStockHistory)
      throw { message: 'Riwayat stok produk tidak ditemukan' };

    res.send({
      status: 'Berhasil',
      message: 'Berhasil mendapatkan riwayat stok produk',
      data: resGetProductStockHistory,
    });
  } catch (error) {
    next(error);
  }
};

router.get('/:productId', getProductStockHistory);
router.get('/noFilter/:productId', getProductStockHistoryNoFilter);

module.exports = router;
