const express = require('express');
const router = express.Router();
const { user } = require('../../../models');
const { Op } = require('sequelize');
router.patch('/', async (req, res, next) => {
  const getUser = await user.findAll({
    where: { userId: { [Op.ne]: req.body.userId } },
  });
  if (getUser.length) {
    try {
      getUser.map((c) => {
        if (c.dataValues.email == req.body.email) {
          throw {
            message: 'Email is already exists',
          };
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  try {
    const updateUser = user.update(
      { first_name: req.body.first_name, email: req.body.email },
      { where: { userId: req.body.userId } },
    );
    res.send({ status: 'success', message: 'Success update user' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
