const express = require('express');
const router = express.Router();
const { transaction } = require('../../../models');
const { auth } = require('../../helpers/auth');
const { uploadPayment } = require('../../lib/multer');

// update payment proof
const updateNewPayment = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const transactionId = req.params;
    const name = req.body;

    const resAddPayment = await transaction.update(
      { paymentProof: name },
      { where: transactionId, userId },
    );
    if (!resAddPayment) throw { message: 'Gagal unggah bukti pembayaran' };

    res.send({
      status: 'Berhasil',
      message: 'Berhasil Unggah Resep',
      data: resCreatePrescription,
    });
  } catch (error) {
    next(error);
  }
};

router.patch('/payment/:transactionId', auth, updateNewPayment);

module.exports = router;
