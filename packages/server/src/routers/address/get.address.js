const express = require('express');
const router = express.Router();
const { Address } = require('../../../models');
const { auth } = require('../../helpers/auth');

const getUserAddresses = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const resGetUserAddress = await Address.findAll({
      where: { userId },
    });
    if (!resGetUserAddress) throw { message: 'Alamat tidak ditemukan' };

    res.send({
      status: 'Success',
      message: 'Success get user addresses',
      data: resGetUserAddress,
    });
  } catch (error) {
    next(error);
  }
};

router.get('/userAddress', auth, getUserAddresses);

module.exports = router;
