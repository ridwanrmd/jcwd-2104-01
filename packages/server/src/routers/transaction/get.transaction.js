const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');

const {
  Address,
  transaction,
  detailTransaction,
  product,
} = require('../../../models');
const { auth } = require('../../helpers/auth');

const allTransactionByAdmin = async (req, res, next) => {
  try {
    const {
      selected,
      page = 1,
      pageSize = 4,
      sorting = 'transactionId',
      order = 'ASC',
    } = req.query;
    // console.log(req.query)
    var StatusTransaction;
    const limit = Number(pageSize);

    const offset = (Number(page) - 1) * Number(pageSize);

    const getSelectData = async (StatusTransaction) => {
      const restransactionStatus = await transaction.findAndCountAll({
        order: Sequelize.literal(`${sorting} ${order}`),
        where: { transactionStatus: StatusTransaction },
        offset,
        limit,
      });

      res.send({
        status: 'success',
        message: 'Fetch Transaction',
        data: {
          // restransactionStatus: sortedData,
          restransactionStatus: restransactionStatus.rows,
          totalPage: restransactionStatus.count,
        },
      });
    };
    const getAllData = async () => {
      const restransactionStatus = await transaction.findAndCountAll({
        order: Sequelize.literal(`${sorting} ${order}`),
        offset,
        limit,
      });
      // console.log(restransactionStatus.rows);
      res.send({
        status: 'success',
        message: 'Fetch Transaction',
        data: {
          restransactionStatus: restransactionStatus.rows,
          totalPage: restransactionStatus.count,
        },
      });
    };
    switch (Number(selected)) {
      case 1:
        // StatusTransaction = 'Menuggu Pembayaran';
        getSelectData('Menunggu Pembayaran');
        break;
      case 2:
        // StatusTransaction = 'Menuggu Konfirmasi Pembayaran';
        getSelectData('Menunggu Konfirmasi Pembayaran');
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
        getAllData();
        break;
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};

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
const getTransactionUserByAdmin = async (req, res, next) => {
  try {
    const { transactionId } = req.query;

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
    const {
      selected,
      page = 1,
      pageSize = 5,
      sorting = 'transactionId',
      order = 'ASC',
    } = req.query;
    // console.log(page);
    const { userId } = req.user;

    var StatusTransaction;

    const limit = Number(pageSize);
    // console.log(limit);
    const offset = (Number(page) - 1) * Number(pageSize);

    const getSelectData = async (StatusTransaction) => {
      const restransactionStatus = await transaction.findAndCountAll({
        order: Sequelize.literal(`${sorting} ${order}`),
        where: { userId, transactionStatus: StatusTransaction },
        offset,
        limit,
      });

      res.send({
        status: 'success',
        message: 'Fetch Transaction',
        data: {
          restransactionStatus: restransactionStatus.rows,
          totalPage: restransactionStatus.count,
        },
      });
    };
    const getAlltData = async () => {
      const restransactionStatus = await transaction.findAndCountAll({
        order: Sequelize.literal(`${sorting} ${order}`),
        where: { userId },
        offset,
        limit,
      });

      res.send({
        status: 'success',
        message: 'Fetch Transaction',
        data: {
          restransactionStatus: restransactionStatus.rows,
          totalPage: restransactionStatus.count,
        },
      });
    };
    switch (Number(selected)) {
      case 1:
        getSelectData('Menunggu Pembayaran');
        break;
      case 2:
        getSelectData('Menunggu Konfirmasi Pembayaran');
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
router.get('/allTransByAdmin', allTransactionByAdmin);
router.get('/dataTransaction/:transactionId', auth, getTransactionUser);
router.get('/dataTransactionByAdmin', getTransactionUserByAdmin);
module.exports = router;
