const express = require('express');
const router = express.Router();

const getProductRouter = require('./get.product');
const postProductRouter = require('./post.product');
const patchProductRouter = require('./patch.product');
const deleteProductRouter = require('./delete.product');

router.use(getProductRouter);
router.use(postProductRouter);
router.use(patchProductRouter);
router.use(deleteProductRouter);

module.exports = router;
