const express = require('express');
const router = express.Router();

const { cart } = require('../../../models');
const { auth } = require('../../helpers/auth');

const addToCart = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { productId, quantity } = req.body;

    const findCartExist = await cart.findOne({
      where: {
        productId,
        userId,
      },
      plain: true,
      // bikin si obj jadi pecah object /property
    });
    // console.log(typeof quantity);
    // console.log(findCartExist);

    if (findCartExist) {
      const respons = await cart.update(
        {
          quantity: Number(quantity) + findCartExist.quantity,
        },
        {
          where: {
            productId,
            userId,
          },
        },
      );
    } else {
      await cart.create({
        productId,
        userId,
        quantity,
      });
    }

    const userCart = await cart.findAll({
      where: {
        userId,
      },
    });
    res.send({
      status: 'Succsess',
      message: 'Succsess add product to cart',
      data: {
        userCart,
      },
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
router.post('/add-to-cart', auth, addToCart);
module.exports = router;
