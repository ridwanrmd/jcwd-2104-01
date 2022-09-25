const express = require('express');
const router = express.Router();
const { Category } = require('../../../models');

const getCategory = async (req, res, next) => {
  try {
    const result = await Category.findAll();

    if (!result.length) {
      throw { code: 404, message: 'Kategory tidak ditemukan' };
    }

    res.send({
      status: 'Success',
      message: 'Success get category list',
      result: result,
    });
  } catch (error) {
    next(error);
  }
};

router.get('/', getCategory);

module.exports = router;
