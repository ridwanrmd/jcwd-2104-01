const express = require('express');
const router = express.Router();

const postCartRouter = require('./post.cart');
const patchCartRouter = require('./patch.cart');

router.use(postCartRouter);
router.use(patchCartRouter);
module.exports = router;
