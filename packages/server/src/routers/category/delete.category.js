const express = require('express');
const router = express.Router();
const { Category } = require('../../../models');

const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const result = await Category.destroy({
      where: { categoryId },
    });

    if (!result) {
      throw { code: 400, message: 'Gagal delete kategory' };
    }

    res.send({
      status: 'Success',
      message: 'Success delete category',
    });
  } catch (error) {
    next(error);
  }
};

router.delete('/:categoryId', deleteCategory);

module.exports = router;
