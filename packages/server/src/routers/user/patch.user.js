const e = require('cors');
const express = require('express');
const router = express.Router();

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

router.patch('/updatePassword/', changePassController);
module.exports = router;
