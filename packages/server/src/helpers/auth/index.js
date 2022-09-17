const { verifyToken } = require('../../lib/token');
const { user } = require('../../../models');

const auth = async (req, res, next) => {
  try {
    const token = req.token;

    const verifiedToken = verifyToken(token);
    const responsGetUser = await user.findOne({
      where: {
        userId: verifiedToken.userId,
      },
    });

    if (!responsGetUser) throw { message: 'user not found' };

    req.user = responsGetUser.dataValues;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { auth };
