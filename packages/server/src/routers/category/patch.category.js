const express = require('express');
const router = express.Router();
const { Category } = require('../../../models');

const patchCategory = async (req, res, next) => {
  try {
    const { categoryId, category, categoryImage } = req.body;
    const [result] = await Category.update(
      {
        category,
        categoryImage,
      },
      {
        where: { categoryId },
      },
    );

    if (!result) {
      throw { code: 400, message: 'Gagal update kategory' };
    }

    res.send({
      status: 'Success',
      message: 'Success update category',
    });
  } catch (error) {
    next(error);
  }
};

router.patch('/', patchCategory);

module.exports = router;
