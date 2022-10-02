const express = require('express');
const router = express.Router();

const getProductRouter = require('./get.product');
const postProductRouter = require('./post.product');

router.use(getProductRouter);
router.use(postProductRouter);

module.exports = router;
