const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { user } = require('../../../models');
const { hash, compare } = require('../../lib/bycrypt');

const changePassController = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, ConfirmPassword, userId } = req.body;
    // console.log(req.body);
    // const { token } = req.params;
    // console.log(userId);
    // console.log(userId);

    const equalizePass = await user.findOne({ where: { userId } });
    const userData = equalizePass.dataValues;
    const compareold = compare(oldPassword, userData.password);
    if (!compareold) {
      res.send({ code: 400, message: 'Password incorrect' });
    }

    if (newPassword !== ConfirmPassword) {
      res.send({
        code: 400,
        message: 'Password doesnt match',
        detail: `Password: ${newPassword}, Confirm Password: ${ConfirmPassword}`,
      });
    }
    const resChangePass = await user.findOne({ where: { userId } });

    //hashing pass and update DB
    const passwordHash = hash(newPassword);
    await resChangePass.update({ password: passwordHash });
    const resUpdated = await resChangePass.save();

    res.send({
      status: 'Success',
      message: 'Success updated password',
      detail: { resUpdated },
    });
  } catch (error) {
    next(error);
    // console.log(error);
  }
};

router.patch('/', async (req, res, next) => {
  const { email, first_name, last_name, birthDate, phone, gender, image } =
    req.body;
  try {
    // Checking email and phone number
    const getUser = await user.findAll({
      where: {
        userId: { [Op.ne]: 1 },
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
      { email, first_name, last_name, birthDate, phone, gender, image },
      {
        where: { userId: 1 },
      },
    );

    if (!updateUser[0]) throw { message: 'Failed to update user data' };
    res.send({ message: 'Success Update User' });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/updatePassword/', changePassController);

module.exports = router;
