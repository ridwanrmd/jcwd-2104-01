const express = require('express');
const router = express.Router();

const { cart } = require('../../../models');
const { auth } = require('../../helpers/auth');

const delCart = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { cartId } = req.params;
    const deleteItemCart = await cart.destroy({
      where: {
        cartId,
        userId,
      },
    });
    res.send({
      status: 'Succsess',
      message: 'Succsess delete product in your cart',
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

router.delete('/delete-cart/:cartId', auth, delCart);
module.exports = router;
