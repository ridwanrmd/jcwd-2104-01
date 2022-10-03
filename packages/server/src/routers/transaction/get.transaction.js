const express = require('express');
const router = express.Router();

const {
  Address,
  transaction,
  detailTransaction,
  product,
} = require('../../../models');
const { auth } = require('../../helpers/auth');

const getTransactionUser = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

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
            'userId',
            'transactionId',
            'addressId',
            'total',
            'transactionStatus',
            'createdAt',
            'kurir',
            'biaya',
            'estimasi',
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
const getTransactionSelected = async (req, res, next) => {
  try {
    const { selected, page = 1, pageSize = 12 } = req.query;
    const { userId } = req.user;
    var StatusTransaction;

    const limit = Number(pageSize);
    const offset = (Number(page) - 1) * Number(pageSize);

    const getSelectData = async (StatusTransaction) => {
      const restransactionStatus = await transaction.findAll({
        where: { userId, transactionStatus: StatusTransaction },
        offset,
        limit,
      });

      res.send({
        status: 'success',
        message: 'Fetch Transaction',
        data: {
          restransactionStatus,
        },
        totalPage: getSelectData.length,
      });
    };
    const getAlltData = async () => {
      const restransactionStatus = await transaction.findAll({
        where: { userId },
        offset,
        limit,
      });

      res.send({
        status: 'success',
        message: 'Fetch Transaction',
        data: {
          restransactionStatus,
        },
        totalPage: getAlltData.length,
      });
    };
    switch (Number(selected)) {
      case 1:
        getSelectData('Menuggu Pembayaran');
        break;
      case 2:
        getSelectData('Menuggu Konfirmasi Pembayaran');
        break;
      case 3:
        getSelectData('Diproses');
        break;
      case 4:
        getSelectData('Dibatalkan');
        break;
      case 5:
        getSelectData('Dikirim');
        break;
      case 6:
        getSelectData('Pesanan Dikonfirmasi');
        break;

      default:
        getAlltData();
        
        break;
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};

router.get('/historyTransaction', auth, getTransactionSelected);

router.get('/dataTransaction/:transactionId', auth, getTransactionUser);
module.exports = router;
