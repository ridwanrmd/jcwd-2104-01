const express = require('express');
const router = express.Router();
const { prescription } = require('../../../models');
const { auth } = require('../../helpers/auth');

const getUserPrescriptions = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const resGetUserPrescriptions = await prescription.findAll({
      where: { userId },
    });
    if (!resGetUserPrescriptions)
      throw { message: 'Tidak dapat menemukan resep' };

    res.send({
      status: 'Success',
      message: 'Berhasil mendapatkan daftar resep',
      data: resGetUserPrescriptions,
    });
  } catch (error) {
    next(error);
  }
};

router.get('/allUserPrescriptions', auth, getUserPrescriptions);

module.exports = router;
