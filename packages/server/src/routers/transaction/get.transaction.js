const express = require('express');
const router = express.Router();

const {
  address,
  transaction,
  detailTransaction,
  product,
} = require('../../../models');
const { auth } = require('../../helpers/auth');

const getTransactionUser = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const { userId } = req.user;
    const getTransactData = await detailTransaction.findAll({
      where: { transactionId },
      attributes: ['dtId', 'productId', 'quantity'],
      include: [
        {
          model: product,

          attributes: [
            'productId',
            'productName',
            'productImage',
            'price',
            'unit',
            'stock',
            'desc',
          ],
        },
        {
          model: transaction,
          attributes: [
            'transactionId',
            'addressId',
            'total',
            'transactionStatus',
          ],
        },
      ],
    });

    res.send({
      status: 'Succsess',
      message: 'data transaction',
      data: {
        getTransactData,
      },
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
router.get('/dataTransaction/:transactionId', auth, getTransactionUser);
module.exports = router;
