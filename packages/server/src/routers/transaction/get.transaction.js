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
    // console.log(page);
    const { userId } = req.user;
    // console.log(req.query);
    // console.log(selected);
    var StatusTransaction;

    const limit = Number(pageSize);
    // console.log(limit);
    const offset = (Number(page) - 1) * Number(pageSize);

    const getSelectData = async (StatusTransaction) => {
      const restransactionStatus = await transaction.findAll({
        where: { userId, transactionStatus: StatusTransaction },
        offset,
        limit,
      });
      // console.log(restransactionStatus);

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
      // console.log(restransactionStatus.length);

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
        // StatusTransaction = 'Menuggu Pembayaran';
        getSelectData('Menuggu Pembayaran');
        break;
      case 2:
        // StatusTransaction = 'Menuggu Konfirmasi Pembayaran';
        getSelectData('Menuggu Konfirmasi Pembayaran');
        break;
      case 3:
        // StatusTransaction = 'Diproses';
        getSelectData('Diproses');
        break;
      case 4:
        // StatusTransaction = 'Dibatalkan';
        getSelectData('Dibatalkan');
        break;
      case 5:
        // StatusTransaction = 'Dikirim';
        getSelectData('Dikirim');
        break;
      case 6:
        // StatusTransaction = 'Pesanan Dikonfirmasi';
        getSelectData('Pesanan Dikonfirmasi');
        break;

      default:
        getAlltData();
        // const { userId } = req.user;
        // console.log('default');
        // const responseTransaction = await transaction.findAll({
        //   where: { userId },
        //   include: [
        //     {
        //       model: Address,

        //       attributes: ['address', 'province', 'city_name'],
        //     },
        //   ],
        // });
        // console.log(responseTransaction);

        // res.send({
        //   status: 'success',
        //   message: 'Fetch Transaction Success',
        //   data: {
        //     responseTransaction,
        //   },
        // });
        break;
    }

    // console.log(StatusTransaction);

    // console.log(StatusTransaction, selected);

    // console.log(transactionStatus);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

router.get('/historyTransaction', auth, getTransactionSelected);

router.get('/dataTransaction/:transactionId', auth, getTransactionUser);
module.exports = router;
