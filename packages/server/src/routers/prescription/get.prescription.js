const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const { prescription } = require('../../../models');
const { auth } = require('../../helpers/auth');

const getUserPrescriptions = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const resGetUserPrescriptions = await prescription.findAll({
      where: { userId },
    });

    res.send({
      status: 'Success',
      message: 'berhasil mendapatkan daftar resep',
      data: resGetUserPrescriptions,
    });
  } catch (error) {
    next(error);
  }
};

const getAllPrescripton = async (req, res, next) => {
  try {
    const resGetUserPrescriptions = await prescription.findAll({
      order: Sequelize.literal(`status DESC`),
    });

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
router.get('/', getAllPrescripton);

module.exports = router;
