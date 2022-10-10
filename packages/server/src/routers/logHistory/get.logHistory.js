const express = require('express');
const router = express.Router();
const { logHistory } = require('../../../models');
const { auth } = require('../../helpers/auth');

const getProductStockHistory = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const resGetProductStockHistory = await logHistory.findAll({
      where: { productId },
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

module.exports = router;
