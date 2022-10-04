const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
const moment = require('moment');

const {
  transaction,
  cart,
  product,
  address,
  detailTransaction,
} = require('../../../models');
const { auth } = require('../../helpers/auth');

const createTransaction = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { addressId, kurir, biaya, estimasi } = req.body;
    let total;

    const findCart = await cart.findAll({
      where: {
        userId,
      },
      attributes: ['cartId', 'productId', 'quantity'],
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
      ],
    });
    const totalPrice = () => {
      const tempPrice = findCart.map((data) => {
        return (
          data.dataValues.product.dataValues.price * data.dataValues.quantity
        );
      });
      const grandTotal = tempPrice.reduce((x, y) => x + y, 0);
      return grandTotal;
    };

    const newTransaction = await transaction.create({
      userId,
      total: totalPrice(),
      addressId,
      kurir,
      biaya,
      estimasi,
      transactionStatus: 'Menuggu Pembayaran',
    });
    const dueDate = moment(newTransaction.dataValues.createdAt).add(1, 'days');

    const wrap = await Promise.all(
      findCart.map(async (data) => {
        try {
          const findExistingProduct = await product.findOne({
            where: {
              productId: data.dataValues.productId,
            },
          });
          return findExistingProduct.dataValues;
        } catch (error) {
          console.log(error);
        }
      }),
    );

    schedule.scheduleJob(new Date(dueDate), async () => {
      const checkStatus = await transaction.findOne({
        where: {
          transactionId: newTransaction.dataValues.transactionId,
          transactionStatus: 'Menuggu Pembayaran',
        },
      });

      findCart.forEach(async (data) => {
        if (checkStatus.dataValues.transactionId) {
          await transaction.update(
            { transactionStatus: 'Dibatalkan' },
            {
              where: {
                transactionId: newTransaction.dataValues.transactionId,
              },
            },
          );
          const updateProduct = await product.findOne({
            where: { productId: data.dataValues.productId },
          });

          await product.update(
            {
              stock: updateProduct.dataValues.stock + data.dataValues.quantity,
            },
            { where: { productId: data.dataValues.productId } },
          );
          await cart.destroy({
            where: { userId },
          });
        }
      });
    });
    findCart.forEach(async (data) => {
      await detailTransaction.create({
        quantity: data.dataValues.quantity,
        productId: data.dataValues.productId,
        transactionId: newTransaction.dataValues.transactionId,
      });
    });
    findCart.forEach(async (data) => {
      const updateProduct = await product.findOne({
        where: { productId: data.dataValues.productId },
      });

      await product.update(
        {
          stock: updateProduct.dataValues.stock - data.dataValues.quantity,
        },
        {
          where: { productId: data.dataValues.productId },
        },
      );
    });

    res.send({
      status: 'Succsess',
      message: 'Succsess add cart to transaction',
      data: {
        wrap,
        ID: newTransaction.dataValues.transactionId,
      },
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const ConfrimDeliveryTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const findTransaction = await transaction.findAll({
      where: { transactionId },
    });
    const finishTransaction = await transaction.update(
      { transactionStatus: 'Pesanan Dikonfirmasi' },
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

const CancelTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const findTransaction = await transaction.findAll({
      where: { transactionId },
    });
    let statusTR;
    findTransaction.forEach(async (data) => {
      statusTR = data.dataValues.transactionStatus;
      if (
        statusTR == 'Menuggu Pembayaran' ||
        statusTR == 'Menuggu Konfirmasi Pembayaran'
      ) {
        await transaction.update(
          { transactionStatus: 'Dibatalkan' },
          {
            where: {
              transactionId: data.dataValues.transactionId,
            },
          },
        );
        const getDTData = await detailTransaction.findAll({
          where: { transactionId: data.dataValues.transactionId },
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
        getDTData.map(async (data) => {
          const updateProduct = await product.findOne({
            where: { productId: data.dataValues.productId },
          });
          await product.update(
            {
              stock: updateProduct.dataValues.stock + data.dataValues.quantity,
            },
            {
              where: { productId: updateProduct.dataValues.productId },
            },
          );
        });
        findTransaction.forEach(async (data) => {
          await detailTransaction.destroy({
            where: { transactionId: data.dataValues.transactionId },
          });
          await transaction.destroy({
            where: { transactionId: data.dataValues.transactionId },
          });
        });
        res.send({
          status: 'Succsess',
          message: 'Cancel Transaction',
        });
      }
      res.send({
        status: 'Rejected',
        message: 'Transaction Status In Prosess',
      });
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
router.post('/cancelTransaction/:transactionId', CancelTransaction);
router.post('/confirmTransaction/:transactionId', ConfrimDeliveryTransaction);
router.post('/newTransaction', auth, createTransaction);
module.exports = router;
