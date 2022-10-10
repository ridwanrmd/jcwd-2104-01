const express = require('express');
const router = express.Router();
const { transaction } = require('../../../models');
const { auth } = require('../../helpers/auth');
const { uploadPayment } = require('../../lib/multer');

// update payment proof
const updateNewPayment = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { transactionId } = req.params;
    const paymentProof = req.body.name;

    const resAddPayment = await transaction.update(
      { paymentProof, transactionStatus: 'Menunggu Konfirmasi Pembayaran' },
      { where: { transactionId, userId } },
    );
    if (!resAddPayment) throw { message: 'Gagal unggah bukti pembayaran' };

    res.send({
      status: 'Berhasil',
      message: 'Berhasil Unggah Bukti Pembayaran',
      data: resAddPayment,
    });
  } catch (error) {
    next(error);
  }
};

const uploadPaymentImage = (req, res) => {
  try {
    return res.send({
      status: 'Berhasil',
      message: 'Berhasil Unggah Bukti Pembayaran',
    });
  } catch (error) {
    next(error);
  }
};

router.patch('/:transactionId', auth, updateNewPayment);
router.patch(
  '/upload/payment',
  auth,
  uploadPayment.single('gambar'),
  uploadPaymentImage,
);

module.exports = router;
