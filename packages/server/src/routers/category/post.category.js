const express = require('express');
const router = express.Router();
const { Category } = require('../../../models');
const { auth } = require('../../helpers/auth');
const { uploadCategory } = require('../../lib/multer');

const postCategory = async (req, res, next) => {
  try {
    const { category } = req.body;

    const getCategory = await Category.findAll({
      where: { category },
    });

    if (getCategory.length) {
      throw { code: 400, message: 'Category is already exist' };
    }

    const result = await Category.create(req.body);
    if (result.dataValues) {
      res.send({
        status: 'success',
        message: 'Success create category',
      });
    } else {
      throw { message: 'internal server error' };
    }
  } catch (error) {
    next(error);
  }
};

const uploadImage = async (req, res, next) => {
  try {
    return res.send({
      status: 'Success',
      message: 'Success upload category image',
    });
  } catch (error) {
    console.log(error);
  }
};

router.post('/', postCategory);
router.post('/upload', uploadCategory.single('gambar'), uploadImage);

module.exports = router;
