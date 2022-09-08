const express = require('express');
const router = express.Router();
const { user } = require('../../../models');
const { Op } = require('sequelize');

router.patch('/', async (req, res, next) => {
  const { email, first_name, last_name, birthDate, image, gender, phone } =
    req.body;
  try {
    // Checking email and phone number
    const getUser = await user.findAll({
      where: {
        userId: { [Op.ne]: req.body.userId },
        [Op.or]: [{ email: req.body.email }, { phone: req.body.phone }],
      },
    });
    if (getUser.length) {
      getUser.map((c) => {
        if (c.dataValues.email == req.body.email) {
          throw { message: 'Email is already exists' };
        }
        if (c.dataValues.phone == req.body.phone) {
          throw { message: 'Phone number is already exists' };
        }
      });
    }
    const updateUser = await user.update(
      { email, first_name, last_name, birthDate, image, gender, phone },
      {
        where: { userId: req.body.userId },
      },
    );

    if (!updateUser[0]) throw { message: 'Failed to update user data' };
    res.send({ message: 'Success Update User' });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
