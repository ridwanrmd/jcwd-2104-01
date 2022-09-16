const express = require('express');
const router = express.Router();
const { auth } = require('../../helpers/auth');
const { Address } = require('../../../models');

const editUserAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const { provinceId, province, cityId, city, detailAddress, isMain } =
      req.body;

    const getAddress = await Address.findOne({
      where: { addressId },
    });
    if (getAddress.dataValues.userId === req.user.userId) {
      const data = await Address.update(
        {
          provinceId,
          province,
          cityId,
          city,
          detailAddress,
          isMain,
        },
        { where: { addressId } },
      );
      if (!data) throw { message: 'Failed to update' };

      res.send({
        status: 'success',
        message: 'berhasil memperbarui alamat',
      });
    } else {
      throw {
        code: 401,
        message: 'Unauthorized',
      };
    }
  } catch (error) {
    next(error);
  }
};

router.patch('/:addressId', auth, editUserAddress);

module.exports = router;
