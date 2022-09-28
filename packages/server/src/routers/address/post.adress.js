const express = require('express');
const router = express.Router();
const { isFieldEmpties } = require('../../helpers');
const { Address } = require('../../../models');
const { auth } = require('../../helpers/auth');

const addUserAddress = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { province_id, province, city_id, city_name, address } = req.body;

    const resGetMain = await Address.findOne({
      where: {
        userId,
        isMain: true,
      },
    });

    if (!resGetMain) {
      await Address.create({
        userId,
        province_id,
        province,
        city_id,
        city_name,
        address,
        isMain: true,
      });
    } else {
      await Address.create(
        { userId, province_id, province, city_id, city_name, address },
        // { where: { userId } },
      );
    }

    // if (!resAddUserAddress) throw { message: 'Failed to add address' };

    res.send({
      status: 'Success',
      message: 'Berhasil menambahkan alamat',
    });
  } catch (error) {
    next(error);
  }
};

router.post('/createAddress', auth, addUserAddress);

module.exports = router;
