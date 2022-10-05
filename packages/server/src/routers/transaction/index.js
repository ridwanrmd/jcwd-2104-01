const express = require('express');
const router = express.Router();

const patchTransactionRouter = require('./patch.transaction');
const postTransactionRouter = require('./post.transaction');
const getTransactionRouter = require('./get.transaction');

router.use(patchTransactionRouter);
router.use(postTransactionRouter);
router.use(getTransactionRouter);

module.exports = router;
