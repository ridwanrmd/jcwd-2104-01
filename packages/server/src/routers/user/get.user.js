const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../lib/token');
const { user } = require('../../../models');

const verifyUserController = async (req, res, next) => {
  try {
    const { token } = req.params;

    const getUserToken = await user.findOne({
      where: { token },
    });

    if (!getUserToken)
      return res.send(
        '<h2>your token has expired, please use the new token</h2>',
      );

    const verifiedToken = verifyToken(token);

    const [resUpdateIsVerifiedStatus] = await user.update(
      { isVerified: true },
      {
        where: {
          userId: verifiedToken.userId,
        },
      },
    );

    if (!resUpdateIsVerifiedStatus)
      throw { message: 'Failed verification user' };

    res.send('<h1>Verification success</h1>');
  } catch (error) {
    next(error);
  }
};

router.get('/verification/:token', verifyUserController);

module.exports = router;
