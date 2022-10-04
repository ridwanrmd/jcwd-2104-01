const express = require('express');
const router = express.Router();
const { Category } = require('../../../models');
const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');

const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const postPath = path.join(appRoot.path, 'packages', 'server');
    const resGetCategory = await Category.findOne({ where: { categoryId } });
    const result = await Category.destroy({
      where: { categoryId },
    });

    if (!result) {
      throw { code: 400, message: 'Gagal delete kategory' };
    }

    const { dataValues } = resGetCategory;

    const paths = postPath + dataValues.categoryImage;

    if (dataValues.categoryImage.split('/')[3] != 'category-default.svg') {
      fs.unlink(paths, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
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
