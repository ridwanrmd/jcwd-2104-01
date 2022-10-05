const express = require('express');
const router = express.Router();
const { Category } = require('../../../models');
const { Sequelize } = require('sequelize');

const getCategory = async (req, res, next) => {
  const {
    page = 1,
    pageSize = 5,
    orderBy = 'category',
    order = 'ASC',
  } = req.query;

  const limit = Number(pageSize);
  const offset = (Number(page) - 1) * Number(pageSize);
  try {
    const amount = await Category.findAll();
    const result = await Category.findAll({
      order: Sequelize.literal(`${orderBy} ${order}`),
    });
    const resultAdmin = await Category.findAll({
      order: Sequelize.literal(`${orderBy} ${order}`),
      offset,
      limit,
    });

    // if (!result.length) {
    //   throw { code: 404, message: 'Kategory tidak ditemukan' };
    // }

    res.send({
      status: 'Success',
      message: 'Success get category list',
      result: result,
      resultAdmin: resultAdmin,
      totalPage: amount.length,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCategory = async (req, res, next) => {
  const resGetCategory = await Category.findAll();

  res.send({
    status: 'Success',
    message: 'Success get category list',
    data: resGetCategory,
  });
};

router.get('/', getCategory);
router.get('/allCategory', getAllCategory);

module.exports = router;
