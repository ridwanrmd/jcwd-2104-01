const express = require('express');
const router = express.Router();

const { cart } = require('../../../models');
const { auth } = require('../../helpers/auth');

const editCart = async (req, res, next) => {
  try {
    const { userId } = req.user;
    // console.log(userId);
    const { quantity } = req.body;
    // console.log(req.body);
    const { cartId } = req.params;

    const editQuantity = await cart.update(
      {
        quantity,
      },
      {
        where: {
          cartId,
          userId,
        },
      },
    );
    res.send({
      status: 'Succsess',
      message: 'Succsess edit product in your cart',
      data: {
        editQuantity,
      },
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

router.patch('/edit-quantity/:cartId', auth, editCart);
module.exports = router;
