const express = require('express');
const router = express.Router();
const { auth } = require('../../helpers/auth');
const { Address } = require('../../../models');

const editUserAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const { province_id, province, city_id, city_name, address } = req.body;

    const getAddress = await Address.findOne({
      where: { addressId },
    });
    if (getAddress.dataValues.userId === req.user.userId) {
      const data = await Address.update(
        {
          province_id,
          province,
          city_id,
          city_name,
          address,
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

const updateMainAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;

    const getAllAddress = await Address.findAll({
      where: { isMain: true },
    });

    if (getAllAddress.length) {
      await Address.update(
        { isMain: false },
        { where: { addressId: getAllAddress[0].dataValues.addressId } },
      );
    }

    const updateAddress = await Address.update(
      { isMain: true },
      { where: { addressId } },
    );

    res.send({
      status: 'Berhasil',
      message: 'Berhasil ubah status alamat utama',
    });
  } catch (error) {
    next(error);
  }
};

router.patch('/edit/:addressId', auth, editUserAddress);
router.patch('/isMain/:addressId', updateMainAddress);

module.exports = router;
