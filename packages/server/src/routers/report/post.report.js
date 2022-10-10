const express = require('express');
const router = express.Router();
const moment = require('moment');

const { Op, Sequelize } = require('sequelize');

const {
  transaction,
  cart,
  product,
  address,
  detailTransaction,
  logHistory,
} = require('../../../models');
const { auth } = require('../../helpers/auth');

const confirmTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.query;

    const findTransaction = await transaction.findAll({
      where: { transactionId },
    });
    // console.log(findTransaction);
    const getDTData = await detailTransaction.findAndCountAll({
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
    // console.log(getDTData.rows);

    let totalPrice;
    findTransaction.forEach((data) => {
      totalPrice = data.dataValues.total;
    });
    getDTData.rows.map(async (data) => {
      // console.log(data.dataValues.productId);
      console.log(data.dataValues.transaction.dataValues.userId);
      const updateProduct = await product.findOne({
        where: { productId: data.dataValues.productId },
      });

      await product.update(
        {
          stock: updateProduct.dataValues.stock - data.dataValues.quantity,
        },
        {
          where: { productId: data.dataValues.productId },
          // transaction: t,
        },
      );

      // console.log(totalPrice);
      await logHistory.create({
        userId: data.dataValues.transaction.dataValues.userId,
        productId: data.dataValues.productId,
        quantity: data.dataValues.quantity,
        totalPrice,
        status: 'out',
      });
    });
    const sendTransaction = await transaction.update(
      { transactionStatus: 'Diproses' },
      {
        where: {
          transactionId: transactionId,
        },
      },
    );

    const updatedTransaction = await transaction.findAll({
      where: { transactionId },
    });

    res.send({
      status: 'Succsess',
      message: 'Finish Transaction',
      data: {
        updatedTransaction,
      },
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
const sendOrder = async (req, res, next) => {
  try {
    const { transactionId } = req.query;

    const findTransaction = await transaction.findAll({
      where: { transactionId },
    });

    const sendTransaction = await transaction.update(
      { transactionStatus: 'Dikirim' },
      {
        where: {
          transactionId: transactionId,
        },
      },
    );

    const updatedTransaction = await transaction.findAll({
      where: { transactionId },
    });
    res.send({
      status: 'Succsess',
      message: 'Send Transaction',
      data: {
        updatedTransaction,
      },
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const cancelTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.query;

    const findTransaction = await transaction.findAll({
      where: { transactionId },
    });
    // console.log(findTransaction);
    const getDTData = await detailTransaction.findAndCountAll({
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

    let totalPrice;
    findTransaction.forEach((data) => {
      totalPrice = data.dataValues.total;
    });
    getDTData.rows.map(async (data) => {
      // console.log(data.dataValues.productId);
      const updateProduct = await product.findOne({
        where: { productId: data.dataValues.productId },
      });

      await product.update(
        {
          stock: updateProduct.dataValues.stock + data.dataValues.quantity,
        },
        {
          where: { productId: data.dataValues.productId },
          // transaction: t,
        },
      );
    });
    const sendTransaction = await transaction.update(
      { transactionStatus: 'Dibatalkan' },
      {
        where: {
          transactionId: transactionId,
        },
      },
    );

    const updatedTransaction = await transaction.findAll({
      where: { transactionId },
    });

    res.send({
      status: 'Succsess',
      message: 'Cancel Transaction',
      data: {
        updatedTransaction,
      },
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
const Sales = async (req, res, next) => {
  const { timeReport = 'Bulanan' } = req.body;
  let result, MetaData;
  try {
    if (timeReport === 'Mingguan') {
      [result, MetaData] = await Sequelize.query(' ');
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const CountTransactionReport = async (req, res, next) => {
  const { timeReport } = req.body;
  const time = moment().startOf('day');
  const now = moment().format('YYYY-MM-DD HH:mm');
  try {
    let countOrder;
    if (timeReport === 'Harian') {
      countOrder = await transaction.count({
        where: {
          updatedAt: {
            [Op.gt]: time,
            [Op.lt]: now,
          },
        },
        group: ['transactionStatus'],
      });
    } else if (timeReport === 'Mingguan') {
      countOrder = await transaction.count({
        where: {
          updatedAt: {
            [Op.gt]: moment(time).subtract(1, 'week'),
            [Op.lt]: now,
          },
        },
        group: ['transactionStatus'],
      });
    } else if (timeReport === 'Bulanan') {
      countOrder = await transaction.count({
        where: {
          updatedAt: {
            [Op.gt]: moment(time).subtract(1, 'month'),
            [Op.lt]: now,
          },
        },
        group: ['transactionStatus'],
      });
    }
    res.send({
      status: 'Succsess',
      message: 'Sales Report',
      data: {
        countOrder,
      },
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

router.post('/declineTransaction', cancelTransaction);
router.post('/salesReportUser', CountTransactionReport);
router.post('/sendTransaction', sendOrder);
router.post('/confirmTransaction', confirmTransaction);
module.exports = router;
