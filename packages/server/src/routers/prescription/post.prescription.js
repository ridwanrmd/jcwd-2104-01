const express = require('express');
const router = express.Router();
const { auth } = require('../../helpers/auth');
const { uploadPrescription } = require('../../lib/multer');
const { prescription } = require('../../../models');

// create new prescription
const createNewPrescription = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name } = req.body;
    const { userId } = req.user;

    const resCreatePrescription = await prescription.create({
      userId,
      prescriptionImage: name,
    });

    if (createNewPrescription.affectedRows)
      throw { message: 'Gagal mengunggah resep' };

    res.send({
      status: 'Berhasil',
      message: 'Berhasil Unggah Resep',
      data: resCreatePrescription,
    });
  } catch (error) {
    next(error);
  }
};

// upload prescription image
const uploadPrescriptionImage = (req, res) => {
  try {
    console.log('disana');
    return res.send({
      status: 'Berhasil',
      message: 'Berhasil Unggah Resep',
    });
  } catch (error) {
    console.log(error);
  }
};

router.post('/', auth, createNewPrescription);

router.post(
  '/upload',
  auth,
  uploadPrescription.single('gambar'),
  uploadPrescriptionImage,
);

module.exports = router;
