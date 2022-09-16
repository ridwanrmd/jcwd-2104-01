const express = require('express');
const router = express.Router();

const postCartRouter = require('./post.cart');
const patchCartRouter = require('./patch.cart');
const deleteCartRouter = require('./delete.cart');
const getCartRouter = require('./get.cart');

router.use(getCartRouter);
router.use(deleteCartRouter);
router.use(postCartRouter);
router.use(patchCartRouter);
module.exports = router;
