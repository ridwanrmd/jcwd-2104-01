const express = require('express');
const router = express.Router();
const { Address } = require('../../../models');
const { auth } = require('../../helpers/auth');

const deleteUserAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;

    const resDeleteAddress = await Address.destroy({ where: { addressId } });
    res.send({
      status: 'Success',
      message: 'Success delete address',
      detail: {
        addressId,
        resDeleteAddress,
      },
    });
  } catch (error) {
    next(error);
  }
};

router.delete('/delete/:addressId', auth, deleteUserAddress);

module.exports = router;
